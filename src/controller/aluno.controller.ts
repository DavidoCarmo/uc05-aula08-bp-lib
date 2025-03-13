import { Aluno } from "../model/aluno";
import { AlunoService } from "../service/aluno.service";
import { Request, Response } from "express";

export class AlunoController {
  private service: AlunoService;

  constructor(service: AlunoService) {
    this.service = service;
  }

  // CRUD - (C)reate
  async createAluno(req: Request<{}, {}, Aluno>, res: Response) {
    try {
      // ENTRADA
      const aluno = req.body;
      // PROCESSAMENTO
      const novoAluno = await this.service.createAluno(aluno);
      // SAÍDA
      res.status(201).send(novoAluno);
    } catch (error) {
      // Imprime o erro
      console.log("Error - AlunoController>createAluno", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (R)etrieve
  async getAlunos(_: Request, res: Response) {
    try {
      // Busca os dados no banco
      const alunos = await this.service.getAll();
      // Retorna os dados
      res.status(200).send(alunos);
    } catch (error) {
      console.log("Error - AlunoController>getAlunos", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  async getAlunoById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do aluno" });
        return;
      }
      const alunoId = parseInt(id);
      if (isNaN(alunoId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // Busca os dados no banco
      const aluno = await this.service.getById(alunoId);
      if (!aluno) {
        res.status(404).send({ error: true, message: "Aluno não encontrado" });
        return;
      }

      // Retorna os dados
      res.status(200).send(aluno);
    } catch (error) {
      console.log("Error - AlunoController>getAlunoById", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // // CRUD - (U)pdate
  // async updateAluno() {
  //   try {
  //     // Usando o scanner, vamos obter os dados do aluno para inserir

  //     // ENTRADA
  //     console.log("A seguir, informe os dados do aluno a ser atualizado: \n");
  //     const id = await this.scanner.questionInt("Informe o id do aluno: ");
  //     if (!id) {
  //       console.log("Informe o ID do aluno");
  //       return;
  //     }

  //     const aluno = await this.inputDataAluno();

  //     // Monta a query de inserção
  //     const statementUpdateAlunos = `
  //       update alunos set
  //         nome = $1,
  //         data_nascimento = $2,
  //         cpf = $3,
  //         telefone = $4,
  //         sexo = $5,
  //         email = $6,
  //         escolaridade = $7,
  //         renda = $8,
  //         pcd = $9
  //       where id = $10
  //     `;

  //     // PROCESSAMENTO

  //     // Insere os dados no banco
  //     // TODO
  //     await database.query(statementUpdateAlunos, [
  //       aluno.nome,
  //       aluno.dataNascimento,
  //       aluno.cpf,
  //       aluno.telefone,
  //       aluno.sexo,
  //       aluno.email,
  //       aluno.escolaridade,
  //       aluno.renda,
  //       aluno.pcd,
  //       id,
  //     ]);

  //     // SAÍDA
  //     // TODO
  //     const alunoAtualizado = await getAlunoById(id);
  //     console.log(alunoAtualizado);
  //   } catch (error) {
  //     // Imprime o erro
  //     console.log(error);
  //   }
  // }

  // async deleteAluno(): Promise<void> {
  //   try {
  //     console.log("A seguir, informe os dados do aluno a ser excluído: \n");
  //     const id = await this.scanner.questionInt("Informe o id do aluno: ");
  //     if (!id) {
  //       console.log("Informe o ID do aluno");
  //       return;
  //     }
  //     // Monta a query de exclusão
  //     const statementDeleteAlunos = `
  //       delete from alunos where id = $1
  //     `;
  //     await database.query(statementDeleteAlunos, [id]);
  //   } catch (error) {
  //     // Imprime o erro
  //     console.log(error);
  //   }
  // }
}
