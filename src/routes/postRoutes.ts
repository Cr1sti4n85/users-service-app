import { Router } from "express";

import {
  createPosts,
  deletePosts,
  findPosts,
  findPostsById,
  updatePosts,
} from "@controllers/postsControllers";
import { verifyToken } from "middleware/auth";

const router = Router();

// Posts Routes
router.get("/", findPosts);
router.get("/:id", findPostsById);
router.post("/", verifyToken, createPosts);
router.put("/:id", verifyToken, updatePosts);
router.delete("/:id", verifyToken, deletePosts);

export default router;
