// importing dependency injection decorators
import { injectable, inject } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";

// import interface for using a token repository
import IUserTokensRepository from "../repositories/IUserTokensRepository";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

// interface that tells how the API will send data to the method execute, which is of type Request.
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    // check if the user exists
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("user does not exists.");
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, "Password recover email was received");
  }
}

export default SendForgotPasswordEmailService;
