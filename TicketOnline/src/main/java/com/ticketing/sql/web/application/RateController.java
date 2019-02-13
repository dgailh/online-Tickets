package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.RateService;
import com.ticketing.sql.data.dto.RateDTO;
import com.ticketing.sql.data.entity.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class RateController {
    @Autowired
    private RateService rateService;

    // FIXME: 04-Dec-18  last one do the rate asap then start with security or login for frontEnd with love piex <3
    @RequestMapping(value = "/rates", method = RequestMethod.GET)
    public ResponseEntity getRate() {
        List<Rate> rates = this.rateService.getRate();
        return ResponseEntity.ok(rates);
    }

    @PostMapping(value = "/createRate/{ticketID}")
    public ResponseEntity createRate(@RequestBody @Valid RateDTO rate) {
        if (this.rateService.addRate(rate))
            return ResponseEntity.ok("rate added");
        return ResponseEntity.badRequest().body("something went wrong with adding a new rate");
    }

    @RequestMapping(value = "/rates/{id}")
    public ResponseEntity findById(@PathVariable long id) {
        if (rateService.findId(id).isPresent())
            return ResponseEntity.ok(rateService.findId(id).get());
        return ResponseEntity.notFound().build();
    }
}