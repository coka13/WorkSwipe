import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './CheckBox.css';

const CheckBox = ({ options, dispatchFunc, checkedList=[],name }) => {
  console.log("checkedList",checkedList)
  
  const dispatch = useDispatch();

  const [checkedOptions, setCheckedOptions] = useState(checkedList); 

  const handleCheckboxChange = (option) => {
    const newCheckedOptions = checkedOptions.includes(option._id)
      ? checkedOptions.filter((item) => item !== option._id)
      : [...checkedOptions, option._id];

    setCheckedOptions(newCheckedOptions);

    dispatch(dispatchFunc({value:newCheckedOptions,name:name}));
    console.log(checkedOptions)
  };

  return (
    <div className="scrollable-container">
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option._id}
            label={option.name}
            control={
              <Checkbox
                checked={checkedOptions.includes(option._id)}
                onChange={() => handleCheckboxChange(option)}
              />
            }
          />
        ))}
      </FormGroup> 
    </div>
  );
};

export default CheckBox; 