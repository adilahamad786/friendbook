import { useState } from 'react';

const useInput = (validate) => {
  const [value, setInput] = useState('');
  const [touched, setTouched] = useState(false);

  const valueIsValid = validate(value);
  const inputIsInvalid = !valueIsValid && touched;

  const setValue = (e) => {
    setInput(e.target.value.trim(' '));
  }

  const setFocus = (e) => {
    setTouched(true);
  }

  const reset = () => {
    setInput('');
    setTouched(false);
  }

  return {
    value,
    setValue,
    isValid : valueIsValid,
    hasError : inputIsInvalid,
    setFocus,
    reset
  };
}

export default useInput;