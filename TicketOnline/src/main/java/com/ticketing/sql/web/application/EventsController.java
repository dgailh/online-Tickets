package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.EventsService;
import com.ticketing.sql.data.dto.EventsDTO;
import com.ticketing.sql.data.entity.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventsController {

    @Autowired
    private EventsService eventsService;
    //what normal user sees => future approved events.
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public ResponseEntity getEvent() {
        List<Events> events = this.eventsService.getEvent();
        if (events.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(events);
    }

    //the admin can see all events!
    @RequestMapping(value = "/events/admin", method = RequestMethod.GET)
    public ResponseEntity getEventAdmin() {
        List<Events> events = this.eventsService.getEventAdmin();
        if (events.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(events);
    }

    // an organized can create an event.
    // todo need more logic to make it only organizes can make it
    @PostMapping(value = "/createEvent")
    public ResponseEntity createEvent(@RequestBody @Valid EventsDTO events) {
        return ResponseEntity.ok(this.eventsService.addEvent(events));
    }

    //getting event by ID could be accessed by normal user and admin? // testing
    @RequestMapping(value = "/events/{id}")
    public ResponseEntity findById(@PathVariable long id) {
        if (eventsService.findId(id) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(eventsService.findId(id));
    }

    // removing event by admin or the organizer who made it.
    //todo make logic so only admin and organizer who made this event can delete it
    //todo also make it so it disable all tickets? check logic for it.
    @RequestMapping(value = "/removeEvent/{id}")
    public ResponseEntity softDelete(@PathVariable long id) {
        return ResponseEntity.ok(eventsService.softDelete(id));
    }

    //admins can approve admins
    //todo make it so only admins can approve events!
    @RequestMapping(value = "/approveEvent/{id}")
    public ResponseEntity approveEvent(@PathVariable @Valid long id) {
        return ResponseEntity.ok(eventsService.approve(id));
    }

    //admins can disapprove events
    //todo make it so only admins can disapprove events!
    @RequestMapping(value = "/disapproveEvent/{id}")
    public ResponseEntity disapproveEvent(@PathVariable long id) {
        return ResponseEntity.ok(eventsService.disapprove(id));
    }

    // for searching by City
    //todo need more logic and extra searching options.
    @RequestMapping(value = "/events/city/{city}")
    public ResponseEntity getByCity(@PathVariable String city) {
        if (eventsService.findByCity(city) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(eventsService.findByCity(city));
    }

    // for searching by events by Date
    //todo need more logic and extra searching options.
    @RequestMapping(value = "/events/date/{date}")
    public ResponseEntity getByDate(@PathVariable String date) {
        if (eventsService.findByDate(LocalDate.parse(date)) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(eventsService.findByDate(LocalDate.parse(date)));
    }

    // for searching by City and Date
    //todo need more logic and extra searching options.
    @RequestMapping(value = "/events/city/{theCity}/{theDate}")
    public ResponseEntity getByDate(@PathVariable String theCity, @PathVariable String theDate) {
        if (eventsService.findByCityTime(LocalDate.parse(theDate), theCity) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(eventsService.findByCityTime(LocalDate.parse(theDate), theCity));
    }
}