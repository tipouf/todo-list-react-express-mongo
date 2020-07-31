import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Rating from '@material-ui/lab/Rating';

import '../../App.css';

export default function List ({test,settest, edit}){

const update =  (event,index) => {
if (isNaN(event)){
console.log(event); 
axios.put(`http://localhost:4200/todo/${index}`, {
check: event.target.checked
})
.then(() => {
console.log('check updated')
settest()
})
} else {
axios.put(`http://localhost:4200/todo/${index}`, {
rating: event
})
.then(() => {
console.log('rating updated')
settest()
})
}
}



//test[index].check = event.target.checked
//const newTab =test
//   const newTab =[...test]  // equivalent à  const newTab = Array.from (test)
// newTab[index].check = event.target.checked
// settest(newTab)


const remove =  (currentItem) => {
console.log('index', currentItem)
axios.delete(`http://localhost:4200/todo/${currentItem}`)
.then(() => {
settest()
handleClose()    


console.log('I delete this todo')
})
}

const editable = (index) => {
console.log(test[index])
//  var newtext = test[index].titre + '1';  //remplacer par la nouvelle valeur du champ de
edit(test[index])
//const newTab =[...test]
//newTab[index].titre= newtext;
//settest(newTab)
}

const starRating = (rating,index) => {
console.log(starRating); 

axios.put(`http://localhost:4200/todo/${index}`, {
rating: rating
})
.then(() => {
console.log('rating updated')
// newTab.push ({check:false, titre : text, date : dateActuelle.toString()}) //id:Math.floor((Math.random() * 100000) + 1),
settest()

})


}
const [open, setOpen] = useState(false);
const [currentItem, setItem] = useState(null);

const handleClickOpen = (index) => {
console.log("index",index)
setOpen(true)
setItem(index);
};
const handleClose = () => {
setOpen(false);
};

return (  
<div className='listjs'>
<Grid container spacing={2}>
{ test ? test.slice(0).reverse().map((item,index) => 
//item equivalent de test[i]x

<Grid item xs={24} sm={4}>
<div className='case'>
<div className='checkbox'>
<Checkbox className='checkbox'
id="checkbox" 
checked={item.check}
onChange={(event)=> update(event,item._id)}
/>
<label htmlFor={item._id}>{item.titre}</label>
</div>
<div className='description'>{item.description}
</div>
<div className='date'>{item.date}</div>

<div className='actions'>
<IconButton aria-label="edit" className= 'editButton' onClick={(text) => {console.log("edited");editable(index)}}>
<EditIcon fontSize="medium" />
</IconButton>

<IconButton aria-label="delete" className= 'deleteButton' onClick={()=>  handleClickOpen(item._id)} >
<DeleteIcon fontSize="medium" />
</IconButton>
<Rating className="rating" id="rating"  value={item.rating} onChange={(event, newValue) => {
update(newValue,item._id);
}}
/>
</div>       
</div>
</Grid>) : "error"}
</Grid>
<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
<MuiDialogTitle className= "dialogtitle" id="customized-dialog-title" onClose={handleClose}>
Confirmer la suppression?
</MuiDialogTitle>
<MuiDialogActions>
<Button autoFocus onClick={()=> remove(currentItem)} color="primary">
OUI
</Button>
</MuiDialogActions>
</Dialog>
</div>
)
}
