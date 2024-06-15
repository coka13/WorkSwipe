import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons({
  text,
  variant = "outlined",
  sx = { fontWeight: "bold", border: "1px solid #1976D2" , color: "#1976D2",display: "flex", justifyContent: "center",alignItems: "center", width: "100%", height: "100%"},
  onClick=()=>{}
  
}) {
  return (
    <Stack spacing={2}>
      <Button variant={variant} sx={sx} onClick={onClick}>
        {text}
      </Button>
    </Stack>
  );
}
