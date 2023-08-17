CREATE TABLE IF NOT EXISTS public_ip_records (
	record_id TEXT PRIMARY KEY,
  hostname TEXT NOT NULL,
  dns_zone TEXT NOT NUll
);