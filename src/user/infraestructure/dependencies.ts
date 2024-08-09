import { UserRepositoryPrisma } from "./repository.prisma";

import { SignInController } from "./controllers/signin.controller";
import { SignUpController } from "./controllers/signup.controller";
import { UpdateController } from "./controllers/update.controller";
import { UpdatePasswordController } from "./controllers/updatePassword.controller";
import { UpdateParamsController } from "./controllers/updateParams.controller";
import { VerifyTokenController } from "./controllers/verifyToken.controller";

import { signIn } from "../application/use-cases/signin";
import { signUp } from "../application/use-cases/signup";
import { update } from "../application/use-cases/update";
import { updatePassword } from "../application/use-cases/updatePassword";
import { updateParams } from "../application/use-cases/updateParams";
import { VerifyToken } from "../application/use-cases/verifyToken";

import { BcryptUtility } from "./utilities/bycript.utility";
import { JsonWebTokenUtility } from "./utilities/jwt.utility";

const repository = new UserRepositoryPrisma();

const bycriptUtility = new BcryptUtility();

const jwtUtility = new JsonWebTokenUtility();

const signInUseCase = new signIn(repository, bycriptUtility);
export const signInController = new SignInController(signInUseCase);

const signUpUseCase = new signUp(repository, bycriptUtility);
export const signUpController = new SignUpController(signUpUseCase);

const updateUseCase = new update(repository);
export const updateController = new UpdateController(updateUseCase);

const updatePasswordUseCase = new updatePassword(repository, bycriptUtility);
export const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);

const updateParamsUseCase = new updateParams(repository);
export const updateParamsController = new UpdateParamsController(updateParamsUseCase);

const verifyTokenUseCase = new VerifyToken(repository, jwtUtility);
export const verifyTokenController = new VerifyTokenController(verifyTokenUseCase);