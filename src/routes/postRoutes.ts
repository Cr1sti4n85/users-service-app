import { Router } from "express";

import {
  createPosts,
  deletePosts,
  findPosts,
  findPostsById,
  updatePosts,
} from "@controllers/postsControllers";

const router = Router();

// Posts Routes
router.get("/posts", findPosts);
router.get("/posts/:id", findPostsById);
router.post("/posts", createPosts);
router.put("/posts/:id", updatePosts);
router.delete("/posts/:id", deletePosts);
