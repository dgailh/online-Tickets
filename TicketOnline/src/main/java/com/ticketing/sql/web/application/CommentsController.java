package com.ticketing.sql.web.application;

import com.ticketing.sql.business.service.CommentService;
import com.ticketing.sql.data.dto.CommentsDTO;
import com.ticketing.sql.data.entity.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")

public class CommentsController {
    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/comments/{event_id}", method = RequestMethod.GET)
    public ResponseEntity getComments(@PathVariable long event_id){
        List<Comments> comments = this.commentService.getComments(event_id);
        if (!comments.isEmpty())
            return ResponseEntity.ok(comments);
        return ResponseEntity.noContent().build();
    }

    // FIXME: 04-Dec-18  add CommentDTO for comments to reduce the number or calls instead of this path we use /createComment only
    @PostMapping(value = "/createComment")
    public ResponseEntity createComment(@RequestBody CommentsDTO object){
        return ResponseEntity.ok(this.commentService.addComment(object));
    }

}
