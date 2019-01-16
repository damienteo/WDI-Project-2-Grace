CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    object TEXT,
    reason TEXT,
    template_id INTEGER REFERENCES templates (id),
    user_id INTEGER REFERENCES users (id),
    created_on DATE DEFAULT CURRENT_DATE,
    created_at TIME DEFAULT CURRENT_TIME
);

CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name TEXT,
    starter TEXT,
    addon TEXT
);

-- categories: basic, random, customised

-- SELECT to_char(created_on, 'FMMonth FMDDth, YYYY') FROM entries;
-- SELECT to_char(created_at, 'HH12:MI:SS AM') FROM entries;