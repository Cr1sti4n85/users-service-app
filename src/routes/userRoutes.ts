import { Response, Router } from "express";

const router = Router();

router.get("/health", (_req, res: Response) => {
  res.status(200).json({
    ok: true,
    message: "Api is ok",
  });

  return;
});

export default router;

// export default () => {
//   router.get("/health", (_req, res) => {
//     res.send("Api is ok");
//   });

//   return router;
// };
