
import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import usuariosRoutes from './routes/usuarios.js';
import treinosRoutes from './routes/treinos.js';

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.json({
        api: 'FitPlan API',
        versao: '1.0.0',
        rotas: ['/usuarios', '/treinos']
    });
});

app.use('/usuarios', usuariosRoutes);
app.use('/treinos', treinosRoutes);
app.use(errorHandler);

export default app;
