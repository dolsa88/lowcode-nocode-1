const express = require("express");
const cors = require("cors");
// Inicializacion Firestore Database
//var passwords = require("./cert.json");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();
const app = express();
app.use(cors());
app.use(express.json());
const port = 3002;

const authentication = async (token) => {
  // Me tengo que conectar con firebase y preguntarle si el token que me han pasado es correcto o no es correcto.
  console.log("Metodo autenticacion", token);
  try {
    await auth.verifyIdToken(token);
    console.log("linea 20");
    return true;
  } catch (e) {
    console.log("linea 23");
    return false;
  }

  // SI es correcto devuelvo un true y si no es correcto devuelvo un false
};
// OPERACIONS Create Read Update Delete

// OPERACIONS Create Read Update Delete
app.get("/", (req, res) => res.send("HOla mundo"));

// OPERACIO READ ALL USERS
app.get("/users/:token", async (req, res) => {
  console.log("entra en users");
  // Capturar el token que me envian desde el frontend y filtrarlo por la función de comprobacion
  const token = req.params.token;
  console.log("Recibo en params el token", token);
  const puedePasar = await authentication(token);
  if (!puedePasar) {
    console.log('linea 42')
    return res.status(401).send({ message: "No estás autorizado a entrar" });
  }

  // COnexión con la base de datos para leer todos los usuarios
  const users = await db.collection("usuarios").get();
  const dataUsers = users.docs.map((d) => d.data());
  res.send(dataUsers);
});

// OPERACIO READ ONE USER
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  //Conexión con la base de datos para leer la data de un usuario
  const user = await db.collection("usuarios").doc(id).get();
  res.send(user.data());
});

// OPERACIO CREATE ONE USER
app.post("/user", async (req, res) => {
  const user = req.body;

  // Conexión con la base de datos para enviarle un usuario nuevo
  await db.collection("usuarios").add(user);
  res.send({ result: "success" });
});

// OPERACIO UPDATE ONE USER AMB METODE PUT
app.put("/user/:id", async (req, res) => {
  // Primero tengo que coger la id del usuario que quiero updatear
  const id = req.params.id;

  // Segundo tengo que coger el object json con la data que quiero modificar
  const userToUpdate = req.body;

  // Conexión con la base de datos para updatear ese campo con esa id
  await db.collection("usuarios").doc(id).update(userToUpdate);

  res.send({ result: "success" });
});

// OPERACIO UPDATE ONE USER AMB METODE PATCH
app.patch("/user/:id", async (req, res) => {
  // Primero tengo que coger la id del usuario que quiero updatear
  const id = req.params.id;

  // Segundo tengo que coger el object json con la data que quiero modificar
  const userToUpdate = req.body;

  // Conexión con la base de datos para hacer un patch
  await db.collection("usuarios").doc(id).set(userToUpdate, { merge: true });

  res.send({ result: "success" });
});

// OPERACIO DELETE ONE USER
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;

  // Conexión con la base de datos para eliminar el documento que tiene esa id
  await db.collection("usuarios").doc(id).delete();

  res.send({ result: "success" });
});

app.listen(port, () => {
  console.log(`Desde api.js ${port}`);
});

//module.exports = app;