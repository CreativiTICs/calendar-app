import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setformValues] = useState(initialState);

  const reset = () => {
    setformValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  return [formValues, handleInputChange, reset];
};
