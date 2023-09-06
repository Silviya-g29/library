import { useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  TextField,
  Box,
} from "@mui/material";

import { deleteBook, updateTitle, borrowBook } from "../../api/api";

import img from "../../images/book.jpg";
import { LibraryContext } from "../../context";

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
  display: "flex",
  flexDirection: "column",
};

const BookContainer = ({ bookData }) => {
  const { updateUpdator, updateShowNotification } = useContext(LibraryContext);
  const [openModal, setOpenModal] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");

  const handleDeleteBook = async () => {
    const isDeleted = await deleteBook({ bookId: bookData.id });
    const notification = isDeleted
      ? { open: true, msg: `Successfully deleted ${bookData.title}` }
      : { open: true, msg: `Error in Deleting ${bookData.title}` };

    updateUpdator((prevValue) => prevValue + 2);
    updateShowNotification(notification);
  };

  const handleChangeBookTitle = async () => {
    const isUpdated = await updateTitle({ ...bookData, title: newBookTitle });
    const notification = isUpdated
      ? { open: true, msg: `Updated ${newBookTitle}` }
      : { open: true, msg: `Failed updating ${newBookTitle}` };

    updateUpdator((prevValue) => prevValue + 2);
    updateShowNotification(notification);
  };

  const handleBorrowBook = async () => {
    if (bookData.availableCopies === 0) {
      updateShowNotification({
        open: true,
        msg: `Sorry, we don't allow borrowing the last copy 🙇`,
        type:"error"
      });
    } else {
      const isBorrowed = await borrowBook({
        ...bookData,
        availableCopies: bookData.availableCopies - 1,
      });
      const notification = isBorrowed
        ? { open: true, msg: `Borrowed ${bookData.title}` }
        : { open: true, msg: `Failed Borrowing ${bookData.title}` };

      updateUpdator((prevValue) => prevValue + 2);
      updateShowNotification(notification);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" sx={{ height: 200 }} src={img} title="book" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bookData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author:{` ${bookData.author.name} ${bookData.author.lastname}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre:{` ${bookData.genre}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleBorrowBook}>
          Borrow
        </Button>
        <Button size="small" onClick={handleDeleteBook}>
          Delete
        </Button>
        <Button size="small" onClick={() => setOpenModal(true)}>
          Change Book Title
        </Button>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              name="title"
              value={newBookTitle}
              sx={{ marginBottom: 5 }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) => setNewBookTitle(e.target.value)}
            />
            <Button
              disabled={!newBookTitle}
              variant="contained"
              size="small"
              onClick={handleChangeBookTitle}
            >
              Confirm
            </Button>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default BookContainer;
