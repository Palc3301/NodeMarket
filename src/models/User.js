const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function validateCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  const allDigitsAreEqual = /^(\d)\1+$/.test(cpf);
  if (allDigitsAreEqual) {
    return false;
  }

  // Calcula os dígitos verificadores
  let sum = 0;
  let remainder = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validateCPF(value);
      },
      message: 'CPF inválido',
    },
  },
  age: { type: Number },
  // Outros campos relevantes podem ser adicionados aqui
});

module.exports = mongoose.model('User', userSchema);
