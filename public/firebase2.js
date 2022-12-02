// Librerias de firebase que se encargan de conectarme con la API de Autenticacion de Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Archivo de configuración de firebase con mis credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDZHR2iFUpIUF_Ojn73RAj6xBTGBs_jytg",
  authDomain: "eliminarlo2.firebaseapp.com",
  projectId: "eliminarlo2",
  storageBucket: "eliminarlo2.appspot.com",
  messagingSenderId: "347973977710",
  appId: "1:347973977710:web:f55cf297019b3b4cba487f",
  measurementId: "G-9CBE4J8EBV",
};

// Inicio los módulos de Firebase passandole como parámetro las credenciales definidas en firebaseConfig.
const app = initializeApp(firebaseConfig);

// Inicialitzo el módul de auth
const auth = getAuth(app);

// Método para crear un usuario nuevo

const crearUsuarioNuevo = async (email, password) => {
  const prueba = await createUserWithEmailAndPassword(auth, email, password);
};

// Método para loguear a un usuario
const loguearUsuario = async (email, password) => {
  // REcibo mail y password como parámetros y se los paso al método signIn de Firebase auth
  console.log("loguear usuario", email, password);
  const usuario = await signInWithEmailAndPassword(auth, email, password);
  console.log("usuario", usuario);

  // Accedo al token que esta en la propiedad token de la propiedad user
  token = usuario.user.accessToken;

  // Si hay token es que me he podido loguear correctamente
  console.log("token USUARIO EXITOSAMENTE LOGUEADO", token);
  cargarTodo(token);
};

const cargarTodo = (token) => {
  const local = require("./version.json").local;
  var url;
  if (local) {
    url = "http://localhost:3002/users";
  } else {
    url = "https://us-central1-eliminarlo2.cloudfunctions.net/api";
  }
  fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Recibo la data del backend con el array de usuarios o un error en caso de que no este autorizado a entrar
      console.log("data", data);
      if (data.message) {
        // SI la data porta una propietat message afegida vol dir que no estaba autoritzat i mostro un alert amb el missatge
        alert(data.message);
        // A mes, retorno false perque no vull que pugui continuar
        return false;
      } else {
        // Altrament retorno la data
        return data;
      }
    })
    .then((users) => {
      // Monto el HTML, añado el titulo y los usuarios a la lista
      addTitle();
      addList(users);
    });

  // La función addTitle añade el titulo
  function addTitle() {
    // Creo un DIV element
    const newDiv = document.createElement("div");

    // Le pongo un título
    const newContent = document.createTextNode("Listado de Usuarios");
    newDiv.appendChild(newContent);

    // Lo inserto al DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
  }

  // Esta función añade el listado de usuarios
  function addList(users) {
    // Creo un elemento UL
    const ul = document.createElement("ul");

    // Itero sobre cada usuario
    users.forEach((user) => {
      // En cada usuario creo un elemento LI y le añado el nombre
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(user.nombre));

      // Añado el elemento LI al elemento UL
      ul.appendChild(li);
    });

    // Lo inserto al DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(ul, currentDiv);
  }
};

// Añado un event listener ( escuchador de eventos ) click.

document.querySelector("button").addEventListener("click", () => {
  // Cojo el email y el password del html

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("email y password", email, password);

  // Cuando tengo el email y el password llamo a la función loguearUsuario
  loguearUsuario(email, password);
});
