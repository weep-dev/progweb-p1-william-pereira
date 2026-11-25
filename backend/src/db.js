
import { DatabaseSync } from 'node:sqlite';

// O banco inteiro fica armazenado em um arquivo.
const arquivo = process.env.DB_FILE ?? 'banco.db';
export const db = new DatabaseSync(arquivo);

// Ativa a verificação das chaves estrangeiras.
db.exec('PRAGMA foreign_keys = ON;');

// Criação das tabelas do FitPlan.
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS treinos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
  );
`);
