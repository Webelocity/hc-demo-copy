"use client";

import React, { useEffect, useState } from "react";
import "./Map.scss";
import { useMediaQuery } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useAtom } from "jotai";
import { selectedStoreAtom } from "@/atoms/storeAtom";
import { StoreLocation, getStoreById, DEFAULT_STORE_ID } from "@/util/shedule";

type LatLng = { lat: number; lng: number };

const mapOptions: google.maps.MapOptions = {
  zoomControl: false,
  clickableIcons: false,
  gestureHandling: "greedy",
  styles: [
    { elementType: "geometry", stylers: [{ color: "#EEEEEE" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ visibility: "on" }] },
    { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#E0E0E0" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ visibility: "on" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#D0D0D0" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ visibility: "on" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#D8D8D8" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ visibility: "on" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#EEEEEE" }] },
    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ visibility: "on" }] },
  ],
  draggable: true,
  scrollwheel: true,
};

type MapProps = {
  size?: "small" | "medium" | "large";
  /** Overrides the selected store location when provided */
  customLocation?: StoreLocation;
};

const Map: React.FC<MapProps> = ({ size = "medium", customLocation }) => {
  const isMobile = useMediaQuery("(max-width:1023px)", { noSsr: true });
  const [mounted, setMounted] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const [selectedStoreId] = useAtom(selectedStoreAtom);
  
  // Safely get the store, with fallback to default store if ID is invalid
  const selectedStore = getStoreById(selectedStoreId);

  // Use custom location when provided, otherwise fall back to the selected store coordinates
  const mapCenter: LatLng =
    customLocation ?? { lat: selectedStore.lat, lng: selectedStore.lng };

  const sizeMap: Record<NonNullable<MapProps["size"]>, string> = {
    small: "15rem",
    medium: "25rem",
    large: "35rem",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const openInGoogleMaps = () => {
    const url = customLocation?.gmapLink ?? selectedStore?.gmapLink ?? '';
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (!mounted) {
    return <div className="map-wrapper" style={{ minHeight: sizeMap[size] }} />;
  }

  if (loadError || !apiKey) {
    return (
      <div className="map-wrapper" style={{ minHeight: sizeMap[size], display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={openInGoogleMaps} style={{ padding: "0.5rem 1rem", border: "1px solid #ccc", borderRadius: 6 }}>
          Open in Google Maps
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="map-wrapper" style={{ minHeight: sizeMap[size] }} />;
  }

  return (
    <div className="map-wrapper" style={{ minHeight: sizeMap[size] }}>
      <GoogleMap
        mapContainerClassName="map-container"
        mapContainerStyle={{ minHeight: sizeMap[size] }}
        center={mapCenter}
        zoom={isMobile ? 13 : 14}
        options={mapOptions}
      >
        <MarkerF
          onClick={openInGoogleMaps}
          position={mapCenter}
          icon={{
            url: "/assets/image/shared/Pin.svg",
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
