package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends CrudRepository<Users, Long> {

    List<Users> findByEnabledTrue();
    boolean existsByEmailAndEnabledTrue(String e);
    boolean existsByEmail(String e);
    Users findByEmailAndEnabledTrue(String e);
    Optional<Users> findByEmail(String e);
}
