"use strict";

var _typeorm = require("typeorm");

// the create connection method searches for the ormconfig.json file to connect to the database
(0, _typeorm.createConnections)();