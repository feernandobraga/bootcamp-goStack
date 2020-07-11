import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// importing the user model, so we can create the relationship between appointments and model
import User from "./User";

/**
 * by adding @Entity we are linking new objects from this class with the database, so when you save an object of
 * appointment type, it also will save it to the database.
 * We also need to link each property from the class to a column in the database by using more decorators
 */
@Entity("appointments") // appointments is the name of the table in the database
class Appointment {
  @PrimaryGeneratedColumn("uuid") // indicates that id is an auto-generated Primary Key that looks like an uuid
  id: string;

  @Column() // if I don't pass anything, the column is by default a varchar
  provider_id: string;

  // this decorator takes as parameter a function that returns the model that needs to be used when the provider is called
  /**
   * how to read this:
   * many appointments can be owned by a single user and the column that will contain the user information is the provider_id column
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" }) // this links the column provider_id with the object User that is related to this property (same as Rails)
  provider: User;

  @Column("time with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
