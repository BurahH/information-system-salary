package com.domain;

import javax.persistence.*;

@Entity
@Table(name = "usr")
public class User extends Employee {

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role roles;

    public User() {
        roles = Role.USER;
    }

    public void setLogin(String login) {
        this.username = login;
    }


    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRoles() {
        return roles;
    }

    public void setRoles(Role roles) {
        this.roles = roles;
    }
}
