import mongoose, { Schema, Document } from 'mongoose';

const validDDDs = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^[0-9]{10,11}$/;

interface Militar extends Document {
  nome: string;
  idade: number;
  email: string;
  fone: string;
}

const MilitarSchema: Schema = new Schema({
  nome: { type: String, required: true, maxlength: 50 },
  idade: { type: Number, required: true, min: 18, max: 999 },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: function (v: string) {
        return emailRegex.test(v) && (v.includes('@eb.mil.br') || v.includes('@marinha.mil.br') || v.includes('@fab.mil.br'));
      },
      message: (props: any) => `${props.value} não é um e-mail válido`
    }
  },
  fone: {
    type: String,
    required: true,
    maxlength: 11,
    validate: {
      validator: function (v: string) {
        if (!phoneRegex.test(v)) {
          return false;
        }
        const ddd = parseInt(v.substring(0, 2));
        return validDDDs.includes(ddd);
      },
      message: (props: any) => `${props.value} não é um telefone válido!`
    }
  }
});

const Militar = mongoose.model<Militar>('Militar', MilitarSchema);

export default Militar;
export { Militar };
