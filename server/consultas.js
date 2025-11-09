import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  allowExitOnIdle: true
});

// Función para obtener todos los posts
export const getPosts = async () => {
  const query = 'SELECT * FROM posts ORDER BY id DESC';
  const { rows } = await pool.query(query);
  return rows;
};

// Función para crear un nuevo post
export const createPost = async (titulo, img, descripcion) => {
  const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *';
  const values = [titulo, img, descripcion];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
