package com.ticketing.sql.data.entity;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    //@Size(min = 8, max = 16, message = "password must be between 3 and 10 latters")
    @NotEmpty(message = "enter a password")
    private String password;
    //@UniqueElements
    @Email
    private String email;
    @Size(min = 10, max = 10, message = "phone must be 10 numbers")
    @NumberFormat(pattern = "05########", style = NumberFormat.Style.DEFAULT)
    private String phone;
    @ColumnDefault("1")
    private boolean enabled;
    private LocalDate birth;

    @ManyToOne
    //@JoinColumn(updatable = false, insertable = false)
    private Roles roles;


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

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }
}