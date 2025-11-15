
import { Habit } from "@/types/habit";
import { SQLiteDatabase } from "expo-sqlite";

export const initTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            active INTEGER DEFAULT 1,
            done_today INTEGER DEFAULT 0,
            created_at INTEGER
            )
        `);
};

// CREATE
export const createHabit = async (
  db: SQLiteDatabase,
  data: Habit
) => {
  await db.runAsync(
    `INSERT INTO habits (title, description, active, done_today, created_at) VALUES (?, ?, ?, ?, ?)`,
    [data.title, data.description, data.active, data.done_today, data.created_at]
  );
};

// READ
export const getAllHabits = async (
  db: SQLiteDatabase
) => {
  return await db.getAllAsync<Habit>(
    `SELECT * FROM habits`
  );
};

export const getHabitById = async (db: SQLiteDatabase, id: number) => {
  return await db.getFirstAsync<Habit>(
    `SELECT * FROM habits WHERE id = ?`,
    [id]
  );
};

// UPDATE
export const updateHabit = async (
  db: SQLiteDatabase,
  data: Habit
) => {
  await db.runAsync(
    `UPDATE habits SET title = ?, description = ?, active = ?, done_today = ?, created_at = ?, WHERE id = ?`,
    [data.title, data.description, data.active, data.done_today, data.created_at, data.id]
  );
};

// //  DELETE
// export const softDeleteTransaction = async (db: SQLiteDatabase, id: number) => {
//   await db.runAsync(`UPDATE habits SET isDeleted = 1 WHERE id = ?`, [id]);
// };

// export const restoreTransaction = async (db: SQLiteDatabase, id: number) => {
//   await db.runAsync(`UPDATE transactions SET isDeleted = 0 WHERE id = ?`, [id]);
// };