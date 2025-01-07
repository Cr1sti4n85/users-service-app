"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("@controllers/userControllers");
const auth_1 = require("@middleware/auth");
const roles_1 = require("@middleware/roles");
const router = (0, express_1.Router)();
//USER ROUTES
router.use(auth_1.verifyToken, auth_1.getPermissions);
router.route("/").get(userControllers_1.findUsers).post(roles_1.checkRoles, userControllers_1.createUser);
router.route("/:id").get(userControllers_1.findUsersById).put(userControllers_1.updateUser).delete(userControllers_1.deleteUser);
exports.default = router;
// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });
//   return router;
// };
