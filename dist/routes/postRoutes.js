"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsControllers_1 = require("@controllers/postsControllers");
const auth_1 = require("@middleware/auth");
const router = (0, express_1.Router)();
// Posts Routes
router.get("/", postsControllers_1.findPosts);
router.get("/:id", postsControllers_1.findPostsById);
router.post("/", auth_1.verifyToken, auth_1.getPermissions, postsControllers_1.createPosts);
router.put("/:id", auth_1.verifyToken, auth_1.getPermissions, postsControllers_1.updatePosts);
router.delete("/:id", auth_1.verifyToken, auth_1.getPermissions, postsControllers_1.deletePosts);
exports.default = router;
