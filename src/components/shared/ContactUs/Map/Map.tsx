"use client";

import React, { useEffect, useState } from "react";
import "./Map.scss";
import { useMediaQuery } from "@mui/material";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useAtom } from "jotai";
import { selectedStoreAtom } from "@/atoms/storeAtom";
import { STORES } from "@/util/shedule";

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
  /** Optional override; if not provided we use the selected store from the atom */
  center?: LatLng;
};

const Map: React.FC<MapProps> = ({ size = "medium", center }) => {
  const isMobile = useMediaQuery("(max-width:1023px)");
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const [selectedStoreId] = useAtom(selectedStoreAtom);
  const selectedStore = STORES[selectedStoreId];

  // use prop center if provided; otherwise use the selected store coords
  const mapCenter: LatLng = center ?? { lat: selectedStore.lat, lng: selectedStore.lng };

  const sizeMap: Record<NonNullable<MapProps["size"]>, string> = {
    small: "15rem",
    medium: "25rem",
    large: "35rem",
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setIsLoaded(true);
    }
    return () => setIsLoaded(false);
  }, []);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setIsLoaded(true)}>
      <div className="map-wrapper" style={{ minHeight: sizeMap[size] }}>
        <GoogleMap
          mapContainerClassName="map-container"
          mapContainerStyle={{ minHeight: sizeMap[size] }}
          center={mapCenter}
          zoom={isMobile ? 13 : 14}
          options={mapOptions}

        >
          {isLoaded && (
            <MarkerF
              onClick={openInGoogleMaps}
              position={mapCenter}
              icon={{
                url: "/assets/image/shared/Pin.svg",
                // `google` is global when the script loads
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
