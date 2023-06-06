import express from "express";
import {
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
} from "../controllers/postsControllers.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
