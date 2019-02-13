package com.ticketing.sql.business.service;

import com.ticketing.sql.data.entity.Roles;
import com.ticketing.sql.data.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private final RolesRepository rolesRepository;


    public RoleService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }



    public List<Roles> getRole(){
        return (List<Roles>) this.rolesRepository.findAll();
    }


    public String addRole(Roles object){
        if (rolesRepository.save(object)==null){
            return "something went wrong adding a new role";
        }
        return "new role added";
    }

    public Optional<Roles> findId(long id){

        return this.rolesRepository.findById(id);
    }
}
