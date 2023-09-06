package com.library.RentABook.services;

import com.library.RentABook.entities.Book;

import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book createBook(Book book);
    Book updateBook(Long id, Book book);
    void deleteBook(Long id);
    Book borrowBook(Long bookId);
}
