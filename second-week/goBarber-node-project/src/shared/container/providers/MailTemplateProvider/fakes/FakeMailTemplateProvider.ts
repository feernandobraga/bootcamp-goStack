// importing the interface so the method can implement it
import IMailTemplateProvider from "../models/IMailTemplateProvider";

// import the dto that contains the type of the arguments the function parse receives
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
