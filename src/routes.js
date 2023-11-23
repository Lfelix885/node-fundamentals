import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const dataBase = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = dataBase.select('users');

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { nome, email } = req.body;

      const user = {
        id: randomUUID(),
        nome,
        email,
      };

      dataBase.insert('users', user);
      return res.writeHead(201).end();
    },
  },
];
