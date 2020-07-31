const express = require('express');
const app = express();
var cors = require('cors')

const bodyParser = require('body-parser'); 

const mongoose = require('mongoose');
const Todo = require('./models/Todo');


   mongoose.connect('mongodb+srv://tipi:tipi@tipouf.cqndp.gcp.mongodb.net/test?retryWrites=true&w=majority',
  //  mongoose.connect('mongodb://localhost/todo',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*permet de transformer le corp de la requete en json utilisable*/

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
 
app.use(bodyParser.json());

app.use(cors())

app.get('/todo', cors(), function (req, res, next) {
console.log('step');  

 Todo.find({})
.then(todos => {
  console.log(todos) 

res.json({msg: 'seems to be good!', todos})
})
})




app.get('/todo', function(req, res) {
  res.send('Hello World')
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.post('/todo', (req, res, next) => {
    console.log('POST TODO')
    delete req.body._id; // car celui-ci est deja genere automatiquement par mongo
    const todoAdd = new Todo({
        //     titre: req.body.titre,
            //  date: req.body.date,
            //  check: req.body.check
        // ...  on pourrait rentrer tous les champs mais a la place on va faire :*/
        ...req.body
    });

    Todo.create(todoAdd)
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => {
        console.log(error)
        res.status(400).json({ error })});
           //enregistre un objet dans la base et retourne une reponse OK
  });

    app.delete('/todo/:id', (req, res, next) => {
      Todo.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });

    app.put('/todo/:id', (req, res, next) => {
      console.log(req.body)
      Todo.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    });

module.exports = app;

