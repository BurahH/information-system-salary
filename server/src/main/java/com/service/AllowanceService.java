package com.service;

import com.domain.Allowance;
import com.domain.Employee;
import com.repos.AllowanceRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllowanceService {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    AllowanceRepos allowanceRepos;

    public String newAllowance(long id, Allowance allowance) {
        Employee employee = employeeService.findById(id);
        if(employee != null) {
            allowance.setEmployee(employee);
            allowanceRepos.save(allowance);
            return "Успешно";
        }
        else {
            return "Пользователь не найден";
        }
    }

    public List<Allowance> getAllowanceUser(long id) {
        Employee employee = employeeService.findById(id);
        List<Allowance> allowances = allowanceRepos.findByEmployee(employee);
        return allowances;
    }
}
