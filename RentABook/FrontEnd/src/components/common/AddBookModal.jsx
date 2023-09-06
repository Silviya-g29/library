import { useState, useEffect,useContext } from "react";

import {
  Modal,
  TextField,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { addAbook, addAuthor } from "../../api/api";
import { LibraryContext } from "../../context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  p: 4,
};

const AddBookModal = () => {
  const { updateUpdator , updateShowNotification } = useContext(LibraryContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    genre: "Romance",
    name: "",
    lastname: "",
    availableCopies:0,
  });
  const [isBtnDissabled, setIsBtnDissabled] = useState(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddBook = async () => {
    const authorData = await addAuthor(formData);
    
    await addAbook({...formData , id: authorData.id});
    setOpen(false);
    updateUpdator(prevValue => prevValue + 1);
    updateShowNotification({open:true,msg:`${formData.title} was added`})
  };

  useEffect(() => {
    setIsBtnDissabled(
    Object.values(formData).some(value => value === "" || value === 0)
  );
  }, [formData]);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        Add a new Book
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" gap={5}>
            <Box textAlign="center">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Book
              </Typography>
              <TextField
                name="title"
                value={formData["title"]}
                sx={{ marginBottom: 5 }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) => handleFormChange(e)}
              />
      
              <Select
                sx={{minWidth:"100%"}}
                name="genre"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData["genre"]}
                onChange={(e) => handleFormChange(e)}
              >
                <MenuItem value="SciFi">SciFi</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
                <MenuItem value="NonFiction">NonFiction</MenuItem>
              </Select>
            </Box>

            <Box textAlign="center">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Author
              </Typography>
              <TextField
                name="name"
                value={formData["name"]}
                sx={{ marginBottom: 5 }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={(e) => handleFormChange(e)}
              />
              <TextField
                name="lastname"
                value={formData["lastname"]}
                sx={{ marginBottom: 5 }}
                id="outlined-basic"
                label="Lastname"
                variant="outlined"
                onChange={(e) => handleFormChange(e)}
              />
            </Box>
          </Box>

          <TextField
            name="availableCopies"
            value={formData["availableCopies"]}
            sx={{ marginBottom: 5 }}
            id="outlined-basic"
            label="Available Copies"
            variant="outlined"
            type="number"
            onChange={(e) => handleFormChange(e)}
          />

          <Button
            disabled={isBtnDissabled}
            variant="contained"
            color="success"
            onClick={handleAddBook}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddBookModal;
