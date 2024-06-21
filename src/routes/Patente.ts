import { Router } from 'express';
import PatenteController from '../controllers/PatenteController';

const router: Router = Router();

router.post('/', PatenteController.create);
router.get('/', PatenteController.list);
router.delete('/', PatenteController.delete);
router.put('/', PatenteController.update);

export default router;
