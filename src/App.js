import "./App.css";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import info from "./info.json";
import "./help.js";
import { infraTypeToStr } from "./help.js";

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
      attributionControl: false,
    });
    info.markers.map((marker) => {
      const [classStr, typeStr] = infraTypeToStr(marker.type);
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
    // map controls
    mapRef.current.addControl(new mapboxgl.NavigationControl());
    mapRef.current.addControl(new mapboxgl.FullscreenControl());

    // legend
    const legend = document.getElementById("legend");
    legend.innerHTML = "";
    const types = [0, 1, 2];
    types.forEach((type) => {
      const [classStr, typeStr] = infraTypeToStr(type);
      const element = document.querySelector("." + classStr);
      const color = window.getComputedStyle(element).backgroundColor;
      const item = document.createElement("div");
      const key = document.createElement("span");
      key.className = "legend-key";
      key.style.backgroundColor = color;
      const value = document.createElement("span");
      value.innerHTML = `${typeStr}`;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="title">Bali Digital Infrastructure Map</div>
      <div id="map-container" ref={mapContainerRef} />
      {/* <div className="map-overlay" id="features">
        <h2>US population density</h2>
      </div> */}
      <div className="map-overlay" id="legend"></div>
    </>
  );
}

export default App;
