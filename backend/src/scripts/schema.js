require('dotenv').config()
const db = require('../db')

async function createSchema() {
  const client = await db.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id          SERIAL PRIMARY KEY,
        nombre      VARCHAR(255) NOT NULL,
        tagline     VARCHAR(255),
        descripcion TEXT,
        precio      NUMERIC(10,2) NOT NULL DEFAULT 0,
        badge       VARCHAR(50),
        linea       VARCHAR(100) NOT NULL,
        tipo_cabello TEXT[],
        destacado   BOOLEAN NOT NULL DEFAULT FALSE,
        es_activo   BOOLEAN NOT NULL DEFAULT TRUE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_productos_linea   ON productos(linea);
      CREATE INDEX IF NOT EXISTS idx_productos_activo  ON productos(es_activo) WHERE es_activo = TRUE;
    `)
    console.log('✓ Schema creado correctamente')
  } finally {
    client.release()
    await db.end()
  }
}

createSchema().catch(err => {
  console.error('Error al crear schema:', err.message)
  process.exit(1)
})
