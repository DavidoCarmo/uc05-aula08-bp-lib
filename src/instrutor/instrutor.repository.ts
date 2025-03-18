import { Instrutor } from  './instrutor.model';
export class InstrutorRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  // Método para criar um novo instrutor.
  async create(instrutor: Instrutor): Promise<Instrutor> {
    const queryInsertInstrutores = `
      insert into instrutores (nome, data_nascimento, cpf,
        telefone, sexo, email, especialidade, experiencia, ativo)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
    `;

    const result = await this.database.one(queryInsertInstrutores, [
      instrutor.nome,
      instrutor.dataNascimento,
      instrutor.cpf,
      instrutor.telefone,
      instrutor.sexo,
      instrutor.email,
      instrutor.especialidade,
      instrutor.experiencia,
      instrutor.ativo,
    ]);

    return {
      id: result.id,
      ...instrutor,
    };
  }

  // Método para buscar todos os instrutores.
  async getAll(): Promise<Instrutor[]> {
    const result = await this.database.query(
      `select id, nome, data_nascimento, cpf,
           telefone, sexo, email, especialidade,
           experiencia, ativo
       from instrutores`,
      []
    );
    if (result.length === 0) {
      return [];
    }
    return result.map((instrutor: any) => ({
      id: instrutor.id,
      nome: instrutor.nome,
      dataNascimento: instrutor.data_nascimento,
      cpf: instrutor.cpf,
      telefone: instrutor.telefone,
      sexo: instrutor.sexo,
      email: instrutor.email,
      especialidade: instrutor.especialidade,
      experiencia: instrutor.experiencia,
      ativo: instrutor.ativo,
    }));
  }

  // Método para buscar um instrutor pelo ID.
  async getById(id: number): Promise<Instrutor | undefined> {
    const [result] = await this.database.query(
      `select id, nome, data_nascimento, cpf,
           telefone, sexo, email, especialidade,
           experiencia, ativo
       from instrutores
       where id = $1`,
      [id]
    );
    if (!result) return;
    return {
      id,
      nome: result.nome,
      dataNascimento: result.data_nascimento,
      cpf: result.cpf,
      telefone: result.telefone,
      sexo: result.sexo,
      email: result.email,
      especialidade: result.especialidade,
      experiencia: result.experiencia,
      ativo: result.ativo,
    };
  }

  // Método para atualizar todos os dados de um instrutor.
  async updateInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      const statementUpdateInstrutor = `
        update instrutores set
          nome = $1,
          data_nascimento = $2,
          cpf = $3,
          telefone = $4,
          sexo = $5,
          email = $6,
          especialidade = $7,
          experiencia = $8,
          ativo = $9
        where id = $10
      `;
      await this.database.query(statementUpdateInstrutor, [
        instrutor.nome,
        instrutor.dataNascimento,
        instrutor.cpf,
        instrutor.telefone,
        instrutor.sexo,
        instrutor.email,
        instrutor.especialidade,
        instrutor.experiencia,
        instrutor.ativo,
        id,
      ]);
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar parcialmente os dados de um instrutor.
  async updatePartOfInstrutor(id: number, instrutor: Instrutor): Promise<void> {
    try {
      const saved = await this.getById(id);
      if (!saved) {
        throw new Error("Instrutor não encontrado");
      }

      let instrutorParams: Instrutor = {} as Instrutor;

      // Atualização condicional para cada campo.
      instrutorParams.nome = saved.nome !== instrutor.nome ? instrutor.nome : saved.nome;
      instrutorParams.dataNascimento = saved.dataNascimento !== instrutor.dataNascimento
        ? instrutor.dataNascimento
        : saved.dataNascimento;
      instrutorParams.cpf = saved.cpf !== instrutor.cpf ? instrutor.cpf : saved.cpf;
      instrutorParams.telefone = saved.telefone !== instrutor.telefone ? instrutor.telefone : saved.telefone;
      instrutorParams.sexo = saved.sexo !== instrutor.sexo ? instrutor.sexo : saved.sexo;
      instrutorParams.email = saved.email !== instrutor.email ? instrutor.email : saved.email;
      instrutorParams.especialidade = saved.especialidade !== instrutor.especialidade
        ? instrutor.especialidade
        : saved.especialidade;
      instrutorParams.experiencia = saved.experiencia !== instrutor.experiencia
        ? instrutor.experiencia
        : saved.experiencia;
      instrutorParams.ativo = saved.ativo !== instrutor.ativo ? instrutor.ativo : saved.ativo;

      await this.updateInstrutor(id, instrutorParams);
    } catch (error) {
      throw error;
    }
  }

  // Método para excluir um instrutor.
  async delete(id: number) {
    const instrutor = await this.getById(id);

    if (!instrutor) {
      throw new Error("Instrutor não encontrado");
    }

    const statementDeleteInstrutores = `delete from instrutores where id = $1`;
    await this.database.query(statementDeleteInstrutores, [id]);
  }
}
