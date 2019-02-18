package com.ticketing.sql.business.service;

import com.ticketing.sql.business.domain.ObjectMapperUtils;
import com.ticketing.sql.data.dto.ServerResponse;
import com.ticketing.sql.data.dto.UsersDTO;
import com.ticketing.sql.data.entity.Users;
import com.ticketing.sql.data.repository.RolesRepository;
import com.ticketing.sql.data.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public UserService(UsersRepository usersRepository, RolesRepository rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }

    public List<UsersDTO> getUser() {
        List<Users> users = this.usersRepository.findByEnabledTrue();
        List<UsersDTO> usersDTOS = ObjectMapperUtils.mapAll(users, UsersDTO.class);

        //this for used to assign role id for the usersDTO since role in User is an Object not long
        for (int i = 0; users.size() > i; i++) {
            usersDTOS.get(i).setRole(users.get(i).getRoles().getName());
        }
        return usersDTOS;
    }

    public boolean addUser(UsersDTO object) {
        Users newUser = modelMapper.map(object, Users.class);

        newUser.setRoles(rolesRepository.findByName(object.getRole()));
        newUser.setPassword(new BCryptPasswordEncoder().encode(object.getPassword()));
        newUser.setEnabled(true);
        if (newUser.getRoles() == null) return false;
        usersRepository.save(newUser);
        return true;
    }

    public boolean updateUser(UsersDTO object) {
        if (usersRepository.findById(object.getId()).isPresent()) {
            Users oldUserInfo = modelMapper.map(object, Users.class);
            oldUserInfo.setId(object.getId());
            oldUserInfo.setRoles(rolesRepository.findByName(object.getRole()));
            usersRepository.save(oldUserInfo);
            return true;
        }
        return false;
    }

    public UsersDTO findId(long id) {
        Optional <Users> users = this.usersRepository.findById(id);
        if (users.isPresent()){
             UsersDTO usersDTOS = ObjectMapperUtils.map(users.get(), UsersDTO.class);
        usersDTOS.setRole(users.get().getRoles().getName());
            return usersDTOS;
        }
        else
            return new UsersDTO();
    }

    public boolean softDelete(long id) {
        Optional<Users> getUser = usersRepository.findById(id);
        if (getUser.isPresent()) {
            getUser.get().setEnabled(false);
            usersRepository.save(getUser.get());
            return true;
        }
        return false;
    }
    public UsersDTO findByEmail(String email) {
        Users users = usersRepository.findByEmailAndEnabledTrue(email);
        UsersDTO usersDTO = modelMapper.map(users,UsersDTO.class);
        usersDTO.setRole(users.getRoles().getName());
        return usersDTO;
    }
    public ServerResponse findByEmailSignUp(String email) {
        Optional <Users> users = usersRepository.findByEmail(email);
        if (users.isPresent())
            return new ServerResponse("Email already Used",1);

        else
            return new ServerResponse("no account with that email:"+email,2);
    }
}
