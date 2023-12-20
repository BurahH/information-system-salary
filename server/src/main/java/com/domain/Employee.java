package com.domain;

import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class Employee {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private String personalNumber;
    private String name;
    private String position;
    private int salary;
    private String family;
    private int children;
}
