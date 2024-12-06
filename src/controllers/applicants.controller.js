import ErrorHandle from "../utils/ErrorHandle.js"
import Handleres from '../utils/Handleres.js'
import mongoose from "mongoose"
import uploadOnCloudinary from "../utils/cloudinary.js"
import Applicant from "../models/applicants.model.js"
import Jobs from "../models/jobs.model.js"
import { application } from "express"


const applyToJob = async (req, res) => {
  
  const { job_id } = req.body; 
  if (!job_id) {
      return res.status(400).json(new ErrorHandle(400, "Job ID is required"));
  }

 
  if (!req.jobseeker || !req.jobseeker.id) {
      return res.status(400).json(new ErrorHandle(400, "Applicant ID is required"));
  }
 

  const jobDoc = await Jobs.findById(job_id);
  if (!jobDoc) {
      return res.status(400).json(new ErrorHandle(400, "Invalid job ID"));
  }
  const existingApplication = await Applicant.findOne({ applicant_id:req.jobseeker._id, job_id });
  
 if(existingApplication){
    return res
    .status(409)
    .json(
        new HandleError(409, "You have already applied for this job!")
    );
 }
  const jobApplication = await Applicant.create({
      applicant_name: req.jobseeker?.name,
      applicant_id: req.jobseeker._id,
      phone_no: req.jobseeker.phone_no,
      email: req.jobseeker.email, 
      resume: req.jobseeker.resume, 
      job_id,
  });
  console.log(jobApplication)

  return res.status(200).json(new Handleres(200, "Job application submitted successfully"));
};
const deleteJobApplication = async(req,res)=>{
const {applicant_id}=req.params
const applicationDoc = await Applicant.findById(applicant_id);
    if (!applicationDoc) {
        return res.status(40).json(new ErrorHandle(400, "Application not found"));
    }
    await Applicant.findByIdAndDelete(applicant_id);
    return res.status(200).json(new Handleres(200,"delete"))
}


const getAllApplicationsByApplicantId = async (req, res) => {
  const applications = await Applicant.find()
  if (!applications || applications.length === 0) {
    return res.status(400).json(new ErrorHandle(400, "No applications found for this applicant"));
}
return res.status(200).json({
  success: true,
  data: applications
});
}

const getApplicationById= async(req,res)=>{
    try {
        const { id } = req.params;
        const applications = await Applicant.findById(id);

        if (!applications) {
            return res
                .status(400)
                .json(
                    new HandleError(400, "Application not found!")
                );
        }

        return res
            .status(200)
            .json(
                new HandleResponse(200, application, "Application fetched successfully!")
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new HandleError(500, error.message)
            );
    }
}
export {
    applyToJob,deleteJobApplication,getAllApplicationsByApplicantId, getApplicationById
}