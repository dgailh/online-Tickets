package com.ticketing.sql.data.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class UsersDTO {

    private long id;
    @Size(min = 3, max = 10, message = "first name must be between 3 and 10 latters")
    @NotEmpty(message = "enter first name")
    private String first_name;
    @Size(min = 3, max = 10, message = "middle name must be between 3 and 10 latters")
    @NotEmpty(message = "enter first name")
    private String middle_name;
    @Size(min = 3, max = 10, message = "last name must be between 3 and 10 latters")
    @NotEmpty(message = "enter first name")
    private String last_name;
    @Size(min = 6, max = 16, message = "password must be between 6 and 16 latters")
    @NotEmpty(message = "enter a password")
    private String password;
    @Email
    private String email;
    @Size(min = 10, max = 10, message = "phone must be between 3 and 10 numbers")
    private String phone;
    //@NotEmpty(message = "need role ID")
    private String role;
    private LocalDate birth;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }
}