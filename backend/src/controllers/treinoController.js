
import * as treinoService from '../services/treinoService.js';

export function listar(req, res) {
    const treinos = treinoService.listarTreinos();

    res.status(200).json(treinos);
}

export function buscarPorId(req, res) {
    const id = Number(req.params.id);

    const treino = treinoService.buscarTreino(id);

    res.status(200).json(treino);
}

export function listarPorUsuario(req, res) {
    const usuarioId = Number(req.params.usuarioId);

    const treinos = treinoService.listarTreinosPorUsuario(usuarioId);

    res.status(200).json(treinos);
}

export function criar(req, res) {
    const treino = treinoService.criarTreino(req.body);

    res.status(201).json(treino);
}

export function atualizar(req, res) {
    const id = Number(req.params.id);

    const treino = treinoService.atualizarTreino(id, req.body);

    res.status(200).json(treino);
}

export function remover(req, res) {
    const id = Number(req.params.id);

    treinoService.removerTreino(id);

    res.status(204).send();
}
