"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddUserIdToAppointments1595910524323 {
  async up(queryRunner) {
    // we use addColumn() and we pass the table where we want to add the column and then the information for the column
    await queryRunner.addColumn("appointments", new _typeorm.TableColumn({
      name: "user_id",
      type: "uuid",
      isNullable: true
    }));
    /**
     * This creates the foreign key/relationship between appointments and user
     */

    await queryRunner.createForeignKey("appointments", new _typeorm.TableForeignKey({
      name: "AppointmentUser",
      columnNames: ["user_id"],
      // the column inside appointments that will  hold the foreign key
      referencedColumnNames: ["id"],
      // the column inside the foreign table that has the unique identifier
      referencedTableName: "users",
      // the name of the table that this reference links to
      onDelete: "SET NULL",
      // upon user deletion, set the provider_id as null
      onUpdate: "CASCADE" // in case the user ID changed, it updates it also in the relationships

    }));
  }

  async down(queryRunner) {
    /**
     * Now we need to undo everything we did in the up() method, including the foreign key relationship
     * We start by deleting the foreign key and they we delete the column.
     * Lastly, we have to re-create the column as it was before
     */
    await queryRunner.dropForeignKey("appointments", "AppointmentProvider");
    await queryRunner.dropColumn("appointments", "user_id");
  }

}

exports.default = AddUserIdToAppointments1595910524323;