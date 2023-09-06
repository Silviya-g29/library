package com.library.RentABook.services;

import com.library.RentABook.entities.Book;
import com.library.RentABook.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookImpl implements BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        return optionalBook.orElse(null);
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book) {
        if (!bookRepository.existsById(id)) {
            return null; // Or throw an exception
        }
        book.setId(id);
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book borrowBook(Long bookId) {
        Book book = getBookById(bookId);
        if (book != null && book.getAvailableCopies() > 0) {
            int updatedAvailableCopies = book.getAvailableCopies() - 1;
            book.setAvailableCopies(updatedAvailableCopies);
            updateBook(bookId, book);
        }
        return book;
    }

}
