package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.NotificationService;
import com.ticketing.sql.business.service.UserService;
import com.ticketing.sql.data.dto.UsersDTO;
import com.ticketing.sql.data.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/login")
public Map login(Principal principal){
    UsersDTO usersDTO = userService.findByEmail(principal.getName());
        Map<String,Object> map = new HashMap<>();
        map.put("userId",usersDTO.getId());
        map.put("userRole",usersDTO.getRole());
        map.put("first_name",usersDTO.getFirst_name());
        return map;
    }
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity getUser() {
        List<UsersDTO> users = this.userService.getUser();
        if (users.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(users);

    }

    //working but disabled and need functionalities for text and data in it
    @RequestMapping(value = "/sendNot", method = RequestMethod.GET)
    public ResponseEntity sendEmail() {
        String text;

        Users users = userService.findId(2).get();
        text = "email sent";
        notificationService.sendNotifications(users);

        return ResponseEntity.ok(text);
    }

    @PostMapping(value = "/create")
    public ResponseEntity createUser(@RequestBody @Valid UsersDTO user) {
        if (this.userService.addUser(user)) {
            return ResponseEntity.created(null).build();
        }
        return ResponseEntity.badRequest().body("Something wrong with adding a new user");
    }

    @PutMapping(value = "/updateUser")
    public ResponseEntity updateUser(@RequestBody @Valid UsersDTO user) {
        if (this.userService.updateUser(user)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.badRequest().body("Something wrong with updating the user");
    }


    @RequestMapping(value = "/users/{id}")
    public ResponseEntity findById(@PathVariable long id) {
        Optional<Users> users = userService.findId(id);
        if (users.isPresent() && !users.get().isEnabled()) {
            return ResponseEntity.ok(users);
        } else return ResponseEntity.badRequest().body("user deleted or not found");
    }

    @RequestMapping(value = "/removeUser/{id}")
    public ResponseEntity softDelete(@PathVariable long id) {
        if (userService.softDelete(id))
        return ResponseEntity.accepted().build();
        else return ResponseEntity.badRequest().body("user Not Found");
    }

    @RequestMapping(value = "/email/{email}")
    public ResponseEntity checkEmail(@PathVariable String email){
        return ResponseEntity.ok(this.userService.findByEmailSignUp(email));
    }
}
