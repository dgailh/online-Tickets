package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.EventsDTO;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.entity.Events;
import com.ticketing.sql.data.repository.EventsRepository;
import com.ticketing.sql.data.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventsService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private final EventsRepository eventsRepository;
    private final UsersRepository usersRepository;


    public EventsService(EventsRepository eventsRepository, UsersRepository usersRepository) {
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }

    public List<Events> getEvent() {
        return (List<Events>) this.eventsRepository.findByApprovedTrueAndDeletedFalseAndTimeAfter(LocalDate.now());
    }

    public List<Events> getEventAdmin() {
        return (List<Events>) eventsRepository.findAll();
    }

    public ServerResponse addEvent(EventsDTO object) {
        ServerResponse serverResponse = new ServerResponse();
        Events newEvent = modelMapper.map(object,Events.class);
        newEvent.setOrganizer(usersRepository.findById(object.getOrganizer()).get());
        if (newEvent.getOrganizer() == null){
            serverResponse.setText("wrong or missing organizer id");
            serverResponse.setResponseIndicator(0);
            return serverResponse;}
        else{
            eventsRepository.save(newEvent);
            serverResponse.setText("event created need admin approval now!");
            serverResponse.setResponseIndicator(2);
            return serverResponse;}
    }

    public Events findId(long id) {
        if(eventsRepository.findById(id).isPresent())
            return eventsRepository.findById(id).get();
        return null;
    }

    public boolean approve(long id) {
        if (eventsRepository.findById(id).isPresent()){
            Events event = this.eventsRepository.findById(id).get();
            event.setApproved(true);
            this.eventsRepository.save(event);
            return true;
        }
        return false;
    }

    public ServerResponse softDelete(long id) {
        ServerResponse serverResponse = new ServerResponse();
        if (eventsRepository.findById(id).isPresent()) {

            Events event = this.eventsRepository.findById(id).get();
            event.setDeleted(true);
            this.eventsRepository.save(event);
            serverResponse.setText("event Deleted");
            serverResponse.setResponseIndicator(2);
            return serverResponse;
        }
        serverResponse.setText("something went wrong with deleting the event");
        serverResponse.setResponseIndicator(0);
        return serverResponse;
    }

    public boolean disapprove(long id) {

        if (eventsRepository.findById(id).isPresent()) {

            Events event = this.eventsRepository.findById(id).get();
            event.setApproved(false);
            this.eventsRepository.save(event);
            return true;
        }
        return false;
    }

    public List<Events> findByCity(String city) {
        return eventsRepository.findByLocationAndApprovedTrueAndDeletedFalseAndTimeAfter(city, LocalDate.now());
    }

    public List<Events> findByDate(LocalDate date) {
        return eventsRepository.findByTimeAndApprovedTrueAndDeletedFalse(date);
    }

    public List<Events> findByCityTime(LocalDate date, String city) {
        return eventsRepository.findByLocationAndTimeEqualsAndApprovedTrueAndDeletedFalse(city, date);
    }
}