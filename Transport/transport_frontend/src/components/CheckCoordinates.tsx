import React, { useCallback } from "react";
import Button from '@mui/material/Button';

export const CheckCoordinates = ({
  map,
  origin,
  destination,
}: {
  map: any;
  origin: any;
  destination: any;
}) => {
  let center = [51.505, -0.09];
  const zoom = 4;

  const originLocationHandler = useCallback(() => {
    if (typeof origin !== "undefined" && origin !== null) {
      center = Object.values(origin);
    }
    map.setView(center, zoom);
  }, [map, origin]);

  const destinationLocationHandler = useCallback(() => {
    if (typeof destination !== "undefined" && destination !== null) {
      center = Object.values(destination);
    }
    map.setView(center, zoom);
  }, [map, destination]);

  return (
    <>
      <Button variant="contained" onClick={originLocationHandler}>Check Origin</Button>
      <br />
      <br />
      <Button variant="contained" onClick={destinationLocationHandler}>Check Destination</Button>
      <br />
    </>
  );
};
