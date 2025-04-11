Exercise	    30	30	0	0	0	0	0
Learning	    0	0	0	0	0	0	0
Project	        0	90	0	0	0	0	0
Neet Code	    0	0	0	0	0	0	0
Social Time	    240	0	0	0	0	0	0
Journal Time	0	0	0	0	0	0	0

INSERT INTO user_table ()

-- //0 Week
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,1,'Exercise', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Learning', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Project', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Neet Code', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Social Time', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Journal Time', '["0", "0", "0", "0", "0", "0", "0"]');

-- //Insert Austin, Week 1
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,1,'Exercise', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Learning', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Project', '["0", "90", "0", "0", "0", "0", "0"]'),
(1,1,'Neet Code', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Social Time', '["240", "0", "0", "0", "0", "0", "0"]'),
(1,1,'Journal Time', '["0", "0", "0", "0", "0", "0", "0"]');

-- //Insert Austin, Week 2
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,2,'Exercise', '["0", "30", "0", "30", "0", "30", "0"]'),
(1,2,'Learning', '["0", "20", "20", "100", "60", "0", "0"]'),
(1,2,'Project', '["240", "20", "20", "0", "40", "0", "0"]'),
(1,2,'Neet Code', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,2,'Social Time', '["180", "90", "120", "0", "0", "0", "400"]'),
(1,2,'Journal Time', '["0", "0", "0", "15", "15", "15", "0"]');

--Insert Austin, Week 3
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,3,'Exercise', '["0", "30", "0", "0", "0", "0", "0"]'),
(1,3,'Learning', '["0", "40", "0", "0", "0", "0", "0"]'),
(1,3,'Project', '["0", "140", "0", "0", "0", "0", "0"]'),
(1,3,'Neet Code', '["0", "0", "0", "0", "0", "0", "0"]'),
(1,3,'Social Time', '["400", "15", "0", "0", "0", "0", "0"]'),
(1,3,'Journal Time', '["0", "0", "0", "0", "0", "0", "0"]');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE date_lookup(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE habit_table(
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    date_lookup_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (date_lookup_id) REFERENCES date_lookup(id)
);