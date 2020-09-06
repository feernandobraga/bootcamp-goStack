"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import the container for dependency injection
// importing the service used to create appointments
class ProviderDayAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params; // get the provider id from the URL

    const {
      month,
      day,
      year
    } = request.query; // gets the information from the URL
    // instantiate a new Service via dependency injection. It automatically passes the repository associated with it

    const listProviderDayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    }); // returns the newly created providers

    return response.json(availability);
  }

}

exports.default = ProviderDayAvailabilityController;