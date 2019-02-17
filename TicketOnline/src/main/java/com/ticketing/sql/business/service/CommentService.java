package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.CommentsDTO;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.entity.Comments;
import com.ticketing.sql.data.entity.Events;
import com.ticketing.sql.data.entity.Users;
import com.ticketing.sql.data.repository.CommentRepository;
import com.ticketing.sql.data.repository.EventsRepository;
import com.ticketing.sql.data.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private final CommentRepository commentRepository;
    private final EventsRepository eventsRepository;
    private final UsersRepository usersRepository;

    public CommentService(CommentRepository commentRepository, UsersRepository usersRepository, EventsRepository eventsRepository) {
        this.commentRepository = commentRepository;
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }

    public List<Comments> getComments(long event_id) {
        return this.commentRepository.findByEvent_Id(event_id);
    }

    public ServerResponse addComment(CommentsDTO object) {
        ServerResponse serverResponse = new ServerResponse();

        Comments comment = modelMapper.map(object, Comments.class);
        if (usersRepository.findById(object.getUser()).isPresent()
                && eventsRepository.findById(object.getEvent()).isPresent()) {
            comment.setUser(usersRepository.findById(object.getUser()).get());
            comment.setEvent(eventsRepository.findById(object.getEvent()).get());
            this.commentRepository.save(comment);
            serverResponse.setText("comment Added!");
            serverResponse.setResponseIndicator(2);
            return serverResponse;
        }
        serverResponse.setText("something went wrong.");
        serverResponse.setResponseIndicator(0);
        return serverResponse;
    }
}