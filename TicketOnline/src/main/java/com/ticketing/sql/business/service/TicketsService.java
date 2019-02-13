package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.entity.Events;
import com.ticketing.sql.data.entity.Tickets;
import com.ticketing.sql.data.entity.Users;
import com.ticketing.sql.data.repository.EventsRepository;
import com.ticketing.sql.data.repository.TicketsRepository;
import com.ticketing.sql.data.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TicketsService {

    @Autowired
    private final TicketsRepository ticketsRepository;
    private final EventsRepository eventsRepository;
    private final UsersRepository usersRepository;


    public TicketsService(TicketsRepository ticketsRepository, EventsRepository eventsRepository, UsersRepository usersRepository) {
        this.ticketsRepository = ticketsRepository;
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }

    public List<Tickets> getTicket() {
        return (List<Tickets>) this.ticketsRepository.findAll();
    }

    public ServerResponse addTicket(long userId, long eventId) {
        ServerResponse serverResponse = new ServerResponse();
        //getting user and event objects
        Events targetedEvent = eventsRepository.findById(eventId).get();
        Users targetedUser = usersRepository.findById(userId).get();

        // it has to be future event in this logic and approved
        if (targetedEvent.getTime().isAfter(LocalDate.now())
                && targetedEvent.isApproved() && !targetedEvent.isDeleted()
                && targetedUser.isEnabled()
        ) {
            List<Tickets> userTickets = ticketsRepository.findByUserAndDeletedFalse(usersRepository.findById(userId).get());
            if (!userTickets.isEmpty()) {
                for (Tickets oneTicket : userTickets) {
                    if (oneTicket.getEvent().getTime().isEqual(targetedEvent.getTime())) {
                        serverResponse.setText("already have ticket for this event");
                                  //0 for wrong -- 1 for taken -- 2 for success
                        serverResponse.setResponseIndicator(1);
                        return serverResponse; // something wrong
                    }
                }
            }
            Tickets newTicket = new Tickets();
            newTicket.setEvent(eventsRepository.findById(eventId).get());
            newTicket.setUsers(usersRepository.findById(userId).get());
            newTicket.getEvent().setTaken(newTicket.getEvent().getTaken() + 1);
            ticketsRepository.save(newTicket);
            serverResponse.setText("ticket for "+ newTicket.getEvent().getName() + " have been created");
            serverResponse.setResponseIndicator(2);
            return serverResponse;
        }
        serverResponse.setText("something wrong with adding new ticket");
        serverResponse.setResponseIndicator(0);
        return serverResponse;
    }

    public Optional<Tickets> findId(long id) {

        return this.ticketsRepository.findById(id);
    }

    public ServerResponse softDelete(long ticketId) {
        ServerResponse serverResponse = new ServerResponse();
        Optional<Tickets> ticket = this.ticketsRepository.findById(ticketId);
        if (ticket.isPresent()){
        ticket.get().setDeleted(true);
        ticket.get().getEvent().setTaken(ticket.get().getEvent().getTaken() - 1);
        ticketsRepository.save(ticket.get());
        serverResponse.setText("Ticket Canceled");
        serverResponse.setResponseIndicator(2);
        return serverResponse;}
        serverResponse.setText("something went wrong");
        serverResponse.setResponseIndicator(0);
        return serverResponse;

    }

    public List<Tickets> userTickets(long userId) {
        return ticketsRepository.findByUserAndDeletedFalse(usersRepository.findById(userId).get());
    }
}