package com.app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.PaymentRequestDTO;
import com.app.DTO.PaymentResponseDTO;
import com.app.Entity.Payment;
import com.app.Service.PaymentService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/processPayment")
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody PaymentRequestDTO request) {
        Payment payment = paymentService.makePayment(request);

        String fundName = payment.getContribution().getFund().getTitle();
        String userName = payment.getContribution().getUser().getUserName();

        PaymentResponseDTO responseDTO = new PaymentResponseDTO(
            payment.getId(),
            fundName,
            userName,
            payment.getPaymentDate(),
            payment.getAmount(),
            payment.getPaymentStatus()
        );

        return ResponseEntity.ok(responseDTO);
    }

}
