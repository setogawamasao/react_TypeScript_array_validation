import React from "react";
import { useFormContext } from "react-hook-form";

export const TextBox: React.FC<{ isDisabled: boolean }> = (props) => {
  const methods = useFormContext();

  return (
    <>
      <h4>Alone Input Box</h4>
      <div>
        <input
          type="text"
          name="alone"
          ref={methods.register({ required: "reqired!!" })}
          disabled={props.isDisabled}
        />
        {methods.errors.alone && methods.errors.alone.message}
      </div>
    </>
  );
};
