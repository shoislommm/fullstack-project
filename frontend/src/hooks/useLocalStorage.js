import { useState } from "react";

export default function useLocalStorage() {
  const [value, setValue] = useState(localStorage.getItem("token"));

  const setNewValue = (data) => {
    if (!data) {
      localStorage.removeItem("token");
      setValue(null);
    } else {
      localStorage.setItem("token", data);
      setValue(data);
    }
  };

  return [value, setNewValue];
}
