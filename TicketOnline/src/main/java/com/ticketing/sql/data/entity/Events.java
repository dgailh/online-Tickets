package com.ticketing.sql.data.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "Events")
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private LocalDate time;
    @Max(value = 300, message = "maximum seats allowed is 300")
    private int seats;
    @ColumnDefault("0")
    //@Max(value = 5, message = "max capacity reached for this event")
    private int taken;
    private String location;
    @ColumnDefault("0")
    private boolean deleted;
    @ColumnDefault("0")
    private boolean approved;

    @ManyToOne
    private Users organizer;

    public Users getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Users organizer) {
        this.organizer = organizer;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getTaken() {
        return taken;
    }

    public void setTaken(int taken) {
        this.taken = taken;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}