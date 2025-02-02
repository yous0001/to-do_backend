import { Router } from "express";
import * as userController from "./user.controller.js"
import * as userSchema from "./user.schema.js"
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { multerMiddlewareLocal,multerMiddlewareHost } from "../../middlewares/multer.middleware.js";
import { allowedExtensions } from "../../utils/allowedExtenstions.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from './../../middlewares/auth.middleware.js';
const router = Router();
router.post('/signup',validationMiddleware(userSchema.signupSchema),expressAsyncHandler(userController.signup))
router.get('/verify/:token',userController.verifyEmail)
router.post('/signin',validationMiddleware(userSchema.signinSchema),expressAsyncHandler(userController.signin))
router.post("/upload-img",auth(),
    multerMiddlewareHost({allowedExtensions:allowedExtensions.image}).single('profileImg'),expressAsyncHandler(userController.uploadImg)
)
router.delete('/delete-img',auth(),expressAsyncHandler(userController.deleteImg))
export default router