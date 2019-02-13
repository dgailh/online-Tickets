package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.RoleService;
import com.ticketing.sql.data.entity.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class  RolesController {

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public List<Roles> getrole(){
        List<Roles> roles = this.roleService.getRole();
        return roles;
    }

    @PostMapping(value = "/createRole")
    public ResponseEntity setRolesService(@RequestBody Roles roles){
        return ResponseEntity.ok(this.roleService.addRole(roles));
    }


    @RequestMapping(value = "/roles/{id}")
    public ResponseEntity findById(@PathVariable long id){
        if (roleService.findId(id).isPresent())
        return ResponseEntity.ok(roleService.findId(id));
        return ResponseEntity.noContent().build();
    }

}
