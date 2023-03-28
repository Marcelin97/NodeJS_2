// I get the package express from module node
const express = require('express')
const { success } = require('./helper.js') // je récupère uniquement la méthode success
let pokemons = require('./mock.pokemon.js'); // j'importe ma liste de pokémons

// on crée une instance d'une application express
// c'est le petit serveur sur lequel va fonctionné notre app
const app = express()
// le port de démarrage de l'API REST
const port = 3000

// premier point de terminaison
// la méthode ici est "get" est qui prend en paramètre 2 éléments
// 1 élément : le chemin de la requête / le chemin de la route ici c'est la route par défaut '/'
// 2 c'est une fonction qui à pour rôle de fournir une réponse au client lorsque notre point de terminaison est appelé. Cette fonction a elle même deux arguments (req et res)
// L'argument req permet de récupérer un objet request correspondant à la requête reçu en entrée par notre point de terminaison
// l'objet res correspond à la response, c'est l'object que l'on doit renvoyé à notre client
app.get('/', (req, res) => res.send('Hello, Express !'))

// définition d'un point de terminaison
// Point de terminaison Express = app.METHODE(CHEMIN, GESTIONNAIRE(req, res))

app.get('/api/pokemons/:id', (req, res)=> { // j'utilise ma liste de pokemon que j'ai importé ligne 3
 const id = parseInt(req.params.id); // récupérer un paramètre dans une url grâce la propriété params de la requête
 const pokemon = pokemons.find(pokemon => pokemon.id === id); // j'utilise la méthode find pour récupérer un pokemon en fonction d'une condiction. Ici je veux le pokemon qui le meme id que celui de ma requête
 const message = "j'ai trouvé un pokémon";
 res.json(success(message, pokemon));
})


app.get('/api/pokemons/', (req, res) =>{
    // res.send(`Il y a ${pokemons.length} pokémons dans le pokédex`)
    const message = "Voici la liste de tous les pokémons";
    res.json(success(message, pokemons));
})
// je démarre l'api rest sur le port 3000 et j'affiche un message
app.listen(port,()=> console.log(`Notre application Node est démarrée sur : http://localhost:${port}`) )

