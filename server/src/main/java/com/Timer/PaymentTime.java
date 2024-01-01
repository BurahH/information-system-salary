package com.Timer;

import com.domain.*;
import com.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Component
public class PaymentTime {
    @Autowired
    PaymentRepos paymentRepos;

    @Autowired
    EmployeeRepos employeeRepos;

    @Autowired
    AllowanceRepos allowanceRepos;

    @Autowired
    DiseaseRepos diseaseRepos;

    @Scheduled(fixedDelay = 60000)
    public void paymentTime(){
        GregorianCalendar gregorianCalendar = new GregorianCalendar();
        int newMonth = gregorianCalendar.get(Calendar.MONTH);
        Payments payments = paymentRepos.findTopByOrderByDayPaymentDesc();
        long lastDay = payments.getDayPayment();
        GregorianCalendar gregorianCalendar2 = new GregorianCalendar();
        gregorianCalendar2.setTimeInMillis(lastDay);
        int oldMonth = gregorianCalendar2.get(Calendar.MONTH);
        if(newMonth > oldMonth){
            paymentSave();
        } else if ((newMonth == 0) && (oldMonth == 11))
        {
            paymentSave();
        }
    }

    private void paymentSave() {
        List<Employee> employees = employeeRepos.findAll();
        for(Employee employee : employees) {
            if (employee.isActive()) {
                Payments payments = new Payments();
                payments.setEmployee(employee);
                payments.setSalary(employee.getSalary());
                List<Allowance> allowances = allowanceRepos.findByEmployee(employee);
                int summa = 0;
                int month;
                int newMonth = new GregorianCalendar().get(Calendar.MONTH);
                if (newMonth == 0)
                    month = 11;
                else
                    month = new GregorianCalendar().get(Calendar.MONTH) - 1;
                for (Allowance allowance : allowances) {
                    GregorianCalendar gregorianCalendar = new GregorianCalendar();
                    gregorianCalendar.setTimeInMillis(allowance.getDate());
                    if (gregorianCalendar.get(Calendar.MONTH) == month) {
                        summa += allowance.getSumma();
                    }
                }
                payments.setSummaAllowance(summa);
                summa = 0;
                List<Disease> diseases = diseaseRepos.findByEmployee(employee);
                for (Disease disease : diseases) {
                    GregorianCalendar gregorianCalendar = new GregorianCalendar();
                    gregorianCalendar.setTimeInMillis(disease.getDateEnd());
                    if (gregorianCalendar.get(Calendar.MONTH) == month) {
                        long end = disease.getDateEnd();
                        long begin = disease.getDateBegin();
                        GregorianCalendar calendarBegin = new GregorianCalendar();
                        GregorianCalendar calendarEnd = new GregorianCalendar();
                        calendarBegin.setTimeInMillis(begin);
                        calendarEnd.setTimeInMillis(end);
                        if (calendarBegin.get(Calendar.MONTH) == month) {
                            summa += calendarEnd.get(Calendar.DATE) - calendarBegin.get(Calendar.DATE) + 1;
                        } else {
                            summa += calendarEnd.get(Calendar.DATE) + calendarBegin.getActualMaximum(Calendar.DAY_OF_MONTH) - calendarBegin.get(Calendar.DATE) + 1;

                        }
                    }
                }
                payments.setDayDisease(summa);
                payments.setDayPayment(new Date().getTime());
                summa = 0;
                GregorianCalendar calendar = new GregorianCalendar();
                calendar.set(Calendar.MONTH, month);
                int maxDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                if(payments.getDayDisease() != 0) {
                    double mnoz = (double)(maxDay - payments.getDayDisease()) / (double)maxDay;
                    summa += payments.getSalary() * mnoz;
                }
                else
                    summa += payments.getSalary();
                summa += payments.getSummaAllowance();
                payments.setSummaPayment(summa);
                paymentRepos.save(payments);
            }
        }
    }
}
