package com.repos;

import com.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepos extends JpaRepository<Employee, Long> {
    Employee findById(long id);
}
