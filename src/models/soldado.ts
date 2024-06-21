import mongoose, { Schema, Document } from 'mongoose';
import { Militar } from './militar';

interface Soldado extends Document {
  cim: number;
  altura: number;
  militar: Militar['_id'];
}

const SoldadoSchema: Schema = new Schema({
  cim: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: (props: any) => `${props.value} não pode ser nulo!`
    }
  },
  altura: {
    type: Number,
    required: true,
    min: [1.62, 'Altura deve ser maior ou igual a 1.62m']
  },
  militar: {
    type: Schema.Types.ObjectId,
    ref: 'Militar',
    required: true,
    validate: {
      validator: async function (v: mongoose.Types.ObjectId) {
        const militarExists = await mongoose.models.Militar.findById(v);
        return militarExists != null;
      },
      message: (props: any) => `Militar com ID ${props.value} não existe!`
    }
  }
});

const Soldado = mongoose.model<Soldado>('Soldado', SoldadoSchema);

export default Soldado;
export { Soldado };
