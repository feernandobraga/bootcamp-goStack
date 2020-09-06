"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import the container for dependency injection
// importing the service used to create appointments
class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params; // get the provider id from the URL

    const {
      month,
      year
    } = request.query; // gets the information from the API call
    // instantiate a new Service via dependency injection. It automatically passes the controller associated with it

    const listProviderMonthAvailabilityService = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    }); // returns the newly created providers

    return response.json(availability);
  }

}

exports.default = ProviderMonthAvailabilityController;