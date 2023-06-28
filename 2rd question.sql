/*
2. Refer to the tables below, Write a sql query for finding the subjects for each
student, the subjects should be order by alphabetically .
Sample response :
customerid name subjects
1 Ravi english,hindi,math

customers
customerId name email
1 ravi ravi123@gmail.com
2 kishan kishan11@gmail.com
3 sameer sameer44@gmail.com

Subjects
subjectId subjectName
1 English
2 Hindi
3 Maths
Subject student mapping
mappingId customerId subjectId
1 1 1
2 1 2
3 1 3
4 2 1
5 3 3
6 3 1

*/


/*creating the required tables first*/

CREATE TABLE customers (
  customerId INT,
  name VARCHAR(50),
  email VARCHAR(100),
  PRIMARY KEY (customerId)
);

CREATE TABLE subjects (
  subjectId INT,
  subjectName VARCHAR(50),
  PRIMARY KEY (subjectId)
);

CREATE TABLE subject_student_mapping (
  mappingId INT,
  customerId INT,
  subjectId INT,
  PRIMARY KEY (mappingId),
  FOREIGN KEY (customerId) REFERENCES customers(customerId),
  FOREIGN KEY (subjectId) REFERENCES subjects(subjectId)
);

INSERT INTO customers (customerId, name, email)
VALUES
  (1, 'ravi', 'ravi123@gmail.com'),
  (2, 'kishan', 'kishan11@gmail.com'),
  (3, 'sameer', 'sameer44@gmail.com');

INSERT INTO subjects (subjectId, subjectName)
VALUES
  (1, 'English'),
  (2, 'Hindi'),
  (3, 'Maths');

INSERT INTO subject_student_mapping (mappingId, customerId, subjectId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 2, 1),
  (5, 3, 3),
  (6, 3, 1);






/*query asked in question*/
SELECT
  c.customerId,
  c.name,
  (
    SELECT STRING_AGG(s.subjectName, ', ')
    FROM subjects AS s
    JOIN subject_student_mapping AS m ON m.subjectId = s.subjectId
    WHERE m.customerId = c.customerId
  ) AS subjects
FROM
  customers AS c
ORDER BY
  c.name ASC;
