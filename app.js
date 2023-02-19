// I get the package express from module node
const express = require('express')

// on crée une instance d'une application express
// c'est le petit serveur sur lequel va fonctionné notre app
const app = express()
// le port de démarrage de l'API REST
const port = 3000

// premier point de terminaison
// la méthode ici est "get" est qui prend en paramètre 2 éléments
// 1 élément : le chemin de la requête / le chemin de la route ici c'est la route par défault '/'
// 2 c'est une fonction qui à pour rôle de fournir une réponse au client lorsque notre point de terminaison est appelé. Cette fonction a elle même deux arguments (req et res)
// L'argument req permet de récupérer un objet request correspondant à la requête reçu en entrée par notre point de terminaison
// l'objet res correspond à la response, c'est l'object que l'on doit renvoyé à notre client
app.get('/', (req, res) => res.send('Hello, Express ! '))

// je démarre l'api rest sur le port 3000 et j'affiche un message
app.listen(port,()=> console.log(`Notre application Node est démarrée sur : http://localhost:${port}`) )