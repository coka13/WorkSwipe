import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import "./SelectComponent.css";

export default function SelectVariants({ prop,onChange}) {

  const handleChange = (event) => {
    onChange(event)
  };

  return (
    <>
      <FormControl variant="standard" sx={{  minWidth: "50%" }}>
        <InputLabel id={prop.name}>{prop.label}</InputLabel>
        <Select 
        defaultValue={0}
        name={prop.name}
          labelId={prop.name}
          id={prop.id}
          value={prop.value}
          onChange={handleChange}
          label={prop.label}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, 
              },
            },
          }}
        >
          {prop.options.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
