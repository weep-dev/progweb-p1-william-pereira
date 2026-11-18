
import * as usuarioService from '../services/usuarioService.js';

export function listar(req, res) {
    const usuarios = usuarioService.listarUsuarios();

    res.status(200).json(usuarios);
}

export function buscarPorId(req, res) {
    const id = Number(req.params.id);

    const usuario = usuarioService.buscarUsuario(id);

    res.status(200).json(usuario);
}

export function criar(req, res) {
    const usuario = usuarioService.criarUsuario(req.body);

    res.status(201).json(usuario);
}

export function atualizar(req, res) {
    const id = Number(req.params.id);

    const usuario = usuarioService.atualizarUsuario(id, req.body);

    res.status(200).json(usuario);
}

export function remover(req, res) {
    const id = Number(req.params.id);

    usuarioService.removerUsuario(id);

    res.status(204).send();
}
