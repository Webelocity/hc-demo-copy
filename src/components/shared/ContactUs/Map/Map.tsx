"use client";

import React, { useState, useEffect } from "react";
import "./Map.scss";
import { useMediaQuery } from "@mui/material";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

// Updated light grayscale style with visible location names and roads
const mapOptions = {
  zoomControl: false,
  clickableIcons: false,
  gestureHandling: "greedy",
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#EEEEEE" }], // Light gray for geometry (land and water)
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }], // Hide icon labels
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Make text labels visible
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }], // Make text stroke visible
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#E0E0E0" }], // Light gray roads
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Make road labels visible
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#D0D0D0" }], // Light gray water
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "off" }], // Hide water labels
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Make POI labels visible
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#D8D8D8" }], // Light gray for parks
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Make park labels visible
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#EEEEEE" }], // Light gray for administrative areas
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Make admin area names visible
    },
  ],
  draggable: true,
  scrollwheel: true,
};

const Map = () => {
  const isMobile = useMediaQuery("(max-width:1023px)");
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [mapCenter, setMapCenter] = useState({
    lat: 42.10673330759051,
    lng: -76.267104752531,
  });

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
    }

    return () => {
      setIsLoaded(false);
    };
  }, []);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`;
    window.open(url, "_blank");
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setIsLoaded(true)}>
      <div className="map-wrapper">
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={isMobile ? 13 : 14}
          options={mapOptions}
        >
          {isLoaded && (
            <MarkerF
              onClick={openInGoogleMaps}
              position={mapCenter} // The pointer is now placed at the specific location
              icon={{
                url: "/assets/image/shared/Pin.svg",
                scaledSize: new google.maps.Size(40, 40), // Adjust size as needed
              }}
            />
          )}
        </GoogleMap>

      </div>
    </LoadScript>
  );
};

export default Map;
