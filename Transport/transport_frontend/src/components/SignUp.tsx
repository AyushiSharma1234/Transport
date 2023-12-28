import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  interface IFormInput {
    role: string;
    name: string;
    email: string;
    password: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    let result = await fetch("http://localhost:4000/user/signUp", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
  };

  return (
    <>
      <h3> Sign Up </h3>

      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            type="search"
            variant="standard"
            {...register("name", {
              required: true,
            })}
          />
          <br />
          {errors?.name?.type === "required" && <p>This field is required</p>}

          <TextField
            label="Email"
            type="search"
            variant="standard"
            {...register("email", {
              required: true,
            })}
          />
          <br />
          {errors?.name?.type === "required" && <p>This field is required</p>}

          <TextField
            label="Password"
            type="password"
            variant="standard"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password?.type === "required" && (
            <p> This field is required </p>
          )}
          <br />
          <TextField
            label="Phone"
            type="search"
            variant="standard"
            {...register("phone", {
              required: true,
            })}
          />
          {errors?.phone?.type === "required" && (
            <p> This field is required </p>
          )}

          <br />
          <br />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
