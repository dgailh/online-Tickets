package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.LikeService;
import com.ticketing.sql.data.entity.Likes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/like")
public class LikeController {
    @Autowired
    private LikeService likeService;

    @RequestMapping(value = "/likesanddislikes/{event_id}", method = RequestMethod.GET)
    public ResponseEntity getLikesAndDislikes(@PathVariable long event_id) {
        return ResponseEntity.ok(this.likeService.getLikesAndDislikes(event_id));
    }


    //get a JSON with both likes and dislikes
    @PostMapping(value = "/addLike/{user_id}/{event_id}")
    public ResponseEntity createLike(@RequestBody @Valid Likes like, @PathVariable long user_id,
                                     @PathVariable long event_id) {
            return ResponseEntity.ok(this.likeService.addLike(like,user_id,event_id));
    }

    //not used yet
    @RequestMapping(value = "/likes/{id}")
    public ResponseEntity findById(@PathVariable long id) {
            return ResponseEntity.ok(likeService.findId(id));
    }
}