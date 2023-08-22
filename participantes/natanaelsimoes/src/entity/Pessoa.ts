import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column('text', { nullable: false })
    search: string

  @BeforeInsert()
  @BeforeUpdate()
  beforeSave (): void {
    this.search = `${this.apelido} ${this.nome} ${this.stack?.join(' ') ?? ''}`
      .toLocaleLowerCase()
  }
}
