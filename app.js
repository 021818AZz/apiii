const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rota inicial para mostrar que a API está funcionando
app.get('/', (req, res) => {
  res.send('🎉 API da SEABOARD está ativa e funcionando!');
});

// Listar todos usuários
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar um usuário pelo ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, telefone, saldo } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (nome, telefone, saldo) VALUES ($1, $2, $3) RETURNING *',
      [nome, telefone, saldo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, saldo } = req.body;
    const result = await pool.query(
      'UPDATE usuarios SET nome = $1, telefone = $2, saldo = $3 WHERE id = $4 RETURNING *',
      [nome, telefone, saldo, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ message: 'Usuário deletado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
