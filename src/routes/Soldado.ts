import { Router } from 'express';
import SoldadoController from '../controllers/SoldadoController';

const router: Router = Router();

router.post('/', SoldadoController.create);
router.get('/', SoldadoController.list);
router.delete('/', SoldadoController.delete);
router.put('/', SoldadoController.update);

export default router;
