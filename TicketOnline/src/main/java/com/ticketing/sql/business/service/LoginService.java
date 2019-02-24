package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.LoginBody;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.dto.UsersDTO;
import com.ticketing.sql.data.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class LoginService {

    @Autowired
    private UserService userServices;

    public Map loginWithUser(LoginBody loginBody) {
        if (!userServices.existsByEmailAndEnabledTrue(loginBody.getEmail())) {
            if (userServices.existsByEmail(loginBody.getEmail())) {
                throw new RuntimeException("User is disabled");
            }
            throw new RuntimeException("User not found");
        }
        UsersDTO usersDTO = userServices.findByEmail(loginBody.getEmail());

        if (new BCryptPasswordEncoder().matches(loginBody.getPassword(), usersDTO.getPassword())) {
            Map<String, Object> map = new HashMap<>();
            map.put("userRole", usersDTO.getRole());
            map.put("userId", usersDTO.getId());
            map.put("first_name",usersDTO.getFirst_name());
            return map;
        }
        throw new RuntimeException("Password Incorrect!");
    }

}
