import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

interface Errorprops {
  show: boolean;
  errorMessage: string;
  closeModal: () => void;
}

export const ErrorMessage = ({
  closeModal,
  show,
  errorMessage,
}: Errorprops) => {
  return (
    <div>
      <Snackbar
        key={Math.random()}
        open={show}
        autoHideDuration={6000}
        onClose={closeModal}
        message={errorMessage}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

// // Existing imports and interfaces...

// export const FormWrapper = ({
//   onSubmit,
//   step,
//   children,
// }: {
//   onSubmit: (data: ForgetPassword) => void;
//   step: number;
//   children: React.ReactNode;
// }) => {
//   const isStepOneOrThree = step === 1 || step === 3;

//   return isStepOneOrThree ? (
//     <form onSubmit={onSubmit as React.FormEventHandler}>
//       {children}
//       <Button type="submit">Submit</Button>
//     </form>
//   ) : (
//     <>
//       {children}
//       <Button onClick={onSubmit}>Next</Button>
//     </>
//   );
// };

// export const PasswordTextField = ({ onCloseModal }: ForgetPasswordProps) => {
//   // ...existing code remains unchanged...

//   return (
//     <>
//       <div style={{ padding: "25px", width: "450px" }}>
//         <DialogTitle>
//           {renderInputElement(passwordSteps).textToRender}
//         </DialogTitle>
//         <FormWrapper
//           onSubmit={handleSubmit(handleFormSubmit)}
//           step={passwordSteps}
//         >
//           {renderInputElement(passwordSteps)}
//         </FormWrapper>
//         <Button onClick={onCloseModal}>Close</Button>
//       </div>
//       <ErrorMessage
//         show={showToast}
//         closeModal={closeErrorMessage}
//         errorMessage={errorMessageToRender[passwordSteps as keyof ShowError]}
//       />
//     </>
//   );
// };
