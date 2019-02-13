package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends CrudRepository<Users, Long> {

    List<Users> findByEnabledTrue();
    Users findByEmailAndEnabledTrue(String e);
}
