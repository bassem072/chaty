import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../../controllers/dashboard/user.controller.js";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../../utils/validation/dashboard/user.validator.js";

const usersRouter = Router();

usersRouter.route("/").get(index).post(createUserValidator, create);

usersRouter
  .route("/:id")
  .get(getUserValidator, show)
  .put(updateUserValidator, update)
  .delete(deleteUserValidator, destroy);

export default usersRouter;
