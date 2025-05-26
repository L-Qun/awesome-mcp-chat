DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `chats` DROP FOREIGN KEY `chats_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `user_id` varchar(50) NOT NULL;