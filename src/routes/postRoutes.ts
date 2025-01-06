import { Router } from "express";

import {
  createPosts,
  deletePosts,
  findPosts,
  findPostsById,
  updatePosts,
} from "@controllers/postsControllers";
import { getPermissions, verifyToken } from "middleware/auth";

const router = Router();

// Posts Routes
router.get("/", findPosts);
router.get("/:id", findPostsById);
router.post("/", verifyToken, getPermissions, createPosts);
router.put("/:id", verifyToken, getPermissions, updatePosts);
router.delete("/:id", verifyToken, getPermissions, deletePosts);

export default router;
