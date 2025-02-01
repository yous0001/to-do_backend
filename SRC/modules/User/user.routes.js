import { Router } from "express";
import * as userController from "./user.controller.js"
import * as userSchema from "./user.schema.js"
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { multerMiddlewareLocal,multerMiddlewareHost } from "../../middlewares/multer.middleware.js";
import { allowedExtensions } from "../../utils/allowedExtenstions.js";
import { uploadFile } from "../Note/note.controller.js";

const router = Router();
router.post('/signup',multerMiddlewareHost({allowedExtensions:allowedExtensions.image}).single("profileImg"),validationMiddleware(userSchema.signupSchema),userController.signup)
router.get('/verify/:token',userController.verifyEmail)
router.post('/signin',validationMiddleware(userSchema.signinSchema),userController.signin)

export default router