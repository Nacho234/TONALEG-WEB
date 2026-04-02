const express = require('express')
const router = express.Router()
const db = require('../db')

// GET /api/productos
router.get('/', async (req, res) => {
  try {
    const { linea, search } = req.query
    let query = 'SELECT * FROM productos WHERE es_activo = TRUE'
    const params = []

    if (linea) {
      params.push(linea)
      query += ` AND linea = $${params.length}`
    }

    if (search) {
      params.push(`%${search}%`)
      query += ` AND (nombre ILIKE $${params.length} OR descripcion ILIKE $${params.length})`
    }

    query += ' ORDER BY linea, nombre'

    const result = await db.query(query, params)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

// GET /api/productos/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM productos WHERE id = $1 AND es_activo = TRUE',
      [req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener producto' })
  }
})

module.exports = router
