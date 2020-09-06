"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the interface so the method can implement it
// import the dto that contains the type of the arguments the function parse receives
// importing the handlebars, which is the service that will handle the templates
// fs to handle the template file
class HandlebarsMailTemplateProvider {
  async parse({
    file,
    variables
  }) {
    const templateFileContent = await _fs.default.promises.readFile(file, {
      encoding: "utf-8"
    });

    const parseTemplate = _handlebars.default.compile(templateFileContent);

    return parseTemplate(variables);
  }

}

var _default = HandlebarsMailTemplateProvider;
exports.default = _default;