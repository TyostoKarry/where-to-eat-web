import { FC, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./UserLocationMap.css";

const LocationSelector: FC<{
  setUserLocation: (location: { lat: number; lon: number }) => void;
}> = ({ setUserLocation }) => {
  useMapEvents({
    click(e) {
      setUserLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });

  return null;
};

interface MapControllerProps {
  latitude: number;
  longitude: number;
  shouldRecenter: boolean;
}

const MapController: React.FC<MapControllerProps> = ({
  latitude,
  longitude,
  shouldRecenter,
}) => {
  const map = useMap();

  useEffect(() => {
    if (shouldRecenter) {
      map.setView([latitude, longitude], 16, { animate: true });
    }
  }, [shouldRecenter, map]);

  return null;
};

interface UserLocationMapProps {
  userLocation: { lat: number; lon: number };
  setUserLocation: (location: { lat: number; lon: number }) => void;
  shouldRecenter: boolean;
}

export const UserLocationMap: FC<UserLocationMapProps> = ({
  userLocation,
  setUserLocation,
  shouldRecenter,
}) => {
  return (
    <div>
      <MapContainer
        center={[userLocation.lat, userLocation.lon]}
        zoom={16}
        className="userlocationmap"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]} />
        )}
        <LocationSelector setUserLocation={setUserLocation} />
        <MapController
          latitude={userLocation.lat}
          longitude={userLocation.lon}
          shouldRecenter={shouldRecenter}
        />
      </MapContainer>
    </div>
  );
};
