
import * as usuarioModel from '../models/usuarioModel.js';
import { erro } from '../utils/erro.js';
import * as treinoModel from '../models/treinoModel.js';

export function listarUsuarios() {
    return usuarioModel.listar();
}

export function buscarUsuario(id) {
    const usuario = usuarioModel.buscarPorId(id);

    if (!usuario) {
        throw erro(404, 'Usuário não encontrado');
    }

    return usuario;
}

export function criarUsuario(dados) {
    if (!dados.nome || !dados.email) {
        throw erro(400, 'Nome e e-mail são obrigatórios');
    }

    const usuarioExistente = usuarioModel.buscarPorEmail(dados.email);

    if (usuarioExistente) {
        throw erro(409, 'Já existe um usuário com este e-mail');
    }

    return usuarioModel.criar(dados);
}

export function atualizarUsuario(id, dados) {
    if (!dados.nome || !dados.email) {
        throw erro(400, 'Nome e e-mail são obrigatórios');
    }

    const usuario = usuarioModel.buscarPorId(id);

    if (!usuario) {
        throw erro(404, 'Usuário não encontrado');
    }

    const usuarioComMesmoEmail = usuarioModel.buscarPorEmail(dados.email);

    if (usuarioComMesmoEmail && usuarioComMesmoEmail.id !== id) {
        throw erro(409, 'Já existe um usuário com este e-mail');
    }

    return usuarioModel.atualizar(id, dados);
}

export function removerUsuario(id) {
    const usuario = usuarioModel.buscarPorId(id);

    if (!usuario) {
        throw erro(404, 'Usuário não encontrado');
    }

    const treinos = treinoModel.listarPorUsuario(id);

    if (treinos.length > 0) {
        throw erro(409, 'Usuário possui treinos. Remova os treinos primeiro.');
    }

    usuarioModel.remover(id);
}
