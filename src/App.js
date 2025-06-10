import "./App.css";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import info from "./info.json";

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  console.log(info);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FydGVzaWFuLWJlYXJyciIsImEiOiJjbWJxbnA4bGMwMTd3MmpvaHZxOXJicmNpIn0._Dem8_VWwdZkwLyiPA3P8g";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [115.2, -8.4],
      maxBounds: [
        [113.8, -9.2], // Southwest coordinates
        [116.4, -7.5], // Northeast coordinates,
      ],
      zoom: 10,
      maxZoom: 20,
    });
    info.markers.map((marker) => {
      var classStr = "";
      var typeStr = "";
      if (marker.type === 0) {
        classStr = "datacenter";
        typeStr = "Datacenter";
      } else if (marker.type === 1) {
        classStr = "ixp";
        typeStr = "Internet Exchange Point (IXP)";
      } else if (marker.type === 2) {
        classStr = "landing";
        typeStr = "Cable Landing Station";
      }
      const el = document.createElement("div");
      el.className = "marker " + classStr;
      return new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${marker.name}</h3>
            <p>${typeStr}</p>
            <p>${marker.desc}</p>`
          )
        )
        .addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default App;
