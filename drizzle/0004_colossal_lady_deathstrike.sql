DROP TABLE `model_configs`;--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `chat_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `role` enum('user','assistant','system','data') NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` ADD `parts` json;