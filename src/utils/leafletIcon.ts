import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: `${import.meta.env.BASE_URL}images/marker-icon.png`,
  shadowUrl: `${import.meta.env.BASE_URL}images/marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default DefaultIcon;
