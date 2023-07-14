const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();

// Configuração do banco de dados
const sequelize = new Sequelize('crossfit', 'aluno', 'ifpe2023', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definição do modelo de dados
const Serie = sequelize.define('Serie', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Configuração do Handlebars como a engine de visualização
app.engine(
  'handlebars',
  exphbs.engine({ extname: '.handlebars', defaultLayout: 'home' })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração do Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sincronização do banco de dados e criação dos registros
sequelize.sync().then(async () => {
  try {
    await Serie.bulkCreate([
      { nome: 'BANDS', descricao: 'Faixa elástica' },
      { nome: 'ATG', descricao: 'Ass to grass' },
      { nome: 'BS', descricao: 'Barra nas costas' },
      { nome: 'BUMPER', descricao: 'Levantamento de peso' },
      { nome: 'BOX', descricao: 'Luta de box' },
      { nome: 'COMPLEX', descricao: 'Série contínua' },
      { nome: 'COACH', descricao: 'Planejamento de série' },
      { nome: 'KIPPING', descricao: 'Força gerada pelo quadril' },
    ]);

    console.log('Registros criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar registros:', error);
  }
});

// Rota da página inicial (home)
app.get('/', (req, res) => {
  res.render('home');
});

// Rota para lidar com a pesquisa e exibir os resultados
app.get('/serie', async (req, res) => {
  const nome = req.query.nome;

  try {
    const series = await Serie.findAll({
      where: {
        nome: nome,
      },
    });

    res.render('serie', { series, pesquisa: nome });
  } catch (error) {
    console.error('Erro ao consultar séries:', error);
    res.status(500).send('Erro ao consultar séries');
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
