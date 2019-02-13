package com.ticketing.sql.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "Roles")
public class Roles {
//ROLE_ADMIN,
// ROLE_
    @Id
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}