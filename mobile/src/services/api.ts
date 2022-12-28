import axios from 'axios';

// OBS: a baseURL deverá utilizar o serviço onde está rodando o mobile, no caso atual está usando o localhost/ip da maquina
export const api = axios.create({
    baseURL: 'http://localhost:3333'
});