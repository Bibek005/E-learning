-- Create database
CREATE DATABASE IF NOT EXISTS elearning_db;
USE elearning_db;

-- Table: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher', 'student') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, password, role, created_at) VALUES
(1, 'Admin User', 'admin@example.com', '$2a$10$SIAWAlv3crPBGTCXz2gb/Oa1BBzfTqNSXw.aetkU2qlbtINvNmSRq', 'admin', '2025-09-07 09:56:07'),
(2, 'Prof. Johnson', 'teacher@example.com', '$2a$10$n3gnxZohR2UIfvtu3PYAnumOH.82M74b3oy/Bpe4IzRUgE3gmQvFW', 'teacher', '2025-09-07 09:56:07'),
(8, 'Anupam', 'student@elearn.com', '$2a$10$/eb6EVARJFH32OCLS6sHze7EMPJMwZVw5kjXAwUvYvSNBqlkQ5yum', 'student', '2025-10-12 19:17:17');

-- Table: courses
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  teacher_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

INSERT INTO courses (id, title, description, teacher_id, created_at, status) VALUES
(6, 'Python ++', 'This is the advanced python ++ course for beginner with advanced concept.', 2, '2025-11-09 10:08:19', 'Active');

-- Table: assignments
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(255),
  description TEXT,
  due_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  teacher_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

INSERT INTO assignments (id, course_id, title, description, due_date, created_at, teacher_id) VALUES
(1, 6, 'Describe the python language in your terms?', 'In this assignment you can write about python language in your language. How much you know. What are the fields you can explore by learning Python?', '2025-11-20 00:00:00', '2025-11-09 10:27:38', 2);

-- Table: enrollments
CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: quizzes
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(255),
  time_limit INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: quiz_questions
CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  question_text TEXT,
  options JSON,
  correct_answer VARCHAR(255),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Table: quiz_attempts
CREATE TABLE quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  student_id INT,
  score INT,
  attempt_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  answers JSON,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table: study_materials
CREATE TABLE study_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(255),
  content TEXT,
  file_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: submissions
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT,
  student_id INT,
  file_url VARCHAR(255),
  status ENUM('Pending', 'Graded') DEFAULT 'Pending',
  grade VARCHAR(10),
  feedback TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  teacher_id INT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Table: system_logs
CREATE TABLE system_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  details TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
