package com.controller;

import com.domain.Allowance;
import com.domain.Employee;
import com.domain.User;
import com.repos.AllowanceRepos;
import com.repos.EmployeeRepos;
import com.repos.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AllowanceController {
    @Autowired
    AllowanceRepos allowanceRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    EmployeeRepos employeeRepos;

    @PostMapping("/Allowance/new")
    public String newAllowance(@RequestParam long id, @RequestBody Allowance allowance){
        Employee employee = employeeRepos.findById(id);
        if(employee != null) {
            allowance.setEmployee(employee);
            allowanceRepos.save(allowance);
            return "Успешно";
        }
        else {
            return "Пользователь не найден";
        }
    }

    @GetMapping("/user/get/Allowance/{id}")
    public List<Allowance> getAllowanceUser(@PathVariable Long id) {
        long id2 = id;
        User user = userRepos.findById(id2);
        List<Allowance> allowances = allowanceRepos.findByEmployee(user);
        return allowances;
    }
}
