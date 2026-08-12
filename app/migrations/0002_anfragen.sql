-- Kontaktanfragen von der Website. Additiv, siehe Regel 5 (eine Live-Datenbank).
CREATE TABLE IF NOT EXISTS anfragen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  telefon TEXT NOT NULL,
  email TEXT,
  ort TEXT,
  flaeche TEXT,
  leistung TEXT,
  nachricht TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
