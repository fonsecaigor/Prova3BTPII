import { Request, Response } from 'express';
import Soldado from '../models/soldado';
import Militar from '../models/militar';

class SoldadoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cim, altura, militar } = req.body;
    try {
      const militarExists = await Militar.findById(militar);
      if (!militarExists) {
        return res.status(404).json({ message: 'Militar inexistente' });
      }
      const document = new Soldado({ cim, altura, militar });
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const documents = await Soldado.find().sort({ cim: 'asc' }).populate('militar');
      return res.json(documents);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const document = await Soldado.findByIdAndDelete(id);
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
    const { id, cim, altura, militar } = req.body;
    try {
      const document = await Soldado.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Soldado inexistente' });
      }
      if (militar) {
        const militarExists = await Militar.findById(militar);
        if (!militarExists) {
          return res.status(404).json({ message: 'Militar inexistente' });
        }
        document.militar = militar;
      }
      document.cim = cim;
      document.altura = altura;
      const response = await document.save();
      return res.json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new SoldadoController();
