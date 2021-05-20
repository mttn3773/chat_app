import { Formik, Form } from "formik";
import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { config } from "../../../config";
import { DataContext } from "../../../store/GlobalState";
import { dispatchNotify } from "../../../utils/dispatchNotify";
import { request } from "../../../utils/request";
import "./ImageUploadForm.scss";
interface ImageUploadFormProps {}

export const ImageUploadForm: React.FC<ImageUploadFormProps> = ({}) => {
  const [files, setFiles] = useState<any[]>([]);
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (files) => {
      setFiles(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const images = files.map((file: any, index) => {
    return (
      <img
        key={index}
        src={file.preview}
        width="200px"
        height="300px"
        alt="preview"
      />
    );
  });
  const handleSubmit = async () => {
    if (!files.length) return;
    const formData = new FormData();
    formData.append("image", files[0]);
    const res = await fetch(config.endpoints.avatar, {
      method: "PUT",
      body: formData,
    });
    const res_ = await res.json();
    return dispatchNotify(dispatch, res_, notify);
  };
  return (
    <div className="image-upload-conteiner">
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div {...getRootProps()} className="drag-and-drop-container">
              <input {...getInputProps()} />
              <p>Drop files here</p>
            </div>
            <div>{images}</div>
            <button disabled={!files.length || isSubmitting} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
