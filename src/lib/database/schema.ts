import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
  json,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export const chats = mysqlTable("chats", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  userId: varchar("user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  chatId: varchar("chat_id", { length: 255 })
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  role: mysqlEnum("role", ["user", "assistant", "system", "data"]).notNull(),
  content: text("content").notNull(),
  parts: json("parts"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Chat = typeof chats.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type DBMessage = typeof messages.$inferSelect;
