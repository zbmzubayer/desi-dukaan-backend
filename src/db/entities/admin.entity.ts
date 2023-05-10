import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Admins')
export class Admin {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  @Generated('uuid')
  Uuid: string;

  @Column({ nullable: true })
  Photo: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Phone: string;

  @Column({ nullable: true })
  Address: string;

  @Column()
  Dob: Date;

  @Column()
  Gender: string;

  @Column()
  Password: string;

  @Column({ nullable: true })
  Verified: boolean;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;
}
