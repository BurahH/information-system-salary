package com.service;

import com.config.JwtService;
import com.domain.User;
import com.repos.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepos userRepos;
    @Autowired
    JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepos.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }

    public User findById(long id) {
        return userRepos.findById(id);
    }

    public User findByUsername(String username) {
        return userRepos.findByUsername(username);
    }

    public String saveUser(User user) {
        User checkUser = findByUsername(user.getUsername());
        if(checkUser != null)
            return "Ошибка, пользователь существует";
        User user1 = new User();
        user1 = redactUser(user1, user);
        user1.setPassword(passwordEncoder.encode(user.getPassword()));
        user1.setLogin(user.getUsername());
        userRepos.save(user1);
        return "Создание успешно";
    }

    public void editUser(User user, long id) {
        User user1 = findById(id);
        user1 = redactUser(user1, user);
        userRepos.save(user);
    }

    public User redactUser(User user1, User user) {
        user1.setChildren(user.getChildren());
        user1.setFamily(user.getFamily());
        user1.setName(user.getName());
        user1.setPosition(user.getPosition());
        user1.setPersonalNumber(user.getPersonalNumber());
        user1.setSalary(user.getSalary());
        user1.setRoles(user.getRoles());
        return user1;
    }

    public String editPassword(long id, String password) {
        User user = findById(id);
        if(user != null)
        {
            user.setPassword(passwordEncoder.encode(password));
            userRepos.save(user);
            return "Успех";
        }
        return "Пользователь не найден";
    }

    public List<User> findAllByOrderById() {
        return userRepos.findAllByOrderById();
    }

    public User getByJwt(String authorization) {
        String jwt = authorization.substring(7);
        String userUsername = jwtService.extractUsername(jwt);
        User user = findByUsername(userUsername);
        return user;
    }
}
