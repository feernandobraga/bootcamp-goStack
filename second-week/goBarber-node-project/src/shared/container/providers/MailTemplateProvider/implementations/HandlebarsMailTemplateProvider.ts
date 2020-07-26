// importing the interface so the method can implement it
import IMailTemplateProvider from "../models/IMailTemplateProvider";

// import the dto that contains the type of the arguments the function parse receives
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

// importing the handlebars, which is the service that will handle the templates
import handlebars from "handlebars";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
