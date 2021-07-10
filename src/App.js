import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}
