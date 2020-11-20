import React, { createContext } from "react";
import useStorage from "../utils/useStorage";

interface LocationCoords {
  lat: number;
  lng: number;
}

type LocationContextType = {
  location: LocationCoords;
  setLocation: (location: LocationCoords) => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: { lat: 0, lng: 0},
  setLocation: () => {}
});

export const LocationProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useStorage('__location');

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
