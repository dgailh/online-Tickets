package com.ticketing.sql.data.dto;

import org.hibernate.annotations.ColumnDefault;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

public class EventsDTO {

    private long id;
    private String name;
    private LocalDate time;
    @Max(value = 300, message = "maximum seats allowed is 300")
    private int seats; // the capacity (how many seats are in the event)
    @ColumnDefault("0")
    @Max(value = 300,message = "max capacity reached for this event")
    private int taken; // how many seats have been taken in the event
    private String location;
    //@NotEmpty
    private long organizer_id;
    @ColumnDefault("0")
    private boolean deleted;

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
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

    public long getOrganizer_id() {
        return organizer_id;
    }

    public void setOrganizer_id(long organizer_id) {
        this.organizer_id = organizer_id;
    }
}
