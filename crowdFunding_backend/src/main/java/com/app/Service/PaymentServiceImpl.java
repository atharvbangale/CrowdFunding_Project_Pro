package com.app.Service;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.PaymentRequestDTO;
import com.app.Entity.Contribution;
import com.app.Entity.Payment;
import com.app.Repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private com.app.Repository.contributionRepository contributionRepository;

    @Override
    public Payment makePayment(PaymentRequestDTO requestDTO) {
        Contribution contribution = contributionRepository.findById(requestDTO.getContributionId())
                .orElseThrow(() -> new RuntimeException("Contribution not found with ID: " + requestDTO.getContributionId()));

        Payment payment = new Payment();
        payment.setContribution(contribution);
        payment.setAmount(requestDTO.getAmount());
        payment.setPaymentStatus(requestDTO.getPaymentStatus());
        payment.setPaymentDate(LocalDate.now());

        // Save payment first
        Payment savedPayment = paymentRepository.save(payment);

        // Set payment in contribution and update it
        contribution.setPayment(savedPayment);
        contributionRepository.save(contribution); // This will update the foreign key (payment_id)

        return savedPayment;
    }

}
