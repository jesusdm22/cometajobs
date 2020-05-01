# cometajobs

Necesario iniciar tanto la API, como el cliente, y el panel de administracion.

Cada modulo de la aplicacion va sobre un puerto distinto.
API -> Puerto 3800
Cliente -> Puerto 4200
Admin -> Puerto a elegir (4300 por ejemplo)

Para ello hay que lanzar el comando 'npm start' dentro del directorio 'api'.
En otra terminal lanzar el comando 'npm start' de nuevo, pero esta vez dentro del directorio 'client'.
En otra terminal lanzar el comando 'ng serve --port [puerto]' de nuevo, pero esta vez dentro del directorio 'admin'.

De esta forma habremos iniciado todos los servicios de la aplicacion y tendran comunicacion entre ellos, de otra forma, la aplicacion no funcionara correctamente.



![Esquema-de-la-app](https://raw.githubusercontent.com/jesusdm22/cometajobs/master/esquema.PNG?raw=true "Title")
