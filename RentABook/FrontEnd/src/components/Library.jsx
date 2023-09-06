import { useEffect, useState, useContext } from "react";

import {
  Box,
  Badge,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import BookTwoTone from "@mui/icons-material/MenuBook";

import { getAllBooks, getAllAuthors } from "../api/api";
import BookContainer from "./common/BookContainer";
import AddBookModal from "./common/AddBookModal";
import { LibraryContext } from "../context";

const Library = () => {
  const { updator } = useContext(LibraryContext);
  const [allBooksFromDb, setAllBooksFromDb] = useState([]);
  const [selectedBook, setselectedBook] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const allBooks = await getAllBooks();
      await getAllAuthors();

      setAllBooksFromDb(allBooks);
      setselectedBook(false);
    };

    fetchData();
  }, [updator]);

  return (
    <Box
      pt={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 90px)"
    >
      <Box
        display="flex"
        width="100%"
        alignItems="baseline"
        gap={2}
        mb={3}
        justifyContent="center"
      >
        <Typography variant="h4" component="h2" color={grey[700]}>
          All Books In The Library
        </Typography>
        <Badge
          badgeContent={allBooksFromDb.reduce(
            (acc, obj) => acc + obj.availableCopies,
            0
          )}
          color="primary"
          mt="auto"
        >
          <BookTwoTone color="action" />
        </Badge>
      </Box>

      <Box
        key={updator}
        display="flex"
        flexDirection="column"
        width="100%"
        mb={3}
        alignItems="center"
      >
        <Typography variant="p" component="h2" color={grey[700]} mb={1}>
          Search from the library
        </Typography>

        <Autocomplete
          disablePortal
          id="combo-box"
          options={allBooksFromDb}
          getOptionLabel={(option) =>
            `${option.title} - Copies: ${option.availableCopies}`
          }
          sx={{ maxWidth: 450, minWidth: 350, backgroundColor: "white" }}
          onChange={(_, value) => setselectedBook(value)}
          renderInput={(params) => <TextField {...params} label="Books" />}
        />
      </Box>

      {selectedBook && <BookContainer bookData={selectedBook} />}

      <AddBookModal />
    </Box>
  );
};

export default Library;
