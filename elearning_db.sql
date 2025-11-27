  -- ===============================================
  -- Create Database if not exists
  -- ===============================================
  CREATE DATABASE IF NOT EXISTS elearning_db;
  USE elearning_db;

  -- ===============================================
  -- Table: users
  -- ===============================================
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','teacher','student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: courses
  -- ===============================================
  CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Draft','Active','Archived') DEFAULT 'Active',
    thumbnail VARCHAR(255),
    course_image VARCHAR(255),
    diagram_url VARCHAR(255),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: assignments
  -- ===============================================
  CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(255),
    description TEXT,
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    teacher_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: enrollments
  -- ===============================================
  CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_enrollment (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: quizzes
  -- ===============================================
  CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(255),
    time_limit INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: quiz_questions
  -- ===============================================
  CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question_text TEXT,
    options JSON,
    correct_answer VARCHAR(255),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: quiz_attempts
  -- ===============================================
  CREATE TABLE IF NOT EXISTS quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    student_id INT,
    score DECIMAL(5,2),
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answers JSON,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: study_materials
  -- ===============================================
  CREATE TABLE IF NOT EXISTS study_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(255),
    content TEXT,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: submissions
  -- ===============================================
  CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT,
    student_id INT,
    file_url VARCHAR(255),
    status ENUM('pending','graded') DEFAULT 'pending',
    grade DECIMAL(5,2),
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    teacher_id INT,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Table: system_logs
  -- ===============================================
  CREATE TABLE IF NOT EXISTS system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  -- ===============================================
  -- Insert initial data: Users
  -- ===============================================
  INSERT INTO users (id, name, email, password, role, created_at) VALUES
  (1, 'Admin User', 'admin@example.com', '$2a$10$SIAWAlv3crPBGTCXz2gb/Oa1BBzfTqNSXw.aetkU2qlbtINvNmSRq', 'admin', '2025-09-07 04:11:07')
  ON DUPLICATE KEY UPDATE name=name;

  INSERT INTO users (id, name, email, password, role, created_at) VALUES
  (2, 'Prof. Johnson', 'teacher@example.com', '$2a$10$zdFqi.42jRAJoN72JQsrCucuZMNr.bTrMlprllvFMu2mvX2L.dDMq', 'teacher', '2025-09-07 04:11:07')
  ON DUPLICATE KEY UPDATE name=name;

  INSERT INTO users (id, name, email, password, role, created_at) VALUES
  (8, 'Anupam', 'student@elearn.com', '$2a$10$/eb6EVARJFH32OCLS6sHze7EMPJMwZVw5kjXAwUvYvSNBqlkQ5yum', 'student', '2025-10-12 13:32:17')
  ON DUPLICATE KEY UPDATE name=name;

  -- ===============================================
  -- Insert initial data: Courses
  -- ===============================================
  INSERT INTO courses (id, title, description, teacher_id, created_at, status, thumbnail, course_image) VALUES
  (6, 'Python ++', 'This is the advanced python ++ course for beginner with advanced concept.', 2, '2025-11-09 04:23:19', 'Active', '1763995376357_aaaaaaaa.jpg', '1763995376393_aaaaaaaa.jpg')
  ON DUPLICATE KEY UPDATE title=title;

  INSERT INTO courses (id, title, description, teacher_id, created_at, status) VALUES
  (8, 'Scripting Language', 'This is the bca 4th sem course.', 2, '2025-11-23 03:47:15', 'Active')
  ON DUPLICATE KEY UPDATE title=title;

  -- ===============================================
  -- Insert initial data: Assignments
  -- ===============================================
  INSERT INTO assignments (id, course_id, title, description, due_date, created_at, teacher_id) VALUES
  (1, 6, 'Describe the python language in your terms?', 'In this assignment you can write about python language in your language. How much you know. What are the fields you can explore by learning Python?', '2025-11-20 00:00:00', '2025-11-09 04:42:38', 2)
  ON DUPLICATE KEY UPDATE title=title;

  INSERT INTO assignments (id, course_id, title, description, due_date, created_at, teacher_id) VALUES
  (3, 8, 'Check', 'Do you own', '2025-11-27 00:00:00', '2025-11-23 03:49:33', 2)
  ON DUPLICATE KEY UPDATE title=title;
