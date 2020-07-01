import { Router, response } from "express";

import CreateUserService from "../services/CreateUserService";

// we need to import the ensureAuthenticated middleware to make sure a user can only update the avatar if he/she is Authenticated
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

// import multer to handle the avatar
import multer from "multer";

//import the upload configuration file
import uploadConfig from "../config/upload";

// import AvatarService
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();

// we will use this variable to handle the upload file
const upload = multer(uploadConfig);

/**
 * POST to localhost:3333/users
 * since this will save data to the database, it may take a while, and therefore, we need to handle asynchronous data.
 * We do that by making it an async method and using await in the execute() method.
 */
usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  // we can delete the user password from the response, so it doesn't show back to the user/API request
  delete user.password;

  return response.json(user);
});

/**
 * PATCH to localhost:3333/users/avatar
 * Route to update the user with an avatar image.
 * We use PATCH when we need to update just a single piece of information about the entity
 * We use PUT when we update the entire entity
 * The route also takes the middleware to ensure the user must be authenticated before updating the avatar
 * It also takes a SECOND middleware (upload.single('avatar')) that will handle the file that is passed
 * The method .single() takes as a parameter the name of the field that will contain the image when the route is called
 */
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    /**
     * the method execute is passing the user_id for the logged user and the filename generated through the middleware upload.singe('avatar')
     * we can only retrieve the user_id from the request, because if you remember, we appended the type user inside the Request.
     * More on that you can find it in your notes about Route Guard - Advanced Routing
     */
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
