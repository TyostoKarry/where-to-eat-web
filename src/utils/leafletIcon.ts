import markerIcon from "@images/marker-icon.png";
import markerShadowIcon from "@images/marker-shadow.png";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadowIcon,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default DefaultIcon;
