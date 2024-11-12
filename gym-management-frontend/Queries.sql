-- Run this script to create the database schema and insert sample data for the Gym Management System
-- Creating tables for the Gym Management System
CREATE TABLE Trainer (
    TrainerID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Specialization VARCHAR(50),
    SupervisorID INT
);

CREATE TABLE Member (
    MemberID SERIAL PRIMARY KEY,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    ContactNo VARCHAR(15),
    TrainerID INT REFERENCES Trainer(TrainerID),  
    FitnessLevel INT CHECK (FitnessLevel BETWEEN 1 AND 10),
    DOB DATE,
    Age INT
);

CREATE TABLE Class (
    ClassID SERIAL PRIMARY KEY,
    ClassName VARCHAR(50) NOT NULL,
    Schedule VARCHAR(20)
);

CREATE TABLE Workout_Plan (
    PlanID SERIAL PRIMARY KEY,
    PlanName VARCHAR(50) NOT NULL,
    MinimumFitnessLevel INT CHECK (MinimumFitnessLevel BETWEEN 1 AND 10)
);

CREATE TABLE Equipment (
    EquipmentID SERIAL PRIMARY KEY,
    EquipmentName VARCHAR(50) NOT NULL
);

CREATE TABLE Emergency_Contact (
    MemberID INT REFERENCES Member(MemberID),
    ContactName VARCHAR(50) NOT NULL,
    ContactNumber VARCHAR(15) NOT NULL,
    PRIMARY KEY (MemberID)
);

CREATE TABLE Attendance (
    MemberID INT REFERENCES Member(MemberID),
    Date DATE NOT NULL,
    PRIMARY KEY (MemberID, Date)
);

CREATE TABLE Assigned_To (
    ClassID INT REFERENCES Class(ClassID),
    TrainerID INT REFERENCES Trainer(TrainerID),
    PRIMARY KEY (ClassID, TrainerID)
);

CREATE TABLE Enrolled_In (
    MemberID INT REFERENCES Member(MemberID),
    ClassID INT REFERENCES Class(ClassID),
    PRIMARY KEY (MemberID, ClassID)
);

CREATE TABLE Follows (
    MemberID INT REFERENCES Member(MemberID),
    PlanID INT REFERENCES Workout_Plan(PlanID),
    PRIMARY KEY (MemberID, PlanID)
);

CREATE TABLE Requires (
    PlanID INT REFERENCES Workout_Plan(PlanID),
    EquipmentID INT REFERENCES Equipment(EquipmentID),
    PRIMARY KEY (PlanID, EquipmentID)
);

-- Inserting Values into tables
INSERT INTO Trainer (Name, Specialization, SupervisorID) VALUES 
    ('John Smith', 'Strength Training', NULL),
    ('Emily Davis', 'Yoga', 1),
    ('Robert Brown', 'Cardio', 1),
    ('Sophia Lee', 'Pilates', 1),
    ('Michael Johnson', 'CrossFit', 3),
    ('Lisa Wong', 'Aerobics', 3),
    ('David Wilson', 'Bodybuilding', 1),
    ('Angela Clark', 'Rehabilitation', 2),
    ('James Young', 'High-Intensity Interval Training', 4),
    ('Grace Kim', 'Zumba', 2);

