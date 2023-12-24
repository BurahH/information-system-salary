package com.controller;

import com.domain.Disease;
import com.domain.Employee;
import com.domain.User;
import com.repos.DiseaseRepos;
import com.repos.EmployeeRepos;
import com.repos.UserRepos;
import com.service.DiseaseService;
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
    @Autowired
    DiseaseService diseaseService;

    @CrossOrigin
    @PostMapping("/diseance/new")
    public String addDiseance(@RequestParam long id, @RequestBody Disease disease) {
        return diseaseService.addDisease(id, disease);
    }

    @GetMapping("/user/get/Disease/{id}")
    public List<Disease> getDiseaseUser(@PathVariable Long id) {
        return diseaseService.getDiseaseUser(id);
    }
}
