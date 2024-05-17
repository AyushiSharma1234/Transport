import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";

import Dialog from "@mui/material/Dialog";
import { PasswordTextField } from "./PasswordTextField";
import { ErrorMessage } from "./ErrorMessage";

export const ForgetPasswordModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <PasswordTextField onCloseModal={handleClose} />
      </Dialog>
    </React.Fragment>
  );
});
