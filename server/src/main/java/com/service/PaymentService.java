package com.service;

import com.domain.Employee;
import com.domain.Payments;
import com.repos.PaymentRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PaymentService {
    @Autowired
    PaymentRepos paymentRepos;

    @Autowired
    EmployeeService employeeService;

    public List<Payments> getPayment(int month, int year) {
        List<Payments> payments = paymentRepos.findAll();
        List<Payments> getPayments = new ArrayList<>();
        if(month == 0)
            year += 1;
        for (Payments payments1 : payments) {
            long date = payments1.getDayPayment();
            GregorianCalendar gregorianCalendar = new GregorianCalendar();
            gregorianCalendar.setTime(new Date(date));
            if((gregorianCalendar.get(Calendar.MONTH) == month) && (gregorianCalendar.get(Calendar.YEAR) == year)){
                getPayments.add(payments1);
            }
        }
        return getPayments;
    }

    public List<Payments> getPaymentOne(int month, int year, Long id) {
        Employee employee = employeeService.findById(id);
        List<Payments> payments = paymentRepos.findByEmployee(employee);
        List<Payments> getPayments = new ArrayList<>();
        for (Payments payments1 : payments) {
            long date = payments1.getDayPayment();
            GregorianCalendar gregorianCalendar = new GregorianCalendar();
            gregorianCalendar.setTime(new Date(date));
            if((gregorianCalendar.get(Calendar.MONTH) == month) && (gregorianCalendar.get(Calendar.YEAR) == year)){
                getPayments.add(payments1);
            }
        }
        return getPayments;
    }
}
