package com.ticketing.sql.data.dto;

import javax.validation.constraints.Max;

public class CommentsDTO {

    @Max(value = 300,message = "comment cannot exceed 300 latter.")
    private String comment;
    private long event;
    private long user;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public long getEvent() {
        return event;
    }

    public void setEvent(long event) {
        this.event = event;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }
}
