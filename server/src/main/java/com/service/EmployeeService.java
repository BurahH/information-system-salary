package com.service;

import com.domain.Employee;
import com.repos.EmployeeRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepos employeeRepos;

    public String saveEmployee(Employee employee) {
        Employee employee1 = new Employee();
        employee1 = redactEmployee(employee1, employee);
        employeeRepos.save(employee1);
        return "Создание успешно";
    }

    public Employee findById(long id) {
        return employeeRepos.findById(id);
    }

    public void block(long id) {
        Employee employee = findById(id);
        employee.setActive(false);
        employeeRepos.save(employee);
    }

    public void unblock(long id) {
        Employee employee = findById(id);
        employee.setActive(true);
        employeeRepos.save(employee);
    }

    public void editEmployee(Employee employee, long id) {
        Employee employee1 = employeeRepos.findById(id);
        employee1 = redactEmployee(employee1, employee);
        employeeRepos.save(employee1);
    }

    public Employee redactEmployee(Employee employee1, Employee employee) {
        employee1.setChildren(employee.getChildren());
        employee1.setFamily(employee.getFamily());
        employee1.setName(employee.getName());
        employee1.setPosition(employee.getPosition());
        employee1.setPersonalNumber(employee.getPersonalNumber());
        employee1.setSalary(employee.getSalary());
        return employee1;
    }

    public List<Employee> findAll() {
        return employeeRepos.findAll();
    }

    public List<Employee> findAllByOrderById() {
        return employeeRepos.findAllByOrderById();
    }
}
