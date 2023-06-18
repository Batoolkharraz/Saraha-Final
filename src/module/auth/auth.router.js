import { Router } from "express";
import * as authCont from './controller/auth.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import { validation } from "../../MiddleWare/validation.js";
import * as validators from './auth.validation.js'
const router = Router();

router.post('/signup',validation(validators.signupSchema),asyncHandler(authCont.signup));
router.post('/signin',validation(validators.signinSchema),asyncHandler(authCont.signin));
router.get('/confirmEmail/:token',authCont.confirmEmail);
export default router;