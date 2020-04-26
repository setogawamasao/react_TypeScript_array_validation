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
  const methods = useForm({ mode: "onChange" });
  const [isDiseable, setisDiseable] = useState(false);
  const ref = useRef({} as Handler);

  const changeConfirm = () => {
    setisDiseable(!isDiseable);
    ref.current.remveEmptyRow();
  };

  const onSubmit = (data: {}): void => alert(JSON.stringify(data, null, 2));

  console.log("errors ", methods.errors);
  return (
    <>
      <h2>Separaged input areta </h2>

      {/* input area */}
      <FormContext {...methods}>
        <ListTextBox ref={ref} isDeseable={isDiseable} />
        <TextBox isDeseable={isDiseable} />
      </FormContext>

      {/* button area */}
      <div style={{ margin: "30px" }} />
      <input
        type="button"
        value="change Confirm"
        style={{ display: "block" }}
        onClick={() => {
          changeConfirm();
        }}
      />
      <input
        type="submit"
        value="submit"
        style={{ display: "block" }}
        onClick={methods.handleSubmit(onSubmit)}
      />
    </>
  );
}

export default App;
