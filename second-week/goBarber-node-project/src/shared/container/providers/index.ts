import { container } from "tsyringe";

import mailConfig from "@config/mail";

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

// configuring dependency injection for the mail provider
// we always link an interface to a provider or repository
import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "./MailProvider/implementations/SESMailProvider";

// configuring dependency injection for the mail template provider
// we always link an interface to a provider or repository
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorageProvider);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

//this one is different just to make sure it executes the constructor of this class
container.registerInstance<IMailProvider>(
  "MailProvider",
  mailConfig.driver === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
);
