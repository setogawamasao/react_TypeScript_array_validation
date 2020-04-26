import React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "./times-circle.svg";

export const FileInput: React.FC<{ isDeseable: boolean }> = (props) => {
  const methods = useFormContext();
  const [imageUrls, setImageUrls] = useState(new Array<string>());
  let resetKey = 0;

  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    if (files.length < 0) {
      return;
    }

    const imageUrlsBuffer = imageUrls.slice();

    for (const file of Array.from(files)) {
      const result = await readFile(file);
      imageUrlsBuffer.push(result);
    }

    setImageUrls(imageUrlsBuffer);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = (event: Event) => {
        const result: string | ArrayBuffer | null = (event.target as FileReader)
          .result;
        if (typeof result === "string") {
          resolve(result);
        }
      };
      fr.readAsDataURL(file);
    });
  };

  const reset = (): void => {
    resetKey = Math.random();
    setImageUrls([]);
  };

  const deleteImage = (id: number) => {
    const imageUrlsBuffer = imageUrls.slice();
    imageUrlsBuffer.splice(id, 1);
    setImageUrls(imageUrlsBuffer);
  };

  const preview = (imageUrl: string, id: number): JSX.Element => {
    return (
      <div key={id} className="preview">
        <img src={imageUrl} alt="preview" style={{ width: "100%" }} />
        {!props.isDeseable && (
          <img
            src={Icon}
            className="delete-button"
            onClick={() => deleteImage(id)}
            alt="deleteButton"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <h4>File Input</h4>
      <input
        name="fileInput"
        type="file"
        multiple
        onChange={onChange}
        key={resetKey}
        ref={methods.register}
        style={props.isDeseable ? { display: "none" } : { display: "block" }}
      />
      {!props.isDeseable && (
        <input type="button" value="reset" onClick={reset}></input>
      )}
      <div>
        {imageUrls.map((imageUrl, id) => {
          return preview(imageUrl, id);
        })}
      </div>
    </>
  );
};
