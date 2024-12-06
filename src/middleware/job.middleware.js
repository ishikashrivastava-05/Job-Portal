import Jobs from "../models/jobs.model.js";
import ErrorHandle from "../utils/ErrorHandle.js";
import Handleres from "../utils/Handleres.js";

const checkJobExistence = async (req, res, next) => {
    try {
        const job_Id = req.params.id;
        const job = await Jobs.findById(job_Id);

        if (!job) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Job not found!")
            );
        }

        req.job = job;
        next();
    } catch (error) {
        return res
        .status(500)
        .json(
            new HandleError(500, "Internal Server Error")
        );
    }
};

export default checkJobExistence;