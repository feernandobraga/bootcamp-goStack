// importing the generic repository
import { getRepository } from "typeorm";

import path from "path";

// we import the upload config file so we can get what is the directory where the images are being saved
import uploadConfig from "../config/upload";

// library to handle file system
import fs from "fs";

// import our custom error handling class
import AppError from "../errors/AppError";

import User from "../models/User";

// the method execute will receive the user_id and the filename.
// the filename comes from the multer middleware that we used in the routes
interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // check if the given user id is really a valid user_id
    // select user from users where the user.id = user_id passed to execute
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only Authenticated users can change avatar.", 401);
    }

    // if the avatar already exists, delete previous avatar from the storage
    if (user.avatar) {
      // stores in a variable the upload default path + the filepath stored in the database to the user avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // this method will retrieve the stats of a file, but only if it exists. So we use this to config the file exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // if the file exists, we delete it from the storage
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // since we already loaded the user at the beginning of this file, we can just update the avatar and save it to the DB
    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
