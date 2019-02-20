package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.LikeAndDislikeDTO;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.entity.Likes;
import com.ticketing.sql.data.entity.Tickets;
import com.ticketing.sql.data.repository.LikesRepository;
import com.ticketing.sql.data.repository.TicketsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


// Like Service serve both likes And dislikes since they are identical
@Service
public class LikeService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private final LikesRepository likesRepository;
    private final TicketsRepository ticketsRepository;

    public LikeService(LikesRepository likesRepository,  TicketsRepository ticketsRepository) {
        this.likesRepository = likesRepository;
        this.ticketsRepository = ticketsRepository;
    }

    public LikeAndDislikeDTO getLikesAndDislikes(long event_id) {
        LikeAndDislikeDTO likeAndDislikeDTO = new LikeAndDislikeDTO();
        likeAndDislikeDTO.setLikes(this.likesRepository.getSumOfLikes(event_id));
        likeAndDislikeDTO.setDislikes(this.likesRepository.getSumOfDislikes(event_id));
        return  likeAndDislikeDTO;
    }


    //todo fix it shouldn't return dto likes its different structure
    public ServerResponse addLike(Likes like, long user_id, long event_id) {
        Tickets ticket = ticketsRepository.findByUserIdAndDeletedFalseAndEventId(user_id, event_id);
        if (ticket != null) {
            // if both the user attended the event and his ticket is not deleted for any reason.
            if (ticket.isAttended() && !ticket.isDeleted()) {
                //if the user already dis/liked the don't allow to like/dislike
                if (likesRepository.findByTicketId(ticket.getId())==null) {
                    like.setTicket(ticket);
                    likesRepository.save(like);
                    return new ServerResponse("Thank you for using our service.", 2);
                } else return new ServerResponse("We already have your vote.", 1);
            } else return new ServerResponse("You didn't attend this event or your ticket is deleted.", 1);
        }
        return new ServerResponse("You don't have ticket for this event.", 1);
    }

    public Optional<Likes> findId(long id) {
        return this.likesRepository.findById(id);
    }
}
