import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log("binaryStr", binaryStr);
        //console.log("aa", aa);
        let url = "http://127.0.0.1:3000/import";
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: binaryStr,
          }),
        })
          .then((response) => {
            console.log("response", response);
          })
          .catch((error) => {
            console.error("erro", error);
          });
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()} className="drag-area">
      <div className="icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Arraste seus arquivos aqui</p>
      )}
    </div>
  );
}
