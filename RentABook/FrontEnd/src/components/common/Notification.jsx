import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({ msg, type }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: type?"top":"right" }}
      autoHideDuration={2000}
      open={open}
      onClose={() => setOpen(false)}
      key="lmbo"
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={type ? type : "success"}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
