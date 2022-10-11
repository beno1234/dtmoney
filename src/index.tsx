import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import {App} from './App';

createServer({
  //banco de dados do mirage (salvar modelos)

  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-16 11:00:00')
        },
      ],
    })
  },

  //rota para retornar as transactions

  //api front end temporaria enqaunto o back end ainda nao fica pronto
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      //retornar todas as transacoes que tenho no banco de dados
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      //transformar esses dados que estou pegando em JS por isso usado o JSON
      const data = JSON.parse(request.requestBody)

      //qual model estou inserindo e os dados que quero passar para esse model
      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


