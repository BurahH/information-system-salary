package com.domain;


import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role{
    @JsonProperty("user")
    USER,
    @JsonProperty("admin")
    ADMIN,
    @JsonProperty("block")
    BLOCK;
}
