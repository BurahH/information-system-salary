package com.repos;

import com.domain.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepos extends JpaRepository<Payments, Long> {
    Payments findTopByOrderByDayPaymentDesc();
}
