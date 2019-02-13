package com.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
public class TicketOnlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketOnlineApplication.class, args);

		String coded = new BCryptPasswordEncoder().encode("hunter15");
		System.out.println(coded);
	}
}
