
import { db } from '../db.js';

const COLUNAS = `
    id,
    nome,
    descricao,
    usuario_id AS usuarioId
`;

export function listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM treinos ORDER BY id`).all();
}

export function buscarPorId(id) {
    return db.prepare(`SELECT ${COLUNAS} FROM treinos WHERE id = ?`).get(id) ?? null;
}

export function listarPorUsuario(usuarioId) {
    return db
        .prepare(`SELECT ${COLUNAS} FROM treinos WHERE usuario_id = ? ORDER BY id`)
        .all(usuarioId);
}

export function criar(dados) {
    const resultado = db
        .prepare('INSERT INTO treinos (nome, descricao, usuario_id) VALUES (?, ?, ?)')
        .run(dados.nome, dados.descricao ?? null, dados.usuarioId);

    return buscarPorId(resultado.lastInsertRowid);
}

export function atualizar(id, dados) {
    const treino = buscarPorId(id);

    if (!treino) {
        return null;
    }

    db.prepare('UPDATE treinos SET nome = ?, descricao = ? WHERE id = ?')
        .run(dados.nome, dados.descricao ?? null, id);

    return buscarPorId(id);
}

export function remover(id) {
    const resultado = db
        .prepare('DELETE FROM treinos WHERE id = ?')
        .run(id);

    return resultado.changes > 0;
}
