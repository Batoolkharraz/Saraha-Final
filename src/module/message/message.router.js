import { Router } from "express";
import * as messageCont from './controller/message.controller.js';
import auth from "../../MiddleWare/auth.middleware.js";
const router = Router();

router.get('/',auth,messageCont.getMassage);
router.delete('/:messageId',auth,messageCont.deleteMessage);
router.post('/:receiverId',messageCont.sendMassage);
export default router;