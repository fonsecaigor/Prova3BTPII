import { Request, Response } from 'express';
import Militar from '../models/militar';

class MilitarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, idade, email, fone } = req.body;
    try {
      const document = new Militar({ nome, idade, email, fone });
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const documents = await Militar.find().sort({ nome: 1 }); // Ordena por nome em ordem alfabética ascendente (1 para ascendente, -1 para descendente)
      return res.json(documents);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }  

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const document = await Militar.findByIdAndDelete(id);
      if (document) {
        return res.json({ message: 'Registro excluído com sucesso' });
      } else {
        return res.status(404).json({ message: 'Registro inexistente' });
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, nome, idade, email, fone } = req.body;
    try {
      const document = await Militar.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Militar inexistente' });
      }
      document.nome = nome;
      document.idade = idade;
      document.email = email;
      document.fone = fone;
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new MilitarController();
