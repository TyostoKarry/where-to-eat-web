import { LanguageContext } from "@contexts/LanguageContext";
import { useUserLocation } from "@hooks/useUserLocation";
import DefaultIcon from "@utils/leafletIcon";
import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useContext,
} from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./userlocationmap.css";

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
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number }) => void;
  shouldRecenter: boolean;
  setToast: (toast: { message: string; visible: boolean }) => void;
}

const MapController = forwardRef(
  (
    {
      userLocation,
      setUserLocation,
      shouldRecenter,
      setToast,
    }: MapControllerProps,
    ref,
  ) => {
    const lang = useContext(LanguageContext);
    const map = useMap();
    const userDeviceLocation = useUserLocation();

    useEffect(() => {
      if (shouldRecenter) {
        map.setView(
          userLocation ? [userLocation.lat, userLocation.lon] : [0, 0],
          userLocation ? 16 : 1,
          {
            animate: true,
          },
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRecenter, map]);

    useImperativeHandle(ref, () => ({
      centerMap: () => {
        map.setView(
          userLocation ? [userLocation.lat, userLocation.lon] : [0, 0],
          userLocation ? 16 : 1,
          {
            animate: true,
          },
        );
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
            },
          );
        } else {
          setToast({
            message: lang.toast.deviceLocationNotFound,
            visible: true,
          });
        }
      },
    }));

    return null;
  },
);

interface UserLocationMapProps {
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number }) => void;
  shouldRecenter: boolean;
  setToast: (toast: { message: string; visible: boolean }) => void;
}

export const UserLocationMap = forwardRef(
  (
    {
      userLocation,
      setUserLocation,
      shouldRecenter,
      setToast,
    }: UserLocationMapProps,
    ref,
  ) => {
    return (
      <div>
        <MapContainer
          center={userLocation ? [userLocation.lat, userLocation.lon] : [0, 0]}
          zoom={userLocation ? 16 : 1}
          className="userlocationmap"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lon]}
              icon={DefaultIcon}
            />
          )}
          <LocationSelector setUserLocation={setUserLocation} />
          <MapController
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            shouldRecenter={shouldRecenter}
            ref={ref}
            setToast={setToast}
          />
        </MapContainer>
      </div>
    );
  },
);
