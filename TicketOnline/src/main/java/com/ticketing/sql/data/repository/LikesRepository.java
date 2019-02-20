package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Likes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends CrudRepository<Likes, Long> {

    @Query(value = "select COUNT(likes.likes) as likes from likes,tickets, events\n" +
            "\twhere likes.likes = 1 AND likes.ticket_id = tickets.id AND\n" +
            "\t tickets.event_id= events.id AND events.id=?1", nativeQuery = true)
    int getSumOfLikes(long event_id);

    @Query(value = "select COUNT(likes.dislikes) as dislikes from likes,tickets, events\n" +
            "\twhere likes.dislikes = 1 AND likes.ticket_id = tickets.id AND\n" +
            "\t tickets.event_id= events.id AND events.id=?1", nativeQuery = true)
    int getSumOfDislikes(long event_id);

    Likes findByTicketId(long ticket_id);

}
