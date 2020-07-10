import React from "react";
import { useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export interface ListTextBoxFunctions {
  remveEmptyRow(): void;
  getRowValues(): void;
  addRow(): void;
}
interface Row {
  row: string;
}

//export const List: React.FC<{ isDisabled: boolean }> = (props) => {
export const ListTextBox = forwardRef(
  ({ isDisabled }: { isDisabled: boolean }, ref) => {
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

    const getRowValues = (): string[] => {
      return methods.getValues({ nest: true }).rows.map((item: Row) => {
        return item.row;
      });
    };

    const addRow = (): void => {
      if (methods.getValues({ nest: true }).rows === undefined) {
        append({ row: "" });
      }
    };

    useImperativeHandle(ref, () => {
      return { remveEmptyRow, getRowValues, addRow };
    });

    useEffect(() => {
      append({ row: "" });
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
                disabled={isDisabled}
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
