import * as React from "react";

import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

import "./customDateButton.css";
function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      style={{
        width: "100%",
        color: "#757575",
        border: "3px solid #00c9c8",
        minHeight: "40px",
        borderRadius: "6px",
      }}
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ?? "Pick a date"}
    </Button>
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField({ label, value, onChange }) {
  return (
    <ButtonDatePicker
      label={`${value == null ? label : format(value, "dd/MM/yyyy")}`}
      value={value}
      onChange={onChange}
    />
  );
}
