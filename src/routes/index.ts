import { Router, Request, Response } from 'express';
import militarRoutes from './Militar';
import patenteRoutes from './Patente';
import soldadoRoutes from './Soldado';

const routes = Router();

routes.use('/militar', militarRoutes);
routes.use('/patente', patenteRoutes);
routes.use('/soldado', soldadoRoutes);

routes.use((_: Request, res: Response) => res.json({ error: 'Requisição desconhecida' }));

export default routes;
