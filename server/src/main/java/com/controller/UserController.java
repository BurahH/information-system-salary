package com.controller;

import com.domain.*;
import com.repos.*;
import com.service.EmployeeService;
import com.service.PaymentService;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    PaymentService paymentService;

    @CrossOrigin
    @PostMapping("/employee/new")
    public String saveNewEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @CrossOrigin
    @PostMapping("/user/new")
    public String saveNewUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @CrossOrigin
    @PostMapping("/block")
    public String employeeBlock(@RequestParam long id) {
        employeeService.block(id);
        return "Блокирование успешно";
    }

    @CrossOrigin
    @PostMapping("/unblock")
    public String employeeUnBlock(@RequestParam long id) {
        employeeService.unblock(id);
        return "Разблокирование успешно";
    }

    @CrossOrigin
    @PostMapping("/employee/edit")
    public String editEmployee(@RequestBody Employee employee,
                               @RequestParam long id) {
        employeeService.editEmployee(employee, id);
        return "Сохранение успешно";
    }

    @CrossOrigin
    @PostMapping("/user/edit")
    public String editUser(@RequestBody User user,
                           @RequestParam long id) {
        userService.editUser(user, id);
        return "Сохранение успешно";
    }

    @CrossOrigin
    @PostMapping("/user/edit/password")
    public String editPassswordUser(@RequestParam long id, @RequestBody String password)
    {
        return userService.editPassword(id, password);
    }

    @CrossOrigin
    @GetMapping("/user/get/{id}")
    public User getUser(@PathVariable Long id) {
        long id2 = id;
        User user = userService.findById(id2);
        return user;
    }

    @CrossOrigin(origins = "*")
    @GetMapping ("/user")
    public List<User> getAllUser(){
        return userService.findAllByOrderById();
    }

    @CrossOrigin
    @GetMapping("/employee/get/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        long id2 = id;
        Employee employee = employeeService.findById(id2);
        return employee;
    }


    @GetMapping ("/employee")
    public List<Employee> getAllEmployee(){
        return employeeService.findAllByOrderById();
    }

    @CrossOrigin
    @GetMapping("/payment")
    public List<Payments> getPayment(@RequestParam int month, @RequestParam int year) {
        return paymentService.getPayment(month, year);
    }

    @CrossOrigin
    @GetMapping("/payment/{id}")
    public List<Payments> getPayment(@RequestParam int month, @RequestParam int year, @PathVariable Long id) {
        return  paymentService.getPaymentOne(month, year, id);
    }

    @CrossOrigin
    @GetMapping("/user/jwt")
    public User getPayment(@RequestHeader String Authorization) {
        return userService.getByJwt(Authorization);
    }
}
