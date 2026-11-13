
import * as treinoModel from '../models/treinoModel.js';
import * as usuarioModel from '../models/usuarioModel.js';
import { erro } from '../utils/erro.js';

export function listarTreinos() {
    return treinoModel.listar();
}

export function buscarTreino(id) {
    const treino = treinoModel.buscarPorId(id);

    if (!treino) {
        throw erro(404, 'Treino não encontrado');
    }

    return treino;
}

export function listarTreinosPorUsuario(usuarioId) {
    const usuario = usuarioModel.buscarPorId(usuarioId);

    if (!usuario) {
        throw erro(404, 'Usuário não encontrado');
    }

    return treinoModel.listarPorUsuario(usuarioId);
}

export function criarTreino(dados) {
    if (!dados.nome || !dados.descricao || !dados.usuarioId) {
        throw erro(400, 'Nome, descrição e usuário são obrigatórios');
    }

    const usuarioId = Number(dados.usuarioId);

    const usuario = usuarioModel.buscarPorId(usuarioId);

    if (!usuario) {
        throw erro(422, 'Não é possível criar um treino para um usuário inexistente');
    }

    return treinoModel.criar({
        nome: dados.nome,
        descricao: dados.descricao,
        usuarioId
    });
}

export function atualizarTreino(id, dados) {
    if (!dados.nome || !dados.descricao) {
        throw erro(400, 'Nome e descrição são obrigatórios');
    }

    const treino = treinoModel.buscarPorId(id);

    if (!treino) {
        throw erro(404, 'Treino não encontrado');
    }

    return treinoModel.atualizar(id, dados);
}

export function removerTreino(id) {
    const removido = treinoModel.remover(id);

    if (!removido) {
        throw erro(404, 'Treino não encontrado');
    }
}
