import { Router } from "express";
import {
  getPosts,
  createPost,
  deletePost,
  addComment,
} from "../controllers/posts";
import {
  validatePost,
  validateComment,
  validatePostId,
} from "../middlewares/validators";

const router = Router();

router.get("/", getPosts);
router.post("/", validatePost, createPost);
router.delete("/:id", validatePostId, deletePost);
router.post("/:id/comments", validatePostId, validateComment, addComment);

export default router;
