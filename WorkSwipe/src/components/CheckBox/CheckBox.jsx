import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import './CheckBox.css';

const CheckBox = ({ options,dispatchFunc }) => {
  const dispatch = useDispatch()
  const checkList = useSelector(state => state.users.technologies)
  // Initialize a state variable to manage checked items

  const handleCheckboxChange = (option) => {
    if (checkList.includes(option._id)) {
      // If the option is already in the list, remove it
      dispatch(dispatchFunc(checkList.filter((item) => item !== option._id)));
    } else {
      // If the option is not in the list, add it
      dispatch(dispatchFunc([...checkList, option._id]));
    }
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
                checked={checkList.includes(option._id)}
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
