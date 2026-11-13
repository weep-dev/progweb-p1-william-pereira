
import { Router } from 'express';
import * as treinoController from '../controllers/treinoController.js';

const router = Router();

router.get('/', treinoController.listar);
router.get('/usuario/:usuarioId', treinoController.listarPorUsuario);
router.get('/:id', treinoController.buscarPorId);
router.post('/', treinoController.criar);
router.put('/:id', treinoController.atualizar);
router.delete('/:id', treinoController.remover);

export default router;
