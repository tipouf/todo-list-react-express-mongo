import React, {useState} from 'react';
import {get, reduce} from 'lodash';
import {TextField,InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import '../../App.css';


const SearchField = ({items, onFilter, ...props}) => {
  const [search, setSearch] = useState('');
  const [rateValue, setRateValue] = useState('');

  const filter = evt => {
    const search = get(evt, 'target.value', '').toLowerCase();
    const rateValue = get (evt, 'target.value', '');
    setSearch(get(evt, 'target.value', ''));
    setRateValue(get(evt, 'target.value', ''));
    console.log('rateValue',rateValue);

    const filteredList = reduce(items, (acc, item) => {
      const lowerD = item.titre.toLowerCase();
      const lower = item.description.toLowerCase();
      console.log('item.rating',item.rating);
 
      if (item.rating === rateValue){
        acc.push(item);
      }
      if (lowerD.includes(search) || lower.includes(search)) {
        acc.push(item);
        console.log(item);
      }

      return acc;
    }, []);

    console.log('i am here');
    onFilter(filteredList);
    console.log(filteredList);
  };

  const filterRating = evt => {
    const rateValue = get (evt, 'target.value', '');
    setRateValue(get(evt, 'target.value', ''));
    console.log('rateValue',rateValue);

    const filteredList = reduce(items, (acc, item) => {
      
      if (item.rating == rateValue){
        console.log('item.rating',item.rating);
        console.log('rateValue',rateValue)
        acc.push(item);
      }
  
      return acc;
    }, []);

    console.log('i am here on rating');
    onFilter(filteredList);
    console.log(filteredList);
  };


  const clear = () => {
    onFilter(items);
    setSearch('')
    setRateValue('');
  };



  return (
    <div className= 'search'>
    <TextField
    value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="red"/>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CloseIcon className='closeButton' onClick={clear}/>
          </InputAdornment>
        )
      }}
      onChange={filter}
      {...props}/>
        <Rating
          name="simple-controlled"
          value={rateValue}
          onChange={filterRating}
          />
    </div>
  );
};


export default SearchField;
