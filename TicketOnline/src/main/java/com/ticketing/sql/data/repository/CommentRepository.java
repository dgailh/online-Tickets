package com.ticketing.sql.data.repository;

import com.ticketing.sql.data.entity.Comments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comments,Long> {
    List<Comments> findByEvent_Id(long event_id);
}