INSERT INTO Member (FName, LName, ContactNo, TrainerID, FitnessLevel, DOB) VALUES 
    ('Alice', 'Johnson', '555-1234', 2, 3, '1995-04-10'),
    ('Bob', 'Miller', '555-5678', 3, 6, '1987-07-21'),
    ('Carol', 'Smith', '555-8765', 5, 5, '1992-11-01'),
    ('Dave', 'Anderson', '555-4321', 4, 4, '1998-02-14'),
    ('Eve', 'Clark', '555-8762', 7, 2, '2000-05-05'),
    ('Frank', 'Wright', '555-3456', 3, 7, '1984-03-30'),
    ('Grace', 'Harris', '555-7890', 9, 8, '1979-06-25'),
    ('Henry', 'Lewis', '555-7895', 1, 6, '1986-09-16'),
    ('Isabel', 'Lee', '555-3458', 4, 5, '1993-08-08'),
    ('Jake', 'Walker', '555-6789', 10, 4, '1989-12-03'),
    ('Judy', 'Hall', '555-2341', 5, 3, '1995-10-17'),
    ('Kevin', 'King', '555-5672', 6, 7, '1981-01-12'),
    ('Laura', 'Scott', '555-6543', 3, 9, '1975-02-26'),
    ('Mike', 'Green', '555-4567', 1, 6, '1988-04-15'),
    ('Nina', 'Adams', '555-3459', 2, 3, '2002-11-30'),
    ('Oscar', 'Mitchell', '555-4569', 9, 4, '1991-10-11'),
    ('Pat', 'Perez', '555-5673', 10, 2, '1997-07-19'),
    ('Quinn', 'Roberts', '555-6783', 7, 1, '2003-12-01'),
    ('Rachel', 'Young', '555-7893', 5, 7, '1980-01-09'),
    ('Sam', 'Hughes', '555-1239', 4, 5, '1985-03-25'),
    ('Tina', 'Murphy', '555-2349', 2, 8, '1978-09-30'),
    ('Uma', 'Wood', '555-4562', 8, 3, '1996-05-20'),
    ('Victor', 'Rivera', '555-3457', 6, 4, '1983-07-08'),
    ('Wanda', 'Cruz', '555-5671', 7, 6, '1994-12-13'),
    ('Xavier', 'Long', '555-6785', 9, 10, '1973-11-23'),
    ('Yara', 'Ross', '555-7891', 1, 9, '1976-08-04'),
    ('Zoe', 'Diaz', '555-3450', 8, 4, '1999-06-02'),
    ('Chris', 'Brown', '555-1240', 6, 6, '1995-02-28'),
    ('Julia', 'Taylor', '555-1250', 8, 7, '1994-10-06'),
    ('Tom', 'Black', '555-6786', 4, 8, '1993-05-03');

INSERT INTO Emergency_Contact (MemberID, ContactName, ContactNumber) VALUES 
    (1, 'Robert Johnson', '555-3333'),
    (2, 'Susan Miller', '555-4444'),
    (3, 'Paul Smith', '555-5555'),
    (4, 'Jennifer Anderson', '555-6666'),
    (5, 'Chris Clark', '555-7777'),
    (6, 'Linda Wright', '555-8888'),
    (7, 'Mike Harris', '555-9999'),
    (8, 'Emily Lewis', '555-0001'),
    (9, 'Anna Lee', '555-0002'),
    (10, 'James Walker', '555-0003'),
    (11, 'Ellen Hall', '555-0004'),
    (12, 'Nancy King', '555-0005'),
    (13, 'Kevin Scott', '555-0006'),
    (14, 'Rachel Green', '555-0007'),
    (15, 'David Adams', '555-0008'),
    (16, 'Laura Mitchell', '555-0009'),
    (17, 'Oliver Perez', '555-0010'),
    (18, 'Megan Roberts', '555-0011'),
    (19, 'Ashley Young', '555-0012'),
    (20, 'Daniel Hughes', '555-0013');

INSERT INTO Class (ClassName, Schedule) VALUES 
    ('Yoga Basics', 'Mon-Wed'),
    ('Advanced Yoga', 'Tue-Thu'),
    ('Beginner Cardio', 'Mon-Wed-Fri'),
    ('CrossFit', 'Tue-Thu-Sat'),
    ('Strength Training', 'Mon-Wed-Fri'),
    ('Zumba', 'Fri-Sat'),
    ('Pilates', 'Wed-Fri'),
    ('High-Intensity Interval', 'Thu-Sat');

INSERT INTO Workout_Plan (PlanName, MinimumFitnessLevel) VALUES 
    ('Beginner Strength', 1),
    ('Advanced Cardio', 4),
    ('Yoga Flexibility', 3),
    ('HIIT', 5),
    ('CrossFit Challenge', 6),
    ('Rehabilitation Routine', 2),
    ('Bodybuilding Basics', 2),
    ('Zumba Fit', 1);

INSERT INTO Equipment (EquipmentName) VALUES 
    ('Treadmill'),
    ('Dumbbells'),
    ('Kettlebells'),
    ('Resistance Bands'),
    ('Yoga Mats'),
    ('Stationary Bike'),
    ('Rowing Machine'),
    ('Elliptical'),
    ('Bench Press'),
    ('Pull-Up Bar');

