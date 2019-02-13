package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Tickets;
import com.ticketing.sql.data.entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketsRepository extends CrudRepository<Tickets, Long> {

    List<Tickets> findByUserAndDeletedFalse(Users user);
}
