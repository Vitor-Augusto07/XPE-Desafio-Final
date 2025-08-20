const app = require('./app');
const sequelize = require('./db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync(); // cria as tabelas se não existirem
    console.log('Banco de dados sincronizado!');
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao sincronizar DB:', err);
  }
})();
