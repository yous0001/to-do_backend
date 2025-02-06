import { Router } from "express";
import * as noteController from "./note.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/systemRoles.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();
router.post("/addnote",auth([systemRoles.user]),expressAsyncHandler(noteController.addNote))
router.get('/getnotes',auth(),expressAsyncHandler(noteController.getNotes))
router.put('/update/:id',auth(),expressAsyncHandler(noteController.updateNote))
router.put('/complete/:id',auth(),expressAsyncHandler(noteController.completeNote))

export default router