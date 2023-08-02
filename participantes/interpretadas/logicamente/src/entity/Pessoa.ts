import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'pessoas' })
export class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ nullable: false, length: 32 })
  @Index({ unique: true })
    apelido: string

  @Column({ nullable: false, length: 100 })
    nome: string

  @Column('date', { nullable: false })
    nascimento: Date

  @Column('simple-array', { nullable: true })
    stack?: string[]
}
