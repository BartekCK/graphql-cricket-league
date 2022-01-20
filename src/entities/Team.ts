import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", name: 'team_name' })
  teamName: string;

  @Column({ type: "text", name: 'team_code' })
  teamCode: string;
}
