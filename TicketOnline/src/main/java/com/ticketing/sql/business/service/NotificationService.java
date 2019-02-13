package com.ticketing.sql.business.service;

import com.ticketing.sql.data.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private JavaMailSender javaMailSender;

    @Autowired
    public NotificationService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendNotifications (Users users) throws MailException {
        SimpleMailMessage mailMessage  = new SimpleMailMessage();
        mailMessage.setTo(users.getEmail());
        mailMessage.setFrom("abdullah.b.omary@gmail.com");
        mailMessage.setSubject("hello world");
        mailMessage.setText("i sent a text using a web application");

        javaMailSender.send(mailMessage);

    }
}
