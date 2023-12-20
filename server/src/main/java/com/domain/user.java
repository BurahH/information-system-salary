package com.domain;

import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.Set;

public class user extends Employee{

    private String login;
    private String password;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Role roles;
}
