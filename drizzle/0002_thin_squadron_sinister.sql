ALTER TABLE `chats` MODIFY COLUMN `id` char(21) NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `id` char(21) NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `chat_id` char(21) NOT NULL;--> statement-breakpoint
ALTER TABLE `model_configs` MODIFY COLUMN `chat_id` char(21) NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` ADD CONSTRAINT `chats_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;