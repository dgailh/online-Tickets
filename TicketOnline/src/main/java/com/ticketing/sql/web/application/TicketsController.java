package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.TicketsService;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.entity.Tickets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketsController {

    @Autowired
    private TicketsService ticketsService;
//    private ServerResponse serverResponse;

    @RequestMapping(value = "/tickets", method = RequestMethod.GET)
    public ResponseEntity getTicket() {
        List<Tickets> tickets = this.ticketsService.getTicket();
        if (!tickets.isEmpty())
            return ResponseEntity.ok(tickets);
        return ResponseEntity.noContent().build();
    }

    // FIXME: 04-Dec-18 done

    @RequestMapping(value = "/createTicket/{userID}/{eventID}")
    public ResponseEntity setTickets( @PathVariable long userID, @PathVariable long eventID) {
        ServerResponse serverResponse = this.ticketsService.addTicket(userID, eventID);
            return ResponseEntity.ok(serverResponse);
    }

    @RequestMapping(value = "/tickets/{ticketId}")
    public ResponseEntity findTicketById(@PathVariable long ticketId) {
        if (ticketsService.findId(ticketId).isPresent())
            return ResponseEntity.ok(ticketsService.findId(ticketId).get());
        return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/userTickets/{userId}")
    public ResponseEntity userTickets(@PathVariable long userId) {
        List<Tickets> tickets = ticketsService.userTickets(userId);
        if (!tickets.isEmpty())
            return ResponseEntity.ok(tickets);
        return ResponseEntity.noContent().build();
    }

    //id here for ticket id
    @RequestMapping(value = "/removeTicket/{id}")
    public ResponseEntity softDelete(@PathVariable long id) {
        return ResponseEntity.ok(this.ticketsService.softDelete(id));
    }
}
