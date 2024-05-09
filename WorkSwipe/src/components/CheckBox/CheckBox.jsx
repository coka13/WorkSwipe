import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { setTechnologies } from '../../store/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import './CheckBox.css';

const CheckBox = ({ options }) => {
  const dispatch = useDispatch()
  const checkList = useSelector(state => state.users.technologies)
  // Initialize a state variable to manage checked items

  const handleCheckboxChange = (option) => {
    if (checkList.includes(option)) {
      // If the option is already in the list, remove it
      dispatch(setTechnologies(checkList.filter((item) => item !== option)));
    } else {
      // If the option is not in the list, add it
      dispatch(setTechnologies([...checkList, option]));
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
