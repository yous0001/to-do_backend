import { Router } from "express";
import * as noteController from "./note.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { multerMiddlewareLocal } from "../../middlewares/multer.middleware.js";
import { allowedExtensions } from './../../utils/allowedExtenstions.js';

const router = Router();
router.post("/addnote",auth([systemRoles.user]),noteController.addNote)
router.get('/getnotes',auth(),noteController.getNotes)
router.put('/updatenote/:id',noteController.updateNote)
router.post("/file",multerMiddlewareLocal({filepath:"note/images",allowedExtensions:allowedExtensions.image}).single('file')
,noteController.uploadFile)

export default router