package com.domain;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    @JsonProperty("user")
    USER,
    @JsonProperty("admin")
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
