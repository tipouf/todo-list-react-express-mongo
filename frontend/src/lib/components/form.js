import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import '../../App.css';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


export default function Title({test,settest, selected}) {

  //const onChangeText = (event) => {console.log(event.target.value)}
  const dateActuelle = moment();


  const [text, onSubmitText] = useState(''); //comment remonter l'index?
  const [description, onSubmitDescription] = useState('');
  const [index, setIndex] = useState(null);

  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickFailed = () => {
    setOpenFailed(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenFailed(false);
  };

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
    if (text && description) {
      handleClick()
    }else{
      handleClickFailed()
    }
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
      date: moment(moment()).format('DD MMM YYYY HH:MM'),
      rating: 2
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
      <div className='snackbar'>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Nouvelle ToDo 
      </Alert>
    </Snackbar>
    </div>
    <div className='snackbarFailed'>
    <Snackbar open={openFailed} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        Veuillez renseigner le titre et la description!
      </Alert>
    </Snackbar>
    </div>

      <div className = 'add'>

     <TextField className = 'Textfield' id="standard-basic"
          id="filled-enabled"
          label="titre"
             value={text}
          onChange={(event,text) => onSubmitText(event.target.value)}
        />
      <TextField className = 'Textfield2' id="standard-basic"
          id="filled-enabled2"
          label="description"
             value={description}
          onChange={(event,description) => onSubmitDescription(event.target.value)}
          />
      <Button className = 'Button' variant="contained" color="primary" onClick={handleFormSubmit}>valider</Button>
      </div>
      
      </div>
    )
  }
