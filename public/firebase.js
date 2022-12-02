// Necesito importar la libreria
    console.log('firebase js')
    import { initializeApp,  } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
    //import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';
    const firebaseConfig = {
        apiKey: "AIzaSyDZHR2iFUpIUF_Ojn73RAj6xBTGBs_jytg",
        authDomain: "eliminarlo2.firebaseapp.com",
        projectId: "eliminarlo2",
        storageBucket: "eliminarlo2.appspot.com",
        messagingSenderId: "347973977710",
        appId: "1:347973977710:web:f55cf297019b3b4cba487f",
        measurementId: "G-9CBE4J8EBV"
    };


      
    
    var token; 

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);






    // Get a list of cities from your database

    const crearUsuarioNuevo = async (email, password) =>{
        const prueba = await createUserWithEmailAndPassword(auth, email, password)
        console.log('prueba', prueba)
    }

  const loguearUsuario = async (email, password) =>{
        console.log('loguear usuario', email, password)
        const usuario = await signInWithEmailAndPassword(auth, email, password)
        console.log('us', usuario)
        token = usuario.user.accessToken
        console.log('token USUARIO EXITOSAMENTE LOGUEADO', token)
        cargarTodo()
    }

    

    const cargarTodo = ( )=>{
        console.log('token desde index', token)
        fetch(`http://localhost:3002/users`,
        { 
          method: 'get', 
          headers: new Headers({
              'Authorization': token
          }), 
      }

        )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if(data.message){
            alert(data.message)
            return false
          }else{
            return data;
          }
          
          
        })
        .then((users) => {
          console.log("users", users);
          
          addTitle();
          addList(users);
        });
      
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
      }
      



//window.loguearUsuario = loguearUsuario

document.querySelector('button').addEventListener('click', ()=>{
  

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  console.log('email y password', email, password)
  loguearUsuario(email, password)
});
   
 