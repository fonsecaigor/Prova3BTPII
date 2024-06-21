import { Request, Response } from 'express';
import Patente from '../models/patente';

class PatenteController {
  
  public async create(req: Request, res: Response): Promise<Response> {
    const { codigo, descricao } = req.body;
    try {
      const document = new Patente({ codigo, descricao });
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

 public async list(req: Request, res: Response): Promise<Response> {
    try {
      const documents = await Patente.find().sort({ descricao: 'asc' });
      return res.json(documents);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const document = await Patente.findByIdAndDelete(id);
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
    const { id, codigo, descricao } = req.body;
    try {
      const document = await Patente.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Patente inexistente' });
      }
      document.codigo = codigo;
      document.descricao = descricao;
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new PatenteController();
