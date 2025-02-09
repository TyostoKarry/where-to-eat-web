import { FC, forwardRef, useEffect, useImperativeHandle } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import { useUserLocation } from "@hooks/useUserLocation";
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
  userLocation: { lat: number; lon: number };
  setUserLocation: (location: { lat: number; lon: number }) => void;
  shouldRecenter: boolean;
}

const MapController = forwardRef(
  (
    { userLocation, setUserLocation, shouldRecenter }: MapControllerProps,
    ref
  ) => {
    const map = useMap();
    const userDeviceLocation = useUserLocation();

    useEffect(() => {
      if (shouldRecenter) {
        map.setView([userLocation.lat, userLocation.lon], 16, {
          animate: true,
        });
      }
    }, [shouldRecenter, map]);

    useImperativeHandle(ref, () => ({
      centerMap: () => {
        map.setView([userLocation.lat, userLocation.lon], 16, {
          animate: true,
        });
      },
      centerMapOnDeviceLocation: () => {
        if (userDeviceLocation.latitude && userDeviceLocation.longitude) {
          setUserLocation({
            lat: userDeviceLocation.latitude,
            lon: userDeviceLocation.longitude,
          });
          map.setView(
            [userDeviceLocation.latitude, userDeviceLocation.longitude],
            16,
            {
              animate: true,
            }
          );
        }
      },
    }));

    return null;
  }
);

interface UserLocationMapProps {
  userLocation: { lat: number; lon: number };
  setUserLocation: (location: { lat: number; lon: number }) => void;
  shouldRecenter: boolean;
}

export const UserLocationMap = forwardRef(
  (
    { userLocation, setUserLocation, shouldRecenter }: UserLocationMapProps,
    ref
  ) => {
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
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            shouldRecenter={shouldRecenter}
            ref={ref}
          />
        </MapContainer>
      </div>
    );
  }
);
