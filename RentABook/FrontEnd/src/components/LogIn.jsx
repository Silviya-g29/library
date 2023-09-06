import { useState, useEffect ,useContext} from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { generateRandomString } from "../utils/functions";
import { LibraryContext } from "../context";
import { register } from "../api/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  textAlign: "center",
  boxShadow: 24,
  p: 4,
};

const Recapcha = ({ btnDissabled, data }) => {
    
const { updateLoggedInStatus , updateShowNotification } = useContext(LibraryContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [reCapcha, setReCapcha] = useState(generateRandomString(5));
  const [reCapchaValue, setReCapchaValue] = useState("");
  const [reCapchaVAttepts, setReCapchaVAttepts] = useState(0);

 const handleLogIn = async () => {
  if (reCapchaValue !== reCapcha) {
    setReCapchaVAttepts((prevNum) => prevNum + 1);
    setError(true);
    return false;
  }

  const status = await register(data); 
  console.log(status);
  updateLoggedInStatus(status);
  updateShowNotification({open:'true' , mgs:'Successfully logged in'});
  localStorage.setItem("loggedInStatus", status);
};


  const handleReCapcha = (e) => {
    const { value } = e.target;

    setError(false);
    setReCapchaValue(value);
  };

  useEffect(() => {
    setReCapcha(generateRandomString(5));
  }, [reCapchaVAttepts]);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        disabled={btnDissabled}
        onClick={() => setOpen(true)}
      >
        LOG IN
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 250 }}>
          <h2 id="child-modal-title">reCAPTCHA</h2>
          <p id="child-modal-description">
            Please fill the letters/number you see below
          </p>
          <Box
            mb={2}
            sx={{ border: "1px solid black", textDecoration: "line-through" }}
          >
            <Typography variant="h6" component="h2">
              {reCapcha}
            </Typography>
          </Box>

          <TextField
            value={reCapchaValue}
            onChange={(e) => handleReCapcha(e)}
            sx={{ marginBottom: error ? 2 : 5 }}
            id="outlined-basic"
            label="reCAPTCHA"
            variant="filled"
          />
          {error && (
            <Typography
              variant="h6"
              component="h3"
              sx={{ marginBottom: 2, color: "red" }}
            >
              Try again!
            </Typography>
          )}

          <Button variant="contained" onClick={handleLogIn}>
            Continue
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const LogIn = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isBtnDissabled, setIsBtnDissabled] = useState(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    setIsBtnDissabled(!(formData.username && formData.password));
  }, [formData]);

  return (
    <Box minHeight="50vh" mt="auto" sx={{ textAlign: "center" }}>
      <h1>Rent A Book</h1>
      <Button variant="contained" size="large" onClick={() => setOpen(true)}>
        🔥Hop in your account🔥
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={5} id="modal-modal-title" variant="h6" component="h2">
            Sign in
          </Typography>
          <Box>
            <TextField
              name="username"
              value={formData["username"]}
              sx={{ marginBottom: 5 }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e) => handleFormChange(e)}
            />
            <TextField
              name="password"
              value={formData["password"]}
              sx={{ marginBottom: 5 }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => handleFormChange(e)}
            />
          </Box>
          <Recapcha btnDissabled={isBtnDissabled} data={formData} />
        </Box>
      </Modal>
    </Box>
  );
};

export default LogIn;
