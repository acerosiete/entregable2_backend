Iniciar el proyecto como un proyecto de Node "npm init --yes" Instalar las dependencias necesarias NodeJS y Angular "npm install express" "npm install axios" "npm install mongoose" "npm install cors" "npm install socket.io" "npm install --save-dev nodemon" "npm i -D jest supertest"

Angular: "npm install -g @angular/cli" "npm install ngx-socket-io"

Levantar el servidor: "npm run dev"

Levantar MongoDB: "mongo"

Levantar el cliente Angular: "ng serve"

Se hace uso del consumo de API Digimons desde backend: documentacion: https://digimon-api.vercel.app/ https://digimon-api.vercel.app/playground.html

Ruta del servidor: http://localhost:3001

El cliente cuenta con dos rutas: http://localhost:4200/dashbard http://localhost:4200/busqueda

Dashboard: Vista principal de la aplicación, cuenta con la funcionalidad de guardar un nuevo Digimon en la BD "digiData": POST http://localhost:3001/digimon (backend)

Muestra una imagen aleatoria de algun digimon utilizando sockets y con base al intervalo de tiempo configurado: /fragmento de código en backend/
setInterval(async() => { const respRandom = await digiController.getRandomImage(); cliente.emit("digimonRandom", respRandom); }, 600 * 1000);

Busqueda: Cuenta con 3 funcionalidades: Listar todos los digimons que se encuentran en la BD y al hacer el cosumo al API Digimons GET http://localhost:3001/digimon

Realiza busqueda por filtro de nombre de digimon, realiza validaciones en backend para determinar si el digimon existe en BD o en API: GET http://localhost:3001/digimon/name/id

Realiza busqueda por filtro de nivel de digimon, realiza validaciones en backend para determinar si el nivel existe en BD y después realiza la busqueda en el API: GET http://localhost:3001/digimon/busqueda/id

Catalogo de niveles disponibles: +Ultimate +Mega +Rookie +Armor +Fresh +Champion

Se adjuntan al repositorio las colecciones de la BD en formato JSON: +nombres +niveles +digimons

El backend se encuentra en la carpeta "app", se hace uso de las siguientes tecnologias:

-Framework Express -Arquitectura REST -Sockets -Archivo Dockerfile -Patron Builder -Base de datos MongoDB (uso de catálogos) -Manejo de variables de entorno -Tests con Jest (aun no completadas) -Consumo de terceros (API Digimon)

El frontend se encuentra en la carpeta "frontend" y cuenta con lo siguiente: -2 componentes: "digimons.component" para el dashboard y "digimon-busqueda.component" para la ruta de busquedas -Models que determina la estructura de los datos. -2 Services: "digimon.service" para acceder a los recursos backend, "socket.service" para iniciar la conexión al backend.
