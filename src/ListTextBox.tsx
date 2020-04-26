import React from "react";
import { useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Row {
  row: string;
}

//export const List: React.FC<{ isDeseable: boolean }> = (props) => {
export const ListTextBox = forwardRef(
  ({ isDeseable }: { isDeseable: boolean }, ref) => {
    const methods = useFormContext();
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "rows",
    });

    const remveEmptyRow = () => {
      const numbers: number[] = [];
      methods
        .getValues({ nest: true })
        .rows.forEach((item: Row, id: number) => {
          if (item.row === "") {
            numbers.push(id);
          }
        });

      // delete empty row id array
      remove(numbers);
    };

    useImperativeHandle(ref, () => {
      return { remveEmptyRow };
    });

    useEffect(() => {
      append({ row: "use effect add" });
    }, [append]);

    return (
      <>
        <h4>list Input box</h4>
        <input
          type="button"
          style={{ display: "block" }}
          onClick={(): void => {
            append({ row: "" });
          }}
          value="add row"
        />
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <input
                name={`rows[${index}].row`}
                defaultValue={`${item.row}`}
                ref={methods.register({ required: "list Required!!" })}
                disabled={isDeseable}
              />
              <input
                type="button"
                value="delete"
                onClick={() => remove(index)}
              />
              <span>
                {methods.errors.rows?.[index] &&
                  methods.errors.rows?.[index].row?.message}
              </span>
            </div>
          );
        })}
      </>
    );
  }
);
