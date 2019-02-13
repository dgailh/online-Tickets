INSERT INTO Roles (Name )
VALUES ('admin'),
       ('organizer'),
       ('user');

INSERT INTO Users (first_name ,middle_name,last_name,password,email,phone,birth,roles_name )
VALUES ('abdullah','ibrahim','alomari','$2a$10$ydNCLnJrEB5cHeLAIrPYxOlHmJrlUCIGNEN.x16MpoiwlAmasZBlW','abdullah.b.omary@gmail.com',0501568886,'2017-10-29','organizer'),
       ('sultan','ibrahim','ALmajed','$2a$10$xxJ5ozuKnzKwztOtQ.r/beiiz2tjDBHNBwGWNPGOn56jrOC7Nuipu','samsoma33@gmail.com',0501564446,'2017-10-29','user');

INSERT INTO Events (Name,time,seats,location,Organizer_ID)
VALUES  ('tomor_Buraydah','2017-10-29 14:56:59',300,'buraydah',2),
        ('tomor_Buraydah','2018-10-29 14:56:59',300,'buraydah',2),
        ('tomor_Buraydah','2019-10-29 14:56:59',300,'buraydah',2),
        ('tomor_Onizah','2018-10-14 14:56:59',300,'onizah',2);

INSERT INTO tickets(event_id,user_id)
VALUES (1,1),
       (2,1),
       (3,1),
       (4,1);