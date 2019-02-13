package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Rate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends CrudRepository<Rate, Long> {

}
