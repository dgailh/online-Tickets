CREATE TABLE roles(
id BIGINT PRIMARY KEY,
name VARCHAR(15));

CREATE TABLE users(
    id BIGINT PRIMARY KEY auto_increment,
    first_name VARCHAR(20),
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(40),
    phone VARCHAR(10),
    roles_id BIGINT,
    deleted BIT DEFAULT 0,
    FOREIGN KEY(roles_id) REFERENCES roles(id));

CREATE TABLE Events(
	id BIGINT PRIMARY KEY,
	Name varchar(50) NOT NULL,
	time TIMESTAMP NOT NULL,
	seats INT NOT NULL,
	taken INT NOT NULL DEFAULT 0,
	location varchar(50) NOT NULL,
	deleted BIT DEFAULT 0,
	approved BIT DEFAULT 0,
	organizer_id BIGINT,
	FOREIGN KEY(organizer_id) REFERENCES users(id));

CREATE TABLE tickets(
	ID BIGINT PRIMARY KEY,
	deleted BIT DEFAULT 0,
	attended BIT DEFAULT 0,
	event_id BIGINT,
	 FOREIGN KEY (event_id) REFERENCES Events(ID),
	user_id BIGINT,
	 FOREIGN KEY (user_id) REFERENCES Users(ID));

CREATE TABLE rate(
	ID BIGINT PRIMARY KEY,
	comment VARCHAR(170),
	stars int,
	ticket_Id BIGINT,
	 FOREIGN KEY (ticket_Id) REFERENCES tickets(ID));


CREATE TABLE comments(
	ID BIGINT PRIMARY KEY,
	comment VARCHAR(170),
	stars int,
	event_Id BIGINT,
	 FOREIGN KEY (event_Id) REFERENCES events(ID),
	 user_Id BIGINT,
	 FOREIGN KEY (user_Id) REFERENCES users(ID));