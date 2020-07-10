import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useForm, FormContext } from "react-hook-form";
import { TextBox } from "./TextBox";
import { ListTextBox, ListTextBoxFunctions } from "./ListTextBox";
import { FileInput, FileInputFunctions } from "./FileInput";

export const App = () => {
  const methods = useForm({ mode: "onChange" });
  const [isDiseable, setisDiseable] = useState(false);
  const listTextBoxRef = useRef({} as ListTextBoxFunctions);
  const fileInputRef = useRef({} as FileInputFunctions);

  const changeConfirm = () => {
    setisDiseable(!isDiseable);
    if (isDiseable === false) {
      listTextBoxRef.current.remveEmptyRow();
    } else {
      listTextBoxRef.current.addRow();
    }
  };

  const onSubmit = (data: {}): void => {
    console.log(fileInputRef.current.submitFiles());
    alert(JSON.stringify(data, null, 2));
  };

  // const onSubmit = async (data: {}): Promise<void> => {
  //   const response = await fetch("http://localhost:3001/test/get", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, cors, *same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, same-origin, *omit
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrer: "no-referrer", // no-referrer, *client
  //     body: JSON.stringify(data), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  //   });

  //   const json = await response.text();
  //   alert(json);
  // };

  console.log("errors ", methods.errors);
  return (
    <>
      <h2>Separated Input</h2>

      {/* input area */}
      <FormContext {...methods}>
        <ListTextBox ref={listTextBoxRef} isDisabled={isDiseable} />
        <TextBox isDisabled={isDiseable} />
        <FileInput ref={fileInputRef} isDisabled={isDiseable} />
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
