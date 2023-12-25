package com.repos;

import com.domain.Employee;
import com.domain.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepos extends JpaRepository<Payments, Long> {
    Payments findTopByOrderByDayPaymentDesc();
    List<Payments> findByEmployee(Employee employee);
}
