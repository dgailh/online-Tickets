package com.ticketing.sql.data.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "Likes")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ColumnDefault("0")
    private boolean likes;
    @ColumnDefault("0")
    private boolean dislikes;
    @ManyToOne
    private Tickets ticket;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isLikes() {
        return likes;
    }

    public void setLikes(boolean likes) {
        this.likes = likes;
    }

    public boolean isDislikes() {
        return dislikes;
    }

    public void setDislikes(boolean dislikes) {
        this.dislikes = dislikes;
    }

    public Tickets getTicket() {
        return ticket;
    }

    public void setTicket(Tickets ticket) {
        this.ticket = ticket;
    }
}
