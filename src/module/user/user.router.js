import { Router } from "express";
import * as userCont from './controller/user.controller.js';
import auth from '../../MiddleWare/auth.middleware.js';
import fileUpload, { HME } from "../../Services/multer.js";
const router = Router();
router.patch('/profilePic',fileUpload().single('image'),HME,userCont.profilePic);
router.get('/profile',auth,userCont.profile);
export default router;