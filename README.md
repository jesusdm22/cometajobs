# Cometa Jobs

Necesario iniciar tanto la API, como el cliente, y el panel de administracion.
<br><br>
Cada modulo de la aplicacion va sobre un puerto distinto.
<br><br>
API -> Puerto 3800
<br>
Cliente -> Puerto 4200
<br>
Admin -> Puerto a elegir (4300 por ejemplo)
<br>
Para ejecutar la aplicacion se require MongoDB, y realizar npm install tanto en 'admin', como en 'client'
<br>
Para ello hay que lanzar el comando 'npm start' dentro del directorio 'api'.<br>
En otra terminal lanzar el comando 'npm start' de nuevo, pero esta vez dentro del directorio 'client'.<br>
En otra terminal lanzar el comando 'ng serve --port [puerto]' de nuevo, pero esta vez dentro del directorio 'admin'.<br>
<br><br>
De esta forma habremos iniciado todos los servicios de la aplicacion y tendran comunicacion entre ellos, de otra forma, la aplicacion no funcionara correctamente.
<br><br>


![Esquema-de-la-app](https://raw.githubusercontent.com/jesusdm22/cometajobs/master/esquema.PNG?raw=true "Title")
