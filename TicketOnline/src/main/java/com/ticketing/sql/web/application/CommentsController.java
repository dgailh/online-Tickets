package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.CommentService;
import com.ticketing.sql.data.dto.CommentsDTO;
import com.ticketing.sql.data.entity.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentsController {
    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/comments", method = RequestMethod.GET)
    public ResponseEntity getComments(){
        List<Comments> comments = this.commentService.getComments();
        if (!comments.isEmpty())
            return ResponseEntity.ok(comments);
        return ResponseEntity.noContent().build();
    }

    // FIXME: 04-Dec-18  add CoomentDTO for comments to reduce the number or calls instead of this path we use /createComment only
    @PostMapping(value = "/createComment")
    public ResponseEntity createComment(@RequestBody CommentsDTO object){
        if (this.commentService.addComment(object))
            return ResponseEntity.ok("comment created");
        return ResponseEntity.badRequest().body("something went wrong with adding a comment");
    }

}
