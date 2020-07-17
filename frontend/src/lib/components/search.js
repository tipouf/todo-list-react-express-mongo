import React, {useState} from 'react';
import {get, reduce} from 'lodash';
import {TextField,InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const SearchField = ({items, onFilter, ...props}) => {
  const [search, setSearch] = useState('');
  const filter = evt => {
    const search = get(evt, 'target.value', '').toLowerCase();
    setSearch(get(evt, 'target.value', ''));
    const filteredList = reduce(items, (acc, item) => {
      const lower = item.label.toLowerCase();
      if (lower.includes(search)) {
        acc.push(item);
      }

      return acc;
    }, []);
    console.log('i am here');
    onFilter(filteredList); /// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  };

  const clear = () => {
    onFilter(items);
    setSearch('');
  };

  return (
    <TextField
    value=''
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
  );
};


export default SearchField;
