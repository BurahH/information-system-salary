package com.controller;

import com.domain.Disease;
import com.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiseaseController {

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
