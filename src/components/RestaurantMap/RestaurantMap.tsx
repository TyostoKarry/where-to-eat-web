import { forwardRef, useImperativeHandle } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "./restaurantmap.css";
import "leaflet/dist/leaflet.css";

interface RestaurantMapProps {
  latitude: number;
  longitude: number;
}

const MapController = forwardRef(
  ({ latitude, longitude }: RestaurantMapProps, ref) => {
    const map = useMap();

    useImperativeHandle(ref, () => ({
      centerMap: () => {
        map.setView([latitude, longitude], 13, { animate: true });
      },
    }));

    return null;
  },
);

export const RestaurantMap = forwardRef(
  ({ latitude, longitude }: RestaurantMapProps, ref) => {
    return (
      <MapContainer className="map" center={[latitude, longitude]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} />
        <MapController ref={ref} latitude={latitude} longitude={longitude} />
      </MapContainer>
    );
  },
);
