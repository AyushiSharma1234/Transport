import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export const Login = () => {
  interface IFormInput {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    loginHandler(data)
  };

  const loginHandler = async (data:IFormInput) => {
    let result = await fetch("http://localhost:3000/user/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result", result);
  };

  return (
    <>
      <h3> Please Login </h3>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="search"
            variant="standard"
            {...register("email", {
              required: true,
            })}
          />
          <br />
          {errors?.email?.type === "required" && <p>This field is required</p>}

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
          <br />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
