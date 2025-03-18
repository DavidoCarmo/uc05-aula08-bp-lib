import { Instrutor } from "../shared/model/instrutor.model";
import { InstrutorService } from "./instrutor.service";
import { Request, Response } from "express";

// Controlador para gerenciar as requisições relacionadas aos instrutores.
export class InstrutorController {
  private service: InstrutorService;

  // Inicializa o controlador com o serviço de Instrutor.
  constructor(service: InstrutorService) {
    this.service = service;
  }

  // CRUD - (C)reate: Criar um novo instrutor.
  async createInstrutor(req: Request<{}, {}, Instrutor>, res: Response) {
    try {
      // ENTRADA: Recebe os dados do instrutor no corpo da requisição.
      const instrutor = req.body;
      // PROCESSAMENTO: Cria o instrutor utilizando o serviço.
      const novoInstrutor = await this.service.createInstrutor(instrutor);
      // SAÍDA: Retorna o instrutor recém-criado com status 201 (Criado).
      res.status(201).send(novoInstrutor);
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>createInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (R)etrieve: Buscar todos os instrutores.
  async getInstrutores(_: Request, res: Response) {
    try {
      // PROCESSAMENTO: Busca todos os instrutores usando o serviço.
      const instrutores = await this.service.getAll();
      // SAÍDA: Retorna a lista de instrutores com status 200 (Sucesso).
      res.status(200).send(instrutores);
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>getInstrutores", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (R)etrieve by ID: Buscar um instrutor específico pelo ID.
  async getInstrutorById(req: Request<{ id: string }>, res: Response) {
    try {
      // ENTRADA: Obtém o ID do instrutor nos parâmetros da rota.
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      // Valida se o ID é um número válido.
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // PROCESSAMENTO: Busca o instrutor pelo ID utilizando o serviço.
      const instrutor = await this.service.getById(instrutorId);
      if (!instrutor) {
        res.status(404).send({ error: true, message: "Instrutor não encontrado" });
        return;
      }

      // SAÍDA: Retorna os dados do instrutor com status 200 (Sucesso).
      res.status(200).send(instrutor);
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>getInstrutorById", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (U)pdate: Atualizar parte dos dados de um instrutor.
  async updatePartOfInstrutor(req: Request<{ id: string }, {}, Instrutor>, res: Response) {
    try {
      // ENTRADA: Obtém o ID do instrutor nos parâmetros da rota.
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      // Valida se o ID é um número válido.
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // PROCESSAMENTO: Atualiza os campos parciais do instrutor no serviço.
      const instrutor = req.body;
      await this.service.updateInstrutor(instrutorId, instrutor);

      // Busca os dados atualizados do instrutor.
      const instrutorAtualizado = await this.service.getById(instrutorId);
      // SAÍDA: Retorna os dados atualizados com status 200 (Sucesso).
      res.status(200).send(instrutorAtualizado);
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>updateInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (U)pdate: Atualizar todos os campos de um instrutor.
  async updateAllFieldsInstrutor(req: Request<{ id: string }, {}, Instrutor>, res: Response) {
    try {
      // ENTRADA: Obtém o ID do instrutor nos parâmetros da rota.
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      // Valida se o ID é um número válido.
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // PROCESSAMENTO: Atualiza todos os campos do instrutor no serviço.
      const instrutor = req.body;
      await this.service.updateInstrutor(instrutorId, instrutor);

      // Busca os dados atualizados do instrutor.
      const instrutorAtualizado = await this.service.getById(instrutorId);
      // SAÍDA: Retorna os dados atualizados com status 200 (Sucesso).
      res.status(200).send(instrutorAtualizado);
      console.log(instrutorAtualizado); // Log adicional para auditoria (opcional).
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>updateInstrutor", error);
      res.status(500).send({ error: true, message: error });
    }
  }

  // CRUD - (D)elete: Excluir um instrutor pelo ID.
  async deleteInstrutor(req: Request<{ id: string }, {}, Instrutor>, res: Response) {
    try {
      // ENTRADA: Obtém o ID do instrutor nos parâmetros da rota.
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: true, message: "Informe o ID do instrutor" });
        return;
      }
      // Valida se o ID é um número válido.
      const instrutorId = parseInt(id);
      if (isNaN(instrutorId)) {
        res.status(400).send({ error: true, message: "Informe um ID válido" });
        return;
      }

      // PROCESSAMENTO: Exclui o instrutor no serviço.
      await this.service.deleteInstrutor(instrutorId);
      // SAÍDA: Retorna sucesso com status 200 (Sem Conteúdo).
      res.status(200).send();
    } catch (error) {
      // Imprime o erro para depuração e retorna erro 500 (Erro Interno).
      console.log("Error - InstrutorController>deleteInstrutor", error);
      res.status(500).send({
        error: true,
        message: "Internal Error",
      });
    }
  }
}
