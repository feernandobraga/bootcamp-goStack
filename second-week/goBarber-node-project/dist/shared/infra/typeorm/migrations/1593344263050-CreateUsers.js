"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1593344263050 = void 0;

var _typeorm = require("typeorm");

class CreateUsers1593344263050 {
  async up(queryRunner) {
    /**
     * Here we are creating a table users with 3 columns:
     * 1. column id of type varchar that is the primary key and uses uuid
     * 2. column provider of type varchar that can't be null
     * 3. column date of type timestamp with time zone (postgre exclusive) and can't be null
     */
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar",
        isNullable: false
      }, {
        name: "email",
        type: "varchar",
        isNullable: false,
        isUnique: true
      }, {
        name: "password",
        type: "varchar",
        isNullable: false
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    // method that drops the table
    await queryRunner.dropTable("users");
  }

}

exports.CreateUsers1593344263050 = CreateUsers1593344263050;