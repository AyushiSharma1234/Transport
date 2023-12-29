import { useState,useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import icon from "../assets/icon.svg";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Icon, LatLngExpression, map } from "leaflet";
import {
  originCountriesData,
  destinationCountriesData,
} from "../assets/constants";
import { CheckCoordinates } from "./CheckCoordinates";
import { Bookings } from "./Bookings";
import { InputLabel } from "@mui/material";
import FormControl from '@mui/material/FormControl';

// api to get lat and lng from country name
// https://api.opencagedata.com/geocode/v1/json?q=Germany&key=efe9790179764c9580dfba7fbbb73525

export interface MapData {
  lat: number;
  lng: number;
}

export const MapComponent = () => {
  const [originPosition, setOriginPosition] = useState<MapData | null>(null);
  const [destinationPosition, setDestinationPosition] =
    useState<MapData | null>(null);
  const [map, setMap] = useState<any>(null);

  const countriesRef = useRef({
    origin:'',
    destination:''
  })

  const isBookingOpen = Boolean(originPosition) && Boolean(destinationPosition)

  const myIcon = new Icon({
    iconUrl: icon,
    iconSize: [32, 32],
  });

  const startingPin: LatLngExpression[] | null =
    originPosition && Object.values(originPosition);

  const destinationPin: LatLngExpression[] | null =
    destinationPosition && Object.values(destinationPosition);

  const handleOriginChange = async (e: any) => {
    countriesRef.current = { ...countriesRef.current , origin : e.target.value  }
    let data = await fetch(
      ` https://api.opencagedata.com/geocode/v1/json?q=${e.target.value}&key=efe9790179764c9580dfba7fbbb73525`
    );

    let newData = await data.json();
    setOriginPosition((pre) => {
      return {
        ...pre,
        lat: newData?.results[0].geometry.lat,
        lng: newData?.results[0].geometry.lng,
      };
    });
  };

  const handleDestinationChange = async (e: any) => {
    countriesRef.current = { ...countriesRef.current , destination : e.target.value  }
    let data = await fetch(
      ` https://api.opencagedata.com/geocode/v1/json?q=${e.target.value}&key=efe9790179764c9580dfba7fbbb73525`
    );

    let newData = await data.json();
    setDestinationPosition((pre) => {
      return {
        ...pre,
        lat: newData?.results[0].geometry.lat,
        lng: newData?.results[0].geometry.lng,
      };
    });
  };

  return (
    <>
      <br />
      <br />
      <label>Select Origin Country:</label>
      <br />
      <div style={{"width" : "300px"}} >
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Origin</InputLabel>
      <Select onChange={(e) => handleOriginChange(e)}>
        {originCountriesData.map((origin, i) => (
          <MenuItem key={i} value={origin} selected={i === 0}>
            {origin}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      </div>
      <br />
      <br />
      <label>Select Destination Country:</label>
      <br />
      <div style={{"width" : "300px"}} >
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Destination</InputLabel>
      <Select onChange={(e) => handleDestinationChange(e)}>
        {destinationCountriesData.map((destination, i) => (
          <MenuItem key={i} value={destination} selected={i === 0}>
            {destination}
          </MenuItem>
        ))}
      </Select><br /><br />
      </FormControl>

      </div>


       <CheckCoordinates map={map} origin={originPosition} destination={destinationPosition} /> 
      <MapContainer
        style={{ height: 536 }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Boolean(originPosition) && (
          <Marker
            position={startingPin as unknown as LatLngExpression}
            icon={myIcon}
          >
            <Popup>
              Your Starting location. <br />
            </Popup>
          </Marker>
        )}
        {Boolean(destinationPosition) && (
          <Marker
            position={destinationPin as unknown as LatLngExpression}
            icon={myIcon}
          >
            <Popup>
              Your Destination location. <br />
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <br />
      <br />
      <br />
      <br />
      { isBookingOpen ? <Bookings origin={countriesRef.current.origin} destination={countriesRef.current.destination} originCountry={originPosition} destinationCountry={destinationPosition} /> : <h5>Please Select Your Origin And Destination Bookings</h5> }
    </>
  );
};
