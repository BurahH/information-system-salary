package com.repos;

import com.domain.Disease;
import com.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiseaseRepos extends JpaRepository<Disease, Long> {
    List<Disease> findByEmployee(Employee employee);
}
