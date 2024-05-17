import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { forgetPasswordUser, verifyOtpUser } from "../config/config";
import { ErrorMessage } from "./ErrorMessage";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

interface PasswordSteps {
  1: {
    inputElement: React.ReactNode;
    textToRender: string;
  };
  2: {
    inputElement: React.ReactNode;
    textToRender: string;
  };
  3: {
    inputElement: React.ReactNode;
    textToRender: string;
  };
}

interface ForgetPassword {
  email: string;
  otp: string;
  newPassword: string;
  ["confirm password"]: string;
}

interface ForgetPasswordProps {
  onCloseModal: () => void;
}

interface Toast {
  showModal: boolean;
  messageToRender: string;
}

export const PasswordTextField = ({ onCloseModal }: ForgetPasswordProps) => {
  const [passwordSteps, setPasswordSteps] = useState(1);
  const [otpFieldValidation, setOtpFieldValidation] = useState(false);
  const [toast, setToast] = useState<Toast>({
    showModal: false,
    messageToRender: "",
  });
  const navigate = useNavigate();

  const { showModal, messageToRender } = toast;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgetPassword>();

  const forgetPasswrordHit = passwordSteps < 2 ? true : false;
  const verifyOtpHit = passwordSteps > 2 ? true : false;

  const forgetPasswordSteps: PasswordSteps = {
    1: {
      inputElement: (
        <>
          <TextField
            key={Math.random()}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", {
              required: true,
            })}
          />
          <br />
          {errors?.email?.type === "required" && (
            <p className="error">This field is required</p>
          )}
        </>
      ),
      textToRender: "Enter Your Email",
    },
    2: {
      inputElement: (
        <>
          <TextField
            key={Math.random()}
            margin="dense"
            id="otp"
            label="Enter OTP"
            type="text"
            fullWidth
            variant="standard"
            {...register("otp", { required: passwordSteps > 1 ? true : false })}
          />
          <br />
          {otpFieldValidation && (
            <p className="error">This field is required</p>
          )}
        </>
      ),
      textToRender: "Enter OTP",
    },
    3: {
      inputElement: (
        <>
          <TextField
            key={Math.random()}
            margin="dense"
            id="p1"
            label="Enter New Password"
            type="password"
            fullWidth
            variant="standard"
            {...register("newPassword", {
              required: passwordSteps > 2 ? true : false,
            })}
          />
          <br />
          {errors?.newPassword?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          <TextField
            key={Math.random()}
            margin="dense"
            id="p2"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            {...register("confirm password", {
              required: passwordSteps > 2 ? true : false,
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          <br />
          {errors?.["confirm password"]?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          {errors?.["confirm password"]?.type === "validate" && (
            <p className="error">Your passwords do no match</p>
          )}
        </>
      ),
      textToRender: "Enter Your Password",
    },
  };

  const handleNextStep = () => {
    if (passwordSteps === 2 && !Boolean(watch("otp"))) {
      setOtpFieldValidation(true);
      return;
    }

    let nextPassworStep = passwordSteps;
    if (nextPassworStep >= 3) {
      setPasswordSteps(3);
      return;
    }
    nextPassworStep++;
    setPasswordSteps(nextPassworStep);
  };

  const onSubmit = async (data: any) => {
    let { email, otp, newPassword } = data;

    // forget-password api
    if (forgetPasswrordHit) {
      let response = await forgetPasswordUser({ email });
      console.log("forget", response);
      if (Object.hasOwn(response, "error")) {
        setToast({
          showModal: true,
          messageToRender: response.error,
        });
        return;
      }
    }

    // verify-otp api
    if (verifyOtpHit) {
      let requestObj = { email, OTP: otp, newPassword };

      let response = await verifyOtpUser(requestObj);
      if (!response.data.success) {
        setToast({
          showModal: true,
          messageToRender: response.data.result,
        });
        return;
      } else {
        onCloseModal();
        navigate("/login");
      }
    }
    handleNextStep();
  };

  const closeErrorMessage = () => {
    setToast({
      showModal: false,
      messageToRender: "",
    });
  };

  return (
    <>
      <div
        className="forgetPasswordModalParent"
        style={{ padding: "25px", width: "450px" }}
      >
        <div className="forgetPasswordModalContent">
          <DialogTitle>
            {
              forgetPasswordSteps[
                passwordSteps as unknown as keyof PasswordSteps
              ].textToRender
            }
          </DialogTitle>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={onCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {[1, 3].includes(passwordSteps) ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                forgetPasswordSteps[
                  passwordSteps as unknown as keyof PasswordSteps
                ].inputElement
              }
              <br />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </>
        ) : (
          <>
            {
              forgetPasswordSteps[
                passwordSteps as unknown as keyof PasswordSteps
              ].inputElement
            }
            <Button onClick={handleNextStep} variant="contained">
              Next
            </Button>
          </>
        )}
      </div>
      <ErrorMessage
        closeModal={closeErrorMessage}
        show={showModal}
        errorMessage={messageToRender}
      />
    </>
  );
};