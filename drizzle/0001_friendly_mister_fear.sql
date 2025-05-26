ALTER TABLE `chats` DROP FOREIGN KEY `chats_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `user_id` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `chat_id` text NOT NULL;