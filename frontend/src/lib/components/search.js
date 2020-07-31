import React, {useState} from 'react';
import {get, reduce} from 'lodash';
import {TextField,InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import '../../App.css';


const SearchField = ({items, onFilter, ...props}) => {
  const [search, setSearch] = useState('');
  const filter = evt => {
    const search = get(evt, 'target.value', '').toLowerCase();
    setSearch(get(evt, 'target.value', ''));
    const filteredList = reduce(items, (acc, item) => {
      const lowerD = item.titre.toLowerCase();
      const lower = item.description.toLowerCase();
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

  const [value, setValue] = useState(0);

  const clear = () => {
    onFilter(items);
    setSearch('');
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
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
    </div>
  );
};


export default SearchField;
