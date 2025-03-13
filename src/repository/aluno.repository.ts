import { Aluno } from "../model/aluno";

export class AlunoRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async createAluno(aluno: Aluno): Promise<Aluno> {
    const queryInsertAlunos = `
      insert into alunos (nome, data_nascimento, cpf,
        telefone, sexo, email, escolaridade, renda, pcd)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
    `;

    const result = await this.database.one(queryInsertAlunos, [
      aluno.nome,
      aluno.dataNascimento,
      aluno.cpf,
      aluno.telefone,
      aluno.sexo,
      aluno.email,
      aluno.escolaridade,
      aluno.renda,
      aluno.pcd,
    ]);

    return {
      id: result.id,
      ...aluno,
    };
  }

  async getAll(): Promise<Aluno[]> {
    const result = await this.database.query(
      `select nome, data_nascimento, cpf,
           telefone, sexo, email, escolaridade,
           renda, pcd
       from alunos`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((aluno: any) => ({
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: aluno.data_nascimento,
      cpf: aluno.cpf,
      telefone: aluno.telefone,
      sexo: aluno.sexo,
      email: aluno.email,
      escolaridade: aluno.escolaridade,
      renda: aluno.renda,
      pcd: aluno.pcd,
    }));
  }

  async getById(id: number): Promise<Aluno | undefined> {
    const result = await this.database.one(
      `select nome, data_nascimento, cpf,
           telefone, sexo, email, escolaridade,
           renda, pcd
       from alunos
       where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id: result.id,
      nome: result.nome,
      dataNascimento: result.data_nascimento,
      cpf: result.cpf,
      telefone: result.telefone,
      sexo: result.sexo,
      email: result.email,
      escolaridade: result.escolaridade,
      renda: result.renda,
      pcd: result.pcd,
    };
  }
}
