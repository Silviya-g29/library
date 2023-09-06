package com.library.RentABook.services;

import com.library.RentABook.entities.Author;
import com.library.RentABook.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public boolean deleteAuthor(Long id) {
        if (authorRepository.existsById(id)) {
            authorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void updateAuthor(Author author) {
        authorRepository.save(author);
    }
}
