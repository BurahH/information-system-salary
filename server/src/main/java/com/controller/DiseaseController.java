package com.controller;

import com.domain.Disease;
import com.domain.Employee;
import com.domain.User;
import com.repos.DiseaseRepos;
import com.repos.EmployeeRepos;
import com.repos.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiseaseController {
    @Autowired
    DiseaseRepos diseaseRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    EmployeeRepos employeeRepos;

    @PostMapping("/diseance/new")
    public String addDiseance(@RequestParam long id, @RequestBody Disease disease) {
        Employee employee = employeeRepos.findById(id);
        if(employee != null) {
            disease.setEmployee(employee);
            diseaseRepos.save(disease);
            return "успех";
        }
        else
        {
            return "Пользователь не найден";
        }
    }

    @GetMapping("/user/get/Disease/{id}")
    public List<Disease> getDiseaseUser(@PathVariable Long id) {
        long id2 = id;
        User user = userRepos.findById(id2);
        List<com.domain.Disease> diseases = diseaseRepos.findByEmployee(user);
        return diseases;
    }
}
