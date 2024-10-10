import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("Logs")
@Index(["telegramUserId"])
@Index(["id"])
export class Log {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "bigint", nullable: false })
  telegramUserId: number

  @Column({ type: "text", nullable: false })
  command: string

  @Column({ type: "text", nullable: true })
  answer: string

  @Column({type: "timestamp with time zone", nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  datetime: Date
}
