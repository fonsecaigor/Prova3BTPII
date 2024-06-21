import mongoose, { Schema, Document } from 'mongoose';

interface Patente extends Document {
  codigo: number;
  descricao: string;
}

const PatenteSchema: Schema = new Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true,
    min: [1, 'Código deve ser maior que 0'],
    max: [20, 'Código deve ser menor ou igual a 20']
  },
  descricao: {
    type: String,
    required: true,
    maxlength: 30
  }
});

const Patente = mongoose.model<Patente>('Patente', PatenteSchema);

export default Patente;
export { Patente };
