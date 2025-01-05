import { Router } from "express";
const router = Router();
import {
  getAllLearners,
  getLearnerById,
  loginLearner,
  createLearners,
  updateLearner,
  deleteLearner,
} from "../controllers/learnerController";

// GET /learners/:id
router.get("/:id", getLearnerById);

// GET /learners
router.get("/", getAllLearners);

// POST /learners/register
router.post("/api/learner/register", createLearners);

// POST /learners/login
router.post("/api/learner/login", loginLearner);

// PUT /learners/:id/update
router.put("/:id/update", updateLearner);

// DELETE /learners/:id/delete
router.delete("/:id/delete", deleteLearner);

// // PUT /learners/:id/follow
// router.put("/:id/follow", followLearner);

// // PUT /learners/:id/unfollow
// router.put("/:id/unfollow", unfollowLearner);

export default router;
