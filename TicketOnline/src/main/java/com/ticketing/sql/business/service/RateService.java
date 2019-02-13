package com.ticketing.sql.business.service;

import com.ticketing.sql.data.dto.RateDTO;
import com.ticketing.sql.data.entity.Rate;
import com.ticketing.sql.data.entity.Tickets;
import com.ticketing.sql.data.repository.RateRepository;
import com.ticketing.sql.data.repository.TicketsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RateService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private final RateRepository rateRepository;
    private final TicketsRepository ticketsRepository;

    public RateService(RateRepository rateRepository, TicketsRepository ticketsRepository) {
        this.rateRepository = rateRepository;
        this.ticketsRepository = ticketsRepository;
    }

    public List<Rate> getRate() {
        return (List<Rate>) this.rateRepository.findAll();
    }


    public boolean addRate(RateDTO rate) {
        Rate newRate = modelMapper.map(rate, Rate.class);
        Tickets targetedTicket = ticketsRepository.findById(rate.getTicket()).get();

        //add in entity tickets new column > Attended to check if user attended the event or not.
        if (targetedTicket.getEvent().getTime().isBefore(LocalDate.now())
                && targetedTicket.isAttended()) {//add logic for event\\
            newRate.setTicket(targetedTicket);
            rateRepository.save(newRate);
            return true;
        }
        return false;
    }

    public Optional<Rate> findId(long id) {
        return this.rateRepository.findById(id);
    }
}
