package com.repos;

import com.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepos extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(long id);
    List<User> findAllByOrderById();
}
