import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './CheckBox.css';

const CheckBox = ({ options,checkedList }) => {
  // Initialize a state variable to manage checked items
  const [checkList, setCheckedList] = useState(checkedList);

  const handleCheckboxChange = (option) => {
    if (checkList.includes(option)) {
      // If the option is already in the list, remove it
      setCheckedList(checkList.filter((item) => item !== option));
    } else {
      // If the option is not in the list, add it
      setCheckedList([...checkList, option]);
    }
  };

  return (
    <div className="scrollable-container">
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            label={option}
            control={
              <Checkbox
                checked={checkList.includes(option)}
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
