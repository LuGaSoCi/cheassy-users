import { Router } from "express";
import { signInController, signUpController, updateController, updatePasswordController, updateParamsController, verifyTokenController } from "./dependencies";

const UserRouter = Router();

UserRouter.post("/signup", signUpController.run.bind(signUpController));
UserRouter.post("/signin", signInController.run.bind(signInController));
UserRouter.patch("/update", updateController.run.bind(updateController));
UserRouter.patch("/update-password", updatePasswordController.run.bind(updatePasswordController));
UserRouter.patch("/update-params", updateParamsController.run.bind(updateParamsController));
UserRouter.get("/status", verifyTokenController.run.bind(verifyTokenController));

export default UserRouter;