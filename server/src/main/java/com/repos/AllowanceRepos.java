package com.repos;


import com.domain.Allowance;
import com.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllowanceRepos extends JpaRepository<Allowance, Long> {
    List<Allowance> findByEmployee(Employee employee);
}
