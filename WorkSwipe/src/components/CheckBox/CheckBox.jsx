import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './CheckBox.css';

const CheckBox = ({ options, dispatchFunc, checkedList = [], name }) => {
  const dispatch = useDispatch();
  const [checkedOptions, setCheckedOptions] = useState(checkedList);

  useEffect(() => {
    console.log('Updated checkedList:', checkedList);
    setCheckedOptions(checkedList);
  }, [checkedList]);

  const handleCheckboxChange = (option) => {
    const newCheckedOptions = checkedOptions.includes(option._id)
      ? checkedOptions.filter((item) => item !== option._id)
      : [...checkedOptions, option._id];

    setCheckedOptions(newCheckedOptions);
    console.log('Dispatching:', { value: newCheckedOptions, name: name });
    dispatch(dispatchFunc({ value: newCheckedOptions, name: name }));
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
