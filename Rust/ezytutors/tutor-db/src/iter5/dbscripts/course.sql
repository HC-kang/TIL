/* 테이블이 존재한다면 삭제 */
DROP TABLE IF EXISTS ezy_course_c6;

/* 테이블 생성 */
CREATE TABLE ezy_course_c6
(
    course_id SERIAL PRIMARY KEY,
    tutor_id INT NOT NULL,
    course_name VARCHAR(140) NOT NULL,
    course_description VARCHAR(2000),
    course_format VARCHAR(30),
    course_structure VARCHAR(200),
    course_duration VARCHAR(30),
    course_price INT,
    course_language VARCHAR(30),
    course_level VARCHAR(30),
    posted_time TIMESTAMP DEFAULT NOW()
);
