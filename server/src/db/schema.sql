CREATE TABLE IF NOT EXISTS events (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  starts_at timestamptz NOT NULL,
  location text NOT NULL,
  is_birthday boolean NOT NULL DEFAULT false,
  rodizio_price numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS people (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id integer NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_birthday boolean NOT NULL DEFAULT false,
  payment_status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consumption_items (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id integer NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  person_id integer NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL CHECK (unit_price >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_people_event ON people(event_id);
CREATE INDEX IF NOT EXISTS idx_consumption_items_event ON consumption_items(event_id);
CREATE INDEX IF NOT EXISTS idx_consumption_items_person ON consumption_items(person_id);
