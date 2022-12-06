--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE ARES_SUBJECTS (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  info BLOB    NOT NULL
);

CREATE INDEX ARES_SUBJECTS_name ON ARES_SUBJECTS (name);
CREATE INDEX ARES_SUBJECTS_id ON ARES_SUBJECTS (id);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX ARES_SUBJECTS_name;
DROP INDEX ARES_SUBJECTS_id;
DROP TABLE ARES_SUBJECTS;