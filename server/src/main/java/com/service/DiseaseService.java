package com.service;

import com.domain.Disease;
import com.domain.Employee;
import com.repos.DiseaseRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseService {
    @Autowired
    DiseaseRepos diseaseRepos;
    @Autowired
    EmployeeService employeeService;

    public String addDisease(long id, Disease disease) {
        Employee employee = employeeService.findById(id);
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

    public List<Disease> getDiseaseUser(long id) {
        Employee employee = employeeService.findById(id);
        List<com.domain.Disease> diseases = diseaseRepos.findByEmployee(employee);
        return diseases;
    }
}
