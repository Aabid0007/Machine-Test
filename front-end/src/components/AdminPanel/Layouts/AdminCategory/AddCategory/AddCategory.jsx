import React from 'react'
import { createCategory, getCategories } from '../../../../../Redux/Slices/Category.Slice';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"


import './AddCategory.css'
const AddCategory = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();



  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      description: data.description,
    };

    dispatch(createCategory(formData))
      .then(() => {
        console.log(formData);
        
        dispatch(getCategories());
        closeModal();
        
      })
      .catch((error) => {
        console.error("Error creating Category:", error);
      });
  };
  return (
    <div className='form_product_section'>
    <div className="Add_product_Form">
     <div className='add_product_section'>
     <div className='closeFrom'>
        <button className="close_btn" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
      </div>
      <div className="FormSection">
        <div className="form_heading">
          <h2>Add Category</h2>
        </div>
        <div className="formContainer">
          <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="FormContent">
             
              <label htmlFor="name">
                <h4>Name:</h4>
              </label>
              <input
                type="text"
                id="name"
                className="inputBox"
                placeholder="Enter Name"
                {...register("name", {
                  // pattern: {
                  //   value: /^[A-Za-z]+$/,
                  //   message: "Invalid name format",
                  // },
                  required: "name is required",
                })}
              />
              <p className='error'>{errors.name?.message}</p>

              <label htmlFor="description">
                <h4>Description:</h4>
              </label>
              <input
                type="text"
                id="description"
                className="inputBox"
                placeholder="Enter Description"
                {...register("description", {
                  required: "description is required",
                })}
              />
              <p className='error'>{errors.description?.message}</p>
            </div>
            <div className='formSubmit'>
              <button className='close_btn close' onClick={closeModal}>Cancel</button>
              <button type="submit" className="btn add"> Submit</button>
            </div>
          </form>
        </div>
      </div>
     </div>
    </div>
    <div className='overlay'></div>
  </div>
  )
}

export default AddCategory