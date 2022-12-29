import axios from 'axios';

// OBS: a baseURL deverá utilizar o serviço onde está rodando o mobile, no caso atual está usando o localhost/ip da maquina onde o expo está executando + a porta do server
export const api = axios.create({
    baseURL: process.env.HOST
});