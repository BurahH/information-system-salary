package com.domain;

import javax.persistence.*;

@Entity
public class Payments {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne
    private Employee employee;
    private int salary;
    private int summaAllowance;
    private int dayDisease;
    private long dayPayment;
    private int summaPayment;

    public Payments() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getSummaAllowance() {
        return summaAllowance;
    }

    public void setSummaAllowance(int summaAllowance) {
        this.summaAllowance = summaAllowance;
    }

    public int getDayDisease() {
        return dayDisease;
    }

    public void setDayDisease(int dayDisease) {
        this.dayDisease = dayDisease;
    }

    public long getDayPayment() {
        return dayPayment;
    }

    public void setDayPayment(long dayPayment) {
        this.dayPayment = dayPayment;
    }

    public int getSummaPayment() {
        return summaPayment;
    }

    public void setSummaPayment(int summaPayment) {
        this.summaPayment = summaPayment;
    }
}
