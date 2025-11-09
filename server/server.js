import express from 'express';
import cors from 'cors';
import { getPosts, createPost } from './consultas.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Server Activo !!');
});

// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// Ruta POST para crear un nuevo post
app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    const newPost = await createPost(titulo, url, descripcion);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
