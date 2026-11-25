
import { db } from '../db.js';

export function listar() {
    return db.prepare('SELECT * FROM usuarios ORDER BY id').all();
}

export function buscarPorId(id) {
    return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id) ?? null;
}

export function buscarPorEmail(email) {
    return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email) ?? null;
}

export function criar(dados) {
    const resultado = db
        .prepare('INSERT INTO usuarios (nome, email) VALUES (?, ?)')
        .run(dados.nome, dados.email);

    return buscarPorId(resultado.lastInsertRowid);
}

export function atualizar(id, dados) {
    const usuario = buscarPorId(id);

    if (!usuario) {
        return null;
    }

    db.prepare('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?')
        .run(dados.nome, dados.email, id);

    return buscarPorId(id);
}

export function remover(id) {
    const resultado = db
        .prepare('DELETE FROM usuarios WHERE id = ?')
        .run(id);

    return resultado.changes > 0;
}
