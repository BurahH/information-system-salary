package com.controller;

import com.domain.Allowance;
import com.domain.Employee;
import com.domain.User;
import com.repos.AllowanceRepos;
import com.repos.EmployeeRepos;
import com.repos.UserRepos;
import com.service.AllowanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AllowanceController {

    @Autowired
    AllowanceService allowanceService;


    @CrossOrigin
    @PostMapping("/Allowance/new")
    public String newAllowance(@RequestParam long id, @RequestBody Allowance allowance){
        return allowanceService.newAllowance(id, allowance);
    }

    @CrossOrigin
    @GetMapping("/user/get/Allowance/{id}")
    public List<Allowance> getAllowanceUser(@PathVariable Long id) {
        return allowanceService.getAllowanceUser(id);
    }
}
