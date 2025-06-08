import React, { useEffect } from 'react'
import { editCategory, getCategoryById } from '../../../../../Redux/Slices/Category.Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


const EditCategory = ({ editModalClose, categoryId }) => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.category);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await dispatch(getCategoryById(categoryId)).unwrap();
        setValue("name", data.name || '');
        setValue("description", data.description || '');
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };
    fetchCategoryData();
  }, [categoryId, dispatch, setValue]);


  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data.name,
        description: data.description,
      };
      await dispatch(editCategory({ id: categoryId, data: formData })).unwrap();
      editModalClose();
      toast.success('Category Updated successfully!');
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };


  return (
    <div className='form_product_section'>
      <div className="Add_product_Form">
        <div className='add_product_section'>
          <div className='closeFrom'>
            <button className="close_btn" onClick={editModalClose}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="FormSection">
            <div className="form_heading">
              <h2>Edit Category</h2>
            </div>
            {loading ? (<div className="loading"> Loading ... </div>
            ) : (
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
                    <button className='close_btn close' onClick={editModalClose}>Cancel</button>
                    <button type="submit" className="btn add" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='overlay'></div>
    </div>
  )
}

export default EditCategory