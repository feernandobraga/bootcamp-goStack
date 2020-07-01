import User from "../models/User";

// this is the genericRepository with all standard methods()
import { getRepository } from "typeorm";

import { hash } from "bcryptjs";

// import our custom error handling class
import AppError from "../errors/AppError";

// interface that tells how the API will send data to the method execute, which is of type Request.
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // this is an asynchronous method that returns a promise of a type User, because we want to return a user
  public async execute({ name, email, password }: Request): Promise<User> {
    // this will allow for calling all generic Repository methods. i.e. userRepository.save(newUser)
    const usersRepository = getRepository(User);

    // select * from Users where email = given email passed through to execute()
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email address already used");
    }

    /**
     * The hash function takes 2 parameters:
     * 1. the password to be hashed
     * 2. a specific salt as a string, or the number of characters for a random generated salt
     */
    const hashedPassword = await hash(password, 8);

    // instantiates a new user but doesn't yet saves it to the database
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // saves the user to the database
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
