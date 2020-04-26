import React from "react";
import { useState } from "react";
import { useRef, useImperativeHandle, forwardRef } from "react";
import { useForm, FormContext } from "react-hook-form";
import { ListTextBox } from "./ListTextBox";
import { TextBox } from "./TextBox";

interface Handler {
  remveEmptyRow(): void;
}

function App() {
  const methods = useForm();
  const [isDiseable, setisDiseable] = useState(false);
  const ref = useRef({} as Handler);

  const onSubmit = (data: {}): void => alert(JSON.stringify(data, null, 2));
  console.log("errors ", methods.errors);

  return (
    <>
      <h2>Array values & alone value </h2>
      {/* input area */}
      <FormContext {...methods}>
        <ListTextBox ref={ref} isDeseable={isDiseable} />
        <TextBox isDeseable={isDiseable} />
      </FormContext>
      {/* button area */}
      <input
        type="button"
        value="remove empty"
        onClick={() => {
          setisDiseable(!isDiseable);
          ref.current.remveEmptyRow();
        }}
      />
      <input
        type="submit"
        value="submit"
        onClick={methods.handleSubmit(onSubmit)}
      />
    </>
  );
}

export default App;
