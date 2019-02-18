package com.ticketing.sql.business.service;

import com.ticketing.sql.business.domain.ObjectMapperUtils;
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
    private ServerResponse serverResponse;


    public EventsService(EventsRepository eventsRepository, UsersRepository usersRepository) {
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
        serverResponse = new ServerResponse();
    }

    public List<Events> getEvent() {
        return (List<Events>) this.eventsRepository.findByApprovedTrueAndDeletedFalseAndTimeAfter(LocalDate.now());
    }

    public List<Events> getEventAdmin() {
        return (List<Events>) eventsRepository.findAll();
    }

    public ServerResponse addEvent(EventsDTO object) {
        Events newEvent = modelMapper.map(object,Events.class);
        newEvent.setOrganizer(usersRepository.findById(object.getOrganizer_id()).get());
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

    public ServerResponse softDelete(long id) {
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

    public ServerResponse approve(long id) {
        if (eventsRepository.findById(id).isPresent()){
            Events event = this.eventsRepository.findById(id).get();
            event.setApproved(true);
            this.eventsRepository.save(event);
            serverResponse.setText("The "+ event.getName()+" have been Approved");
            serverResponse.setResponseIndicator(2);
            return serverResponse;
        }
        serverResponse.setText("something went wrong with Approving the event");
        serverResponse.setResponseIndicator(0);
        return serverResponse;
    }

    public ServerResponse disapprove(long id) {

        if (eventsRepository.findById(id).isPresent()) {
            Events event = this.eventsRepository.findById(id).get();
            event.setApproved(false);
            this.eventsRepository.save(event);
            serverResponse.setText("The "+ event.getName()+" have been Disapproved");
            serverResponse.setResponseIndicator(2);
            return serverResponse;
        }
        serverResponse.setText("something went wrong with disapproving the event");
        serverResponse.setResponseIndicator(0);
        return serverResponse;
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


    public List<EventsDTO> findByOrganizer( long org_id) {
        //made a long for to assign organizer id instead of relationship to avoid exposing data
        List<Events> events =eventsRepository.findByOrganizerId(org_id);
        List<EventsDTO> eventsDTO = ObjectMapperUtils.mapAll(events,EventsDTO.class);
        for (int i=0;i<events.size();i++){
            eventsDTO.get(i).setOrganizer_id(events.get(i).getOrganizer().getId());
        }
        return eventsDTO;
    }
}