INSERT INTO Attendance (MemberID, Date) VALUES 
    (1, '2024-11-01'),
    (2, '2024-11-02'),
    (3, '2024-11-03'),
    (4, '2024-11-04'),
    (5, '2024-11-05'),
    (6, '2024-11-06'),
    (7, '2024-11-07'),
    (8, '2024-11-08'),
    (9, '2024-11-09'),
    (10, '2024-11-10'),
    (11, '2024-11-11'),
    (12, '2024-11-12'),
    (13, '2024-11-13'),
    (14, '2024-11-14'),
    (15, '2024-11-15');

INSERT INTO Enrolled_In (MemberID, ClassID) VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 1),
    (10, 2),
    (11, 3),
    (12, 4),
    (13, 5),
    (14, 6),
    (15, 7);

INSERT INTO Follows (MemberID, PlanID) VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 2),
    (10, 3),
    (11, 1),
    (12, 4),
    (13, 5),
    (14, 6),
    (15, 7),
    (16, 8),
    (17, 4),
    (18, 6),
    (19, 3),
    (20, 2);

INSERT INTO Assigned_To (ClassID, TrainerID) VALUES 
    (1, 2),
    (2, 2),
    (3, 3),
    (4, 5),
    (5, 7),
    (6, 9),
    (7, 4),
    (8, 10);

INSERT INTO Requires (PlanID, EquipmentID) VALUES 
    (1, 2),
    (2, 3),
    (3, 5),
    (4, 1),
    (5, 4),
    (6, 10),
    (7, 8),
    (8, 6);

-- Trigger Function to update the age of the member when the DOB is updated
CREATE OR REPLACE FUNCTION update_age()
RETURNS TRIGGER AS $$
BEGIN
    NEW.Age := DATE_PART('year', AGE(NEW.DOB));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_age
BEFORE INSERT OR UPDATE ON Member
FOR EACH ROW
EXECUTE FUNCTION update_age();

-- Trigger Function to check for schedule conflicts when enrolling a member in a class
CREATE OR REPLACE FUNCTION check_schedule_conflict()
RETURNS TRIGGER AS $$
DECLARE
    existing_schedule TEXT;
    new_schedule TEXT;
    existing_day TEXT;
    new_day TEXT;
BEGIN
    SELECT Schedule INTO new_schedule
    FROM Class
    WHERE ClassID = NEW.ClassID;

    FOR existing_schedule IN
        SELECT c.Schedule
        FROM enrolled_in AS e
        JOIN Class AS c ON e.ClassID = c.ClassID
        WHERE e.MemberID = NEW.MemberID
    LOOP
        FOR existing_day IN SELECT * FROM unnest(string_to_array(existing_schedule, '-')) LOOP
            FOR new_day IN SELECT * FROM unnest(string_to_array(new_schedule, '-')) LOOP
                IF existing_day = new_day THEN
                    RAISE EXCEPTION 'Schedule conflict detected: Member % is already enrolled in a class with a conflicting schedule on %', NEW.MemberID, existing_day;
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_enroll_trigger
BEFORE INSERT ON enrolled_in
FOR EACH ROW
EXECUTE FUNCTION check_schedule_conflict();

-- Trigger Function to check for fitness level requirements when following a workout plan
CREATE OR REPLACE FUNCTION check_fitness_level()
RETURNS TRIGGER AS $$
DECLARE
    member_fitness_level INTEGER;
    plan_min_fitness_level INTEGER;
BEGIN
    SELECT fitnesslevel INTO member_fitness_level 
    FROM Member
    WHERE memberid = NEW.memberid;

    SELECT minimumfitnesslevel INTO plan_min_fitness_level 
    FROM Workout_Plan
    WHERE planid = NEW.planid;

    IF member_fitness_level < plan_min_fitness_level THEN
        RAISE EXCEPTION 'Member does not meet the minimum fitness level for this workout plan';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_fitness_level
BEFORE INSERT ON follows
FOR EACH ROW
EXECUTE FUNCTION check_fitness_level();
