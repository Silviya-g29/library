package com.library.RentABook.services;

import com.library.RentABook.entities.Author;

import java.util.List;

public interface AuthorService {

    Author createAuthor(Author author);
    Author getAuthorById(Long id);
    List<Author> getAllAuthors();
    boolean deleteAuthor(Long id);
    void updateAuthor(Author author);
}
