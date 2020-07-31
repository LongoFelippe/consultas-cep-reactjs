import axios from 'axios';

const URL = 'https://viacep.com.br/ws/';
const PREFIX = 'json';

export function findCepByNumber(numeroCep) {
  return axios.get(`${URL}/${numeroCep}/${PREFIX}`);
}
