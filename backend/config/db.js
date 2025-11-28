
// server/config/db.js
// server/config/db.js
const mysql = require('mysql2/promise');

const { DB_HOST='localhost', DB_USER='root', DB_PASS='', DB_NAME='elearning_db' } = process.env;

let pool;

async function init() {
  const connection = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASS, multipleStatements:true });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);

  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    connectionLimit: 10,
    multipleStatements: true,
  });

  // Create tables and seed data
    const createTablesAndSeed = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin','teacher','student') DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

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
      );

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
      );

      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        course_id INT,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_enrollment (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );

      CREATE TABLE IF NOT EXISTS quizzes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT,
        title VARCHAR(255),
        time_limit INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );

      CREATE TABLE IF NOT EXISTS quiz_questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT,
        question_text TEXT,
        options JSON,
        correct_answer VARCHAR(255),
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
      );

      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT,
        student_id INT,
        score DECIMAL(5,2),
        attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        answers JSON,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
        FOREIGN KEY (student_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS study_materials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT,
        title VARCHAR(255),
        content TEXT,
        file_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );

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
      );

      CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        action VARCHAR(255),
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      -- Insert seed users
      INSERT INTO users (id, name, email, password, role, created_at) VALUES
      (1, 'Admin User', 'admin@example.com', '$2a$10$SIAWAlv3crPBGTCXz2gb/Oa1BBzfTqNSXw.aetkU2qlbtINvNmSRq', 'admin', NOW())
      ON DUPLICATE KEY UPDATE name=VALUES(name);

      INSERT INTO users (id, name, email, password, role, created_at) VALUES
      (2, 'Prof. Johnson', 'teacher@example.com', '$2a$10$zdFqi.42jRAJoN72JQsrCucuZMNr.bTrMlprllvFMu2mvX2L.dDMq', 'teacher', NOW())
      ON DUPLICATE KEY UPDATE name=VALUES(name);

      INSERT INTO users (id, name, email, password, role, created_at) VALUES
      (8, 'Anupam', 'student@elearn.com', '$2a$10$/eb6EVARJFH32OCLS6sHze7EMPJMwZVw5kjXAwUvYvSNBqlkQ5yum', 'student', NOW())
      ON DUPLICATE KEY UPDATE name=VALUES(name);

      -- Insert seed courses
      INSERT INTO courses (id, title, description, teacher_id, created_at, status, thumbnail, course_image) VALUES
      (6, 'Python ++', 'Advanced python course.', 2, NOW(), 'Active', '1763995376357_aaaaaaaa.jpg', '1763995376393_aaaaaaaa.jpg')
      ON DUPLICATE KEY UPDATE title=VALUES(title);

      INSERT INTO courses (id, title, description, teacher_id, created_at, status) VALUES
      (8, 'Scripting Language', 'BCA 4th sem course.', 2, NOW(), 'Active')
      ON DUPLICATE KEY UPDATE title=VALUES(title);

      -- Insert seed assignments
      INSERT INTO assignments (id, course_id, title, description, due_date, created_at, teacher_id) VALUES
      (1, 6, 'Describe Python', 'Write about Python in your own words.', NOW(), NOW(), 2)
      ON DUPLICATE KEY UPDATE title=VALUES(title);

      INSERT INTO assignments (id, course_id, title, description, due_date, created_at, teacher_id) VALUES
      (3, 8, 'Check', 'Do you own?', NOW(), NOW(), 2)
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `;
  await pool.query(createTablesAndSeed);
  console.log("DB ready with tables and seed data");
}

init().catch(err => { console.error(err); process.exit(1); });

module.exports = {
  query: (...args) => pool.query(...args),
  getPool: () => pool,
};





 