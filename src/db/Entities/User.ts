import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  /**
   * For the purposes of this example
   * I am leaving the id as auto-incremented value
   * but this is considerate not secure and
   * we should switch to "uuid" string
   * if we want to go live
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'text', nullable: false })
  firstName: string

  @Column({ type: 'text', nullable: false })
  lastName: string
}
