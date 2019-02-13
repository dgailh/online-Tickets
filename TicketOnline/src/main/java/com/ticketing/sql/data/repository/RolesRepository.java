package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Roles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends CrudRepository<Roles, Long> {

    @Override
    Iterable<Roles> findAll();
    Roles findByName(String name);
}