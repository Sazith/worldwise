/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../hooks/UseGeolocation";
import Button from "./Button";

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLoacationPosition,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (
      geoLoacationPosition &&
      geoLoacationPosition.lat &&
      geoLoacationPosition.lng
    ) {
      setMapPosition([geoLoacationPosition.lat, geoLoacationPosition.lng]);
    } else {
      // Handle error, e.g., use a fallback location or show a message
    }
  }, [geoLoacationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLoacationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "...Loading" : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city, index) => (
          <Marker position={[city.position.lat, city.position.lng]} key={index}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
