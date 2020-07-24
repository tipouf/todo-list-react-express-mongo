import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../../App.css';


export default function Title({test,settest, selected}) {

  //const onChangeText = (event) => {console.log(event.target.value)}
  const dateActuelle = new Date();

  const [text, onSubmitText] = useState(''); //comment remonter l'index?
  const [description, onSubmitDescription] = useState('');
  const [index, setIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormSearch = event => {
    console.log('je suis là');
  };

  useEffect(() => {
    if(selected){
      console.log('Je change mon titre')
      onSubmitText(selected.titre)
      onSubmitDescription(selected.description)
      setIndex()
    }
  }, [selected])

    const handleFormSubmit = event => {
    console.log(text);
    console.log('test', selected);

    let newTab =[...test] 

    if(selected){
        newTab = newTab.map(item => {
      console.log('selected._id',selected._id);
      console.log('item._id', item._id);
      if (item._id === selected._id){
        item.titre = text
        item.description = description
        axios.put(`http://localhost:4200/todo/${item._id}`, {
          titre: text,
          description: description,
        })
        .then(() => {
          console.log('todo edited')
         // newTab.push ({check:false, titre : text, date : dateActuelle.toString()}) //id:Math.floor((Math.random() * 100000) + 1),
          settest()
          
        }) } return item
    } )
    settest(newTab)
    console.log(text, '------------')
   //   [] permet de regarder qu'une seule fois
  //  .then(res => res.json())

    
  } else {

    axios.post('http://localhost:4200/todo', {
      titre: text,
      description: description,
      check: false,
      date: dateActuelle.toString()
    })
    .then(() => {
      console.log('I save todo')
     // newTab.push ({check:false, titre : text, date : dateActuelle.toString()}) //id:Math.floor((Math.random() * 100000) + 1),
      settest()
    })
    .catch((error) => console.log('error', error)) }
  }

    return (
      <div className='formjs'>
      <h1>ToDo List</h1>
    
      <div className = 'add'>

     <TextField className = 'Textfield' id="standard-basic"
          id="filled-enabled"
          label="titre"
             value={text}
          onChange={(event,text) => onSubmitText(event.target.value)}
        />
      <TextField className = 'Textfield2' id="standard-basic"
          id="filled-enabled"
          label="description"
             value={description}
          onChange={(event,description) => onSubmitDescription(event.target.value)}
          />
      <Button className = 'Button' variant="contained" color="primary" onClick={handleFormSubmit}>valider</Button>
      </div>
      
      </div>
    )
  }
