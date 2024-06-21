import { Router } from 'express';
import MilitarController from '../controllers/MilitarController';

const router: Router = Router();

router.post('/', MilitarController.create);
router.get('/', MilitarController.list);
router.delete('/', MilitarController.delete);
router.put('/', MilitarController.update);

export default router;
