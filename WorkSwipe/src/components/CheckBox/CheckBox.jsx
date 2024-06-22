import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './CheckBox.css';

const CheckBox = ({ options, dispatchFunc, checkedList = [], name, onSubmit }) => {
  const dispatch = useDispatch();
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    setCheckedOptions(checkedList);
    onSubmit(name, checkedOptions);
  }, [checkedList]);

  const handleCheckboxChange = (option) => {
    const isChecked = checkedOptions.includes(option._id);
    let newCheckedOptions;

    if (isChecked) {
      newCheckedOptions = checkedOptions.filter((item) => item !== option._id);
    } else {
      newCheckedOptions = [...checkedOptions, option._id];
    }

    setCheckedOptions(newCheckedOptions);
    dispatch(dispatchFunc(newCheckedOptions));
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
