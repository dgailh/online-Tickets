package com.ticketing.sql.data.dto;

import javax.validation.constraints.Max;

public class RateDTO {

    @Max(value = 300, message = "comment should not exceed 300 latter")
    private String comment;
    @Max(value = 5, message = "stars must be between 1 and 5")
    private int stars;
    private long ticket;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public long getTicket() {
        return ticket;
    }

    public void setTicket(long ticket) {
        this.ticket = ticket;
    }
}
