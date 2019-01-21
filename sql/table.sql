CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name TEXT,
    starter TEXT,
    addon TEXT,
    category TEXT
);

CREATE TABLE IF NOT EXISTS userCustomise (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    template_id INTEGER REFERENCES templates (id)
);

CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    object TEXT,
    reason TEXT,
    template_id INTEGER REFERENCES templates (id),
    user_id INTEGER REFERENCES users (id),
    created_on TIMESTAMPTZ DEFAULT Now(),
    created_at TIMESTAMPTZ  DEFAULT Now()
);

