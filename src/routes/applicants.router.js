import {Router} from "express";
import  {applyToJob, deleteJobApplication, getAllApplicationsByApplicantId, getApplicationById} from "../controllers/applicants.controller.js"
const router = Router()

router.route('/apply').post(applyToJob)
router.route("/get/:id").get(getApplicationById);
router.route("/get").get(getAllApplicationsByApplicantId);
router.route("/delete").delete(deleteJobApplication)
export default router 