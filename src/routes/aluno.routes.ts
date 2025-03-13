import express, { Router } from "express";
import { AlunoController } from "../controller/aluno.controller";
import { AlunoRepository } from "../repository/aluno.repository";
import { AlunoService } from "../service/aluno.service";

export class AlunoRoutes {
  private database: any;
  private router: Router;

  private alunoRepository: AlunoRepository;
  private alunoService: AlunoService;
  private alunoController: AlunoController;

  constructor(database: any) {
    this.database = database;
    this.alunoRepository = new AlunoRepository(this.database);
    this.alunoService = new AlunoService(this.alunoRepository);
    this.alunoController = new AlunoController(this.alunoService);
    this.router = express.Router();
    this.configureRoutes();
  }

  // Cria o repositorio, service, controller e rotas do aluno
  configureRoutes(): void {
    this.router.post("/", (req, res) =>
      this.alunoController.createAluno(req, res)
    );
    this.router.get("/", (req, res) =>
      this.alunoController.getAlunos(req, res)
    );
    this.router.get("/:id", (req, res) =>
      this.alunoController.getAlunoById(req, res)
    );
    // this.router.put("/:id", this.alunoController.updateAluno);
    // this.router.delete("/:id", this.alunoController.deleteAluno);
  }

  getRouter(): Router {
    return this.router;
  }
}
