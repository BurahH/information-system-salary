package com.domain;

import javax.persistence.*;

@Entity
public class Allowance {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private int summa;
    private String information;
    private long date;

    @OneToOne
    private Employee employee;

    public Allowance() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getSumma() {
        return summa;
    }

    public void setSumma(int summa) {
        this.summa = summa;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
