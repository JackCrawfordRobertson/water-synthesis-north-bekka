// BaseMap.js
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import datasets from "../../geojsonData";
import './Lebanon_Bekaa.css';

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, onMove, setMap }) => {  // Added setMap prop
    const mapContainer = useRef(null);

    useEffect(() => {
        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clnuiw3az00oy01qp4m2j1dha",
            center: center,
            zoom: zoom,
            interactive: true,
        });

        setMap(mapInstance);  // Set map instance

        mapInstance.on("move", () => {
            const newCenter = mapInstance.getCenter().toArray();
            const newZoom = mapInstance.getZoom();
            const centerChanged = newCenter.toString() !== center.toString();
            const zoomChanged = newZoom !== zoom;
            if (centerChanged || zoomChanged) {
                onMove && onMove(newCenter, newZoom);
            }
        });

        mapInstance.on("load", () => {
            // ... (your existing 'load' event handler code)
        });

        return () => {
            mapInstance.off("move");
            mapInstance.remove();
        };
    }, []);  // Dependency array left empty to run once on mount

    useEffect(() => {
        setMap(prevMap => {
            if (prevMap) {
                const currentCenter = prevMap.getCenter().toArray();
                const currentZoom = prevMap.getZoom();
                const centerChanged = currentCenter.toString() !== center.toString();
                const zoomChanged = currentZoom !== zoom;
                if (centerChanged) {
                    prevMap.setCenter(center);
                }
                if (zoomChanged) {
                    prevMap.setZoom(zoom);
                }
            }
            return prevMap;  // Return the previous map instance
        });
    }, [center, zoom]);

    return <div className="map-container" ref={mapContainer}></div>;
};

export default BaseMap;