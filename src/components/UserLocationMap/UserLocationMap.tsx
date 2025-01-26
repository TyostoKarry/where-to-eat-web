import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./UserLocationMap.css";

interface UserLocationMapProps {}

export const UserLocationMap: FC<UserLocationMapProps> = () => {
  console.log("UserLocationMap Loaded");
  return (
    <div>
      <MapContainer
        center={[60.1699, 24.9384]}
        zoom={16}
        className="userlocationmap"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
