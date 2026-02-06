import { pgTable, text, jsonb, timestamp, varchar } from 'drizzle-orm/pg-core';

export const proposals = pgTable('proposals', {
    id: varchar('id', { length: 255 }).primaryKey(),
    data: jsonb('data').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
