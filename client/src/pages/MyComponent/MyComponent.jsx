import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useFormik } from "formik"
import classes from "./formStyle.module.css"

const MyComponent = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  /*const formik = useFormik({
    initialValues: {
      title: "",
    },

    onSubmit: async (values) => {
      console.log("values", values)

    
      //for upload page
      const uploadData = new FormData()
      uploadData.append("files", values.singleFile)

      
      // simple create new collection with JSON

      const createArticle = await fetch("http://localhost:1337/api/tests", {
        method: "POST",
        body: formData,
        headers: {},
      })
      const createRes = await createArticle.json()
      console.log("createArticleRes", createRes)

      //upload file to uploads
      
      
      const uploadFile = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: uploadData,
        headers: {},
      })
      const uploadRes = await uploadFile.json()
      console.log("uploadRes", uploadRes)
      const url = uploadRes[0].name;
      

      const formData = new FormData()
      
      const data = {
        title: values.title,
      }

      console.log("data", data)

      formData.append("data", JSON.stringify(data))
      console.log("ha l'url",url); 
      //single-file
      //formData.append("files.single", values.singleFile)
      formData.append("files.image", url )

      //update collection

const updateArticle = await fetch(
    "http://localhost:1337/api/tests/3",
    {
      method: "PUT",
      body: formData,
      headers: {},
    }
  )
  const updateData = await updateArticle.json()
  console.log("updateArticleRes", updateData)

     //multiple-files
      for (let i = 0; i < values.multiFile.length; i++) {
        formData.append(`files.multi`, values.multiFile[i])
      }

    },
  })


  const onSingleFileChange = (e) => {
    const file = e.target.files
    console.log("onSingleFileChange", file)
    console.log("onSingleFileChange1", file[0])

    formik.setFieldValue("singleFile", file[0])
  }*/


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await fetch('http://localhost:1337/api/upload', {
      method: 'post',
      body: formData
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Can be multiple files if you setup "collection" instead of "model" */}
      <input type="file" name="files" />
      <input type="text" name="ref" defaultValue="api::test.test" />
      <input type="text" name="refId" defaultValue="fGxittzqfzPDYyH2ceOkPA" />
      <input type="text" name="field" defaultValue="image" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MyComponent;
