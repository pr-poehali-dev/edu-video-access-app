CREATE TABLE t_p19153084_edu_video_access_app.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_letter VARCHAR(1) NOT NULL DEFAULT 'А',
    level VARCHAR(50) NOT NULL DEFAULT 'Начинающий',
    streak_days INTEGER NOT NULL DEFAULT 0,
    hours_studied NUMERIC(6,1) NOT NULL DEFAULT 0,
    videos_watched INTEGER NOT NULL DEFAULT 0,
    courses_started INTEGER NOT NULL DEFAULT 0,
    session_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);