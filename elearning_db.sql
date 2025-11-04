-- Create and select the database
CREATE DATABASE IF NOT EXISTS elearning_db;
USE elearning_db;

-- Table: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','teacher','student') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, password, role, created_at) VALUES
(1, 'Admin User', 'admin@example.com', '$2a$10$SIAWAlv3crPBGTCXz2gb/Oa1BBzfTqNSXw.aetkU2qlbtINvNmSRq', 'admin', '2025-09-07 04:11:07'),
(2, 'Prof. Johnson', 'teacher@example.com', '$2a$10$n3gnxZohR2UIfvtu3PYAnumOH.82M74b3oy/Bpe4IzRUgE3gmQvFW', 'teacher', '2025-09-07 04:11:07'),
(8, 'Anupam', 'student@elearn.com', '$2a$10$/eb6EVARJFH32OCLS6sHze7EMPJMwZVw5kjXAwUvYvSNBqlkQ5yum', 'student', '2025-10-12 13:32:17');

-- Table: courses
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Draft','Active','Archived') DEFAULT 'Active',
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Table: assignments
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(100),
  description TEXT,
  due_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: study_materials
CREATE TABLE study_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(100),
  content TEXT,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: enrollments
CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: quizzes
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(100),
  time_limit INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table: quiz_questions
CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  question_text TEXT,
  options JSON,
  correct_answer VARCHAR(10),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Table: quiz_attempts
CREATE TABLE quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  student_id INT,
  score DECIMAL(5,2),
  attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answers JSON,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table: submissions
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT,
  student_id INT,
  file_url VARCHAR(255),
  status ENUM('pending','graded') DEFAULT 'pending',
  grade DECIMAL(5,2),
  feedback TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table: system_logs
CREATE TABLE system_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100),
  details TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password, role, created_at) VALUES
('Admin User', 'admin@example.com', '$2a$10$SIAWAlv3crPBGTCXz2gb/Oa1BBzfTqNSXw.aetkU2qlbtINvNmSRq', 'admin', '2025-09-07 04:11:07'),
('Prof. Johnson', 'teacher@example.com', '$2a$10$n3gnxZohR2UIfvtu3PYAnumOH.82M74b3oy/Bpe4IzRUgE3gmQvFW', 'teacher', '2025-09-07 04:11:07'),
('Anupam', 'student@elearn.com', '$2a$10$/eb6EVARJFH32OCLS6sHze7EMPJMwZVw5kjXAwUvYvSNBqlkQ5yum', 'student', '2025-10-12 13:32:17');
