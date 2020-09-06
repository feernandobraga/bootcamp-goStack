"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterProviderFieldToProviderId1593418038788 = void 0;

var _typeorm = require("typeorm");

class AlterProviderFieldToProviderId1593418038788 {
  async up(queryRunner) {
    // here we will alter a column, so first we need to delete the column and then re-add it
    await queryRunner.dropColumn("appointments", "provider"); // we use addColumn() and we pass the table where we want to add the column and then the information for the column

    await queryRunner.addColumn("appointments", new _typeorm.TableColumn({
      name: "provider_id",
      type: "uuid",
      isNullable: true
    }));
    /**
     * This creates the foreign key/relationship between appointments and user
     */

    await queryRunner.createForeignKey("appointments", new _typeorm.TableForeignKey({
      name: "AppointmentProvider",
      columnNames: ["provider_id"],
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
    await queryRunner.dropColumn("appointments", "provider_id");
    await queryRunner.addColumn("appointments", new _typeorm.TableColumn({
      name: "provider",
      type: "varchar",
      isNullable: false
    }));
  }

}

exports.AlterProviderFieldToProviderId1593418038788 = AlterProviderFieldToProviderId1593418038788;