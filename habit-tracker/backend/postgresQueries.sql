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

CREATE TABLE habits(
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    date_lookup_id INTEGER,
    duration_list JSON,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (date_lookup_id) REFERENCES date_lookup(id)
);


--DATE LOOKUP
INSERT INTO date_lookup (start_date, end_date)
VALUES
('2025-03-23','2025-03-29'),
('2025-03-30','2025-04-05'),
('2025-04-06','2025-04-12'),
('2025-04-13','2025-04-19'),
('2025-04-20','2025-04-26');


INSERT INTO users (name, email)
VALUES
('Austin', '18athoreso@gmail.com'),
('Claude', 'claudeIsCool@gmail.com'),
('Joey', 'joeyIsNeat@hotmail.com');

-- //1 Week
INSERT INTO habits (user_id, date_lookup_id, name, duration_list)
VALUES
(1,1,'Exercise',        '{"Sun":30,"Mon":30,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,1,'Learning',        '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,1,'Project',         '{"Sun":0,"Mon":90,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,1,'Neet Code',       '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,1,'Social Time',     '{"Sun":240,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,1,'Journal Time',    '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}');

-- //Insert Austin, Week 2
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,2,'Exercise',        '{"Sun":0,"Mon":30,"Tue":0,"Wed":30,"Thu":0,"Fri":30,"Sat":0}'),
(1,2,'Learning',        '{"Sun":0,"Mon":20,"Tue":20,"Wed":100,"Thu":60,"Fri":0,"Sat":0}'),
(1,2,'Project',         '{"Sun":240,"Mon":20,"Tue":20,"Wed":0,"Thu":40,"Fri":0,"Sat":0}'),
(1,2,'Neet Code',       '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,2,'Social Time',     '{"Sun":180,"Mon":90,"Tue":120,"Wed":0,"Thu":0,"Fri":0,"Sat":400}'),
(1,2,'Journal Time',    '{"Sun":0,"Mon":0,"Tue":0,"Wed":15,"Thu":15,"Fri":15,"Sat":0}');

-- //Insert Austin, Week 3
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,3,'Exercise',        '{"Sun":0,"Mon":30,"Tue":0,"Wed":30,"Thu":0,"Fri":0,"Sat":0}'),
(1,3,'Learning',        '{"Sun":0,"Mon":40,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,3,'Project',         '{"Sun":0,"Mon":140,"Tue":0,"Wed":100,"Thu":100,"Fri":0,"Sat":40}'),
(1,3,'Neet Code',       '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,3,'Social Time',     '{"Sun":400,"Mon":15,"Tue":0,"Wed":15,"Thu":60,"Fri":240,"Sat":300}'),
(1,3,'Journal Time',    '{"Sun":0,"Mon":15,"Tue":15,"Wed":15,"Thu":0,"Fri":0,"Sat":0}');

--Insert Austin, Week 4
INSERT INTO habit_table (user_id, date_lookup_id, name, duration_list)
VALUES
(1,4,'Exercise',        '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,4,'Learning',        '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,4,'Project',         '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,4,'Neet Code',       '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,4,'Social Time',     '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}'),
(1,4,'Journal Time',    '{"Sun":0,"Mon":0,"Tue":0,"Wed":0,"Thu":0,"Fri":0,"Sat":0}');

