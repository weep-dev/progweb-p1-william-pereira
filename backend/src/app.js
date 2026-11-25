
import express from 'express';
import cors from 'cors';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import usuariosRoutes from './routes/usuarios.js';
import treinosRoutes from './routes/treinos.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ]
}));

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
