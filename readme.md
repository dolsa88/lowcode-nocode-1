SI quieres que te funcione todo igual


1. public/firebas.js -> 11 - 19

Cambiar ese objeto por tu objeto de credenciales de firebase.
Que se encuentran en 
Firebase console -> Project Settings -> General -> Fer scroll down.



2. public/firebase.js -> 54

Cambiar esa url por la que tengas en tu Functions -> Api



3. .firebaseerc

Cambiar el project name de firebase por el que tengais vosotros (No se si el nombre o la id, prueba ambos). 



4. functions/cert.json

Cambiar el objeto de credenciales por las de firebase-admin. Se puede localizar en 
Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key
Esto me descarga las credenciales para el backend.


5. npm install

Ejecutar en terminal "npm install"


6. firebase deploy

Ejecutar en terminal "firebase deploy"


7. Si no hace el deploy de functions

cd functions -> firebase deploy 
cd functions -> npm install