// scripts/seedUsuarios.js
const bcrypt = require("bcryptjs");
const db = require('../src/config/db'); 

const usuarios = [
  {
    nombre: "Admin",
    email: "admin@correo.com",
    password: "admin123",
    rol: "admin",
  },
  {
    nombre: "Luis Torres",
    email: "t1@correo.com",
    password: "trabajador123",
    rol: "trabajador",
  },
  {
    nombre: "Maria Gómez",
    email: "t2@correo.com",
    password: "trabajador456",
    rol: "trabajador",
  },
  {
    nombre: "Jorge Díaz",
    email: "t3@correo.com",
    password: "trabajador789",
    rol: "trabajador",
  },
];

async function seed() {
  for (const user of usuarios) {
    const hashed = await bcrypt.hash(user.password, 10);
    console.log("Conectado a la base de datos:", process.env.PGDATABASE);

    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      [user.nombre, user.email, hashed, user.rol]
    );
    console.log(`✅ Usuario creado o existente: ${user.email}`);
  }

  console.log("✅ Seed completo");
  process.exit();
}

seed().catch((err) => {
  console.error("❌ Error al hacer seed:", err);
  process.exit(1);
});
