package com.controller;

import com.domain.*;
import com.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UserController {
    @Autowired
    EmployeeRepos employeeRepos;

    @Autowired
    AllowanceRepos allowanceRepos;

    @Autowired
    DiseaseRepos diseaseRepos;

    @Autowired
    UserRepos userRepos;

    @Autowired
    PaymentRepos paymentRepos;

    @PostMapping("/employee/new")
    public String saveNewEmployee(@RequestBody Employee employee) {
        Employee employee1 = new Employee();
        employee1.setChildren(employee.getChildren());
        employee1.setFamily(employee.getFamily());
        employee1.setName(employee.getName());
        employee1.setPosition(employee.getPosition());
        employee1.setPersonalNumber(employee.getPersonalNumber());
        employee1.setSalary(employee.getSalary());
        employeeRepos.save(employee1);
        return "Создание успешно";
    }

    @PostMapping("/user/new")
    public String saveNewUser(@RequestBody User user) {
        User user1 = new User();
        user1.setChildren(user.getChildren());
        user1.setFamily(user.getFamily());
        user1.setName(user.getName());
        user1.setPosition(user.getPosition());
        user1.setPersonalNumber(user.getPersonalNumber());
        user1.setSalary(user.getSalary());
        user1.setPassword(user.getPassword());
        user1.setLogin(user.getUsername());
        user1.setRoles(user.getRoles());
        userRepos.save(user1);
        return "Создание успешно";
    }

    @PostMapping("/user/block")
    public String userBlock(@RequestParam long id) {
        User user = userRepos.findById(id);
        user.setRoles(Role.BLOCK);
        user.setActive(false);
        userRepos.save(user);
        return "Блокирование успешно";
    }

    @PostMapping("/employee/block")
    public String employeeBlock(@RequestParam long id) {
        Employee employee = employeeRepos.findById(id);
        employee.setActive(false);
        employeeRepos.save(employee);
        return "Блокирование успешно";
    }

    @PostMapping("/employee/edit")
    public String editEmployee(@RequestBody Employee employee,
                               @RequestParam long id) {
        Employee employee1 = employeeRepos.findById(id);
        employee1.setChildren(employee.getChildren());
        employee1.setFamily(employee.getFamily());
        employee1.setName(employee.getName());
        employee1.setPosition(employee.getPosition());
        employee1.setPersonalNumber(employee.getPersonalNumber());
        employee1.setSalary(employee.getSalary());
        employeeRepos.save(employee);
        return "Сохранение успешно";
    }

    @PostMapping("/user/edit")
    public String editUser(@RequestBody User user,
                           @RequestParam long id) {
        User user1 = userRepos.findById(id);
        user1.setChildren(user.getChildren());
        user1.setFamily(user.getFamily());
        user1.setName(user.getName());
        user1.setPosition(user.getPosition());
        user1.setPersonalNumber(user.getPersonalNumber());
        user1.setSalary(user.getSalary());
        user1.setPassword(user.getPassword());
        user1.setLogin(user.getUsername());
        user1.setRoles(user.getRoles());
        userRepos.save(user);
        return "Сохранение успешно";
    }

    @PostMapping("/user/edit/password")
    public String editPassswordUser(@RequestParam long id, @RequestBody String password)
    {
        User user = userRepos.findById(id);
        if(user != null)
        {
            user.setPassword(password);
            userRepos.save(user);
            return "Успех";
        }
        return "Пользователь не найден";
    }

    @GetMapping("/user/get/{id}")
    public User getUser(@PathVariable Long id) {
        long id2 = id;
        User user = userRepos.findById(id2);
        return user;
    }

    @GetMapping ("/user")
    public List<User> getAllUser(){
        return userRepos.findAll();
    }

    @GetMapping("/payment")
    public List<Payments> getPayment(@RequestParam int month, @RequestParam int year) {
        List<Payments> payments = paymentRepos.findAll();
        List<Payments> getPayments = new ArrayList<>();
        for (Payments payments1 : payments) {
            long date = payments1.getDayPayment();
            GregorianCalendar gregorianCalendar = new GregorianCalendar();
            gregorianCalendar.setTime(new Date(date));
            if((gregorianCalendar.get(Calendar.MONTH) == month) && (gregorianCalendar.get(Calendar.YEAR) == year)){
                getPayments.add(payments1);
            }
        }
        return getPayments;
    }
}
