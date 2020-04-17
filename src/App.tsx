import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { register, control, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      rows: [{ row: "default array" }],
      alone: "default value",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const [flag, setFlag] = useState(false);

  const onSubmit = (data: {}): void => alert(JSON.stringify(data, null, 2));

  //console.log("errors ", errors);
  return (
    <>
      <h2>Array values & alone value </h2>
      <label>Array values</label>
      <div>
        <input
          type="button"
          onClick={(): void => {
            append({ row: "a" });
          }}
          value="add"
        />
      </div>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <input
              name={`rows[${index}].row`}
              defaultValue={`${item.row}`}
              ref={register({ required: true })}
              disabled={flag}
            />
            <input type="button" value="delete" onClick={() => remove(index)} />
            <span>{errors.rows?.[index] && "required!!"}</span>
          </div>
        );
      })}
      <label>alone value</label>
      <div>
        <input type="text" name="alone" ref={register({ required: true })} />
        {errors.alone && "reqired!!"}
      </div>
      <input
        type="button"
        value="remove empty"
        onClick={() => {
          setFlag(!flag);

          // get empty row id array
          const numbers: number[] = [];
          getValues({ nest: true }).rows.forEach((item, id) => {
            if (item.row === "") {
              numbers.push(id);
            }
          });

          // delete empty row id array
          remove(numbers);
        }}
      />
      <input type="submit" value="submit" onClick={handleSubmit(onSubmit)} />
    </>
  );
}

export default App;
