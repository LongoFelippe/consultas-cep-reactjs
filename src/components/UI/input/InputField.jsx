import React from 'react';
import NumberFormat from 'react-number-format';

function InputField({
  mask, name, value, inputRef, onChange, ...other
}) {
  return (
    <NumberFormat
      {...other}
      isNumericString
      format="#####-###"
      name={name}
      value={value}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name,
          },
        });
      }}
    />
  );
}
export default React.memo(InputField);
