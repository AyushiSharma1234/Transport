import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";

interface Bookings {
  origin: string;
  destination: string;
  originCountry: any;
  destinationCountry: any;
}

export const Bookings = ({
  origin,
  destination,
  originCountry,
  destinationCountry,
}: Bookings) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    let requestBody = {
      coordinates: {
        origion: {
          latitude: originCountry.lat,
          longitude: originCountry.lng,
        },
        destination: {
          latitude: destinationCountry.lat,
          longitude: destinationCountry.lng,
        },
      },
      address: data.address,
    };
    console.log("data.address", data.address);
    try {
      let response = await fetch("http://localhost:4000/booking", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let bookingData = await response.json();
      console.log("bookingData", bookingData);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Typography variant="h6">Origin Country:</Typography>
        <TextField
          {...register("origion")}
          defaultValue={origin}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <br />
        <Typography variant="body2">
          {originCountry && "You have already selected your origin country"}
        </Typography>
        <br />
        <Typography variant="h6">Destination Country:</Typography>
        <TextField
          {...register("destination")}
          defaultValue={destination}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <br />
        <Typography variant="body2">
          {destinationCountry &&
            "You have already selected your destination country"}
        </Typography>
        <br />
        <TextField
          multiline
          rows={4}
          placeholder="Enter Your Address"
          {...register("address")}
          variant="outlined"
          fullWidth
        />
        <br />
        <Button type="submit" variant="contained">
          Get Booking
        </Button>
      </form>
    </div>
  );
};
