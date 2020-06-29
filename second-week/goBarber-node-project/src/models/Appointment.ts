import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * by adding @Entity we are linking new objects from this class with the database, so when you save an object of
 * appointment type, it also will save it to the database.
 * We also need to link each property from the class to a column in the database by using more decorators
 */
@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid") // indicates that id is an auto-generated Primary Key that looks like an uuid
  id: string;

  @Column() // if I don't pass anything, the column is by default a varchar
  provider: string;

  @Column("time with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
