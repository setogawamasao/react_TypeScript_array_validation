import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useForm, FormContext } from "react-hook-form";
import { ListTextBox } from "./ListTextBox";
import { TextBox } from "./TextBox";
import { FileInput } from "./FileInput";

interface Handler {
  remveEmptyRow(): void;
  getRowValues(): void;
}

export const App = () => {
  const methods = useForm({ mode: "onChange" });
  const [isDiseable, setisDiseable] = useState(false);
  const ref = useRef({} as Handler);

  const changeConfirm = () => {
    setisDiseable(!isDiseable);
    ref.current.remveEmptyRow();
  };

  const onSubmit = (data: {}): void => {
    console.log(ref.current.getRowValues());
    alert(JSON.stringify(data, null, 2));
  };

  console.log("errors ", methods.errors);
  return (
    <>
      <h2>Separated Input</h2>

      {/* input area */}
      <FormContext {...methods}>
        <ListTextBox ref={ref} isDeseable={isDiseable} />
        <TextBox isDeseable={isDiseable} />
        <FileInput isDeseable={isDiseable} />
      </FormContext>

      <div style={{ margin: "30px" }} />

      {/* button area */}
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
};
