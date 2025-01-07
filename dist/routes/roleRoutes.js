"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("@controllers/rolesController");
const auth_1 = require("@middleware/auth");
const router = (0, express_1.Router)();
//Role ROUTES
router.use(auth_1.verifyToken, auth_1.getPermissions);
router.route("/").get(rolesController_1.findRoles).post(rolesController_1.createRole);
router.route("/:id").get(rolesController_1.findRoleById).put(rolesController_1.updateRole).delete(rolesController_1.deleteRole);
exports.default = router;
// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });
//   return router;
// };
