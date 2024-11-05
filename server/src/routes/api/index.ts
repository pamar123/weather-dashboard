import { Router } from 'express';
const router = Router();
import weatherRoutes from './weatherRoutes.js';

// Fix: weatherRoutes is already a Router, so we can use it directly
router.use('/weather', weatherRoutes);

export default router;
