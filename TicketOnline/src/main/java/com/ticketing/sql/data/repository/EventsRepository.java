package com.ticketing.sql.data.repository;
import com.ticketing.sql.data.entity.Events;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventsRepository extends CrudRepository<Events, Long> {

    Iterable<Events>findByApprovedTrueAndDeletedFalseAndTimeAfter(LocalDate date);
    List<Events> findByLocationAndApprovedTrueAndDeletedFalseAndTimeAfter(String Location, LocalDate date);
    List<Events> findByLocationAndTimeEqualsAndApprovedTrueAndDeletedFalse(String Location,LocalDate date);
    List<Events> findByTimeAndApprovedTrueAndDeletedFalse(LocalDate eTime);
    List<Events> findByOrganizerId(long org_id);
}
