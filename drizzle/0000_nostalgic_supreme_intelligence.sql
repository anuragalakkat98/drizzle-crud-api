CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
