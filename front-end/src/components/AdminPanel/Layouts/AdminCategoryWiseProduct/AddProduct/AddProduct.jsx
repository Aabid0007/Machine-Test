import React, { useEffect } from 'react'
import {  useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProducts } from '../../../../../Redux/Slices/Product.Slice';
import { getCategories } from '../../../../../Redux/Slices/Category.Slice';
import './AddProduct.css'

const AddProduct = ({ closeModal }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { category } = useSelector((state) => state.category);
     const { loading } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { categoryId } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    useEffect(() => {
        if (category && categoryId) {
            const selectedCategory = category.find(cat => cat._id === categoryId);
            if (selectedCategory) {
                setValue('category', categoryId);
            }
        }
    }, [category, categoryId, setValue]);

      const onSubmit = async (data) => {
        const formData = {
          name: data.name,
          description: data.description,
          price: data.price,
          categoryId: data.categoryId,
        };
    
        dispatch(createProduct(formData))
            .then(() => {
                dispatch(getProducts(data.categoryId));
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
                <div className='closeFrom'><button className="close_btn" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button></div>
                <div className="FormSection">
                    <div className="form_heading">
                        <h2>Add Product</h2>
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
                                        //     value: /^[A-Za-z]+$/,
                                        //     message: "Invalid name format",
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
                                <label htmlFor="price">
                                    <h4>Price:</h4>
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    className="inputBox"
                                    placeholder="Enter price"
                                    {...register("price", {
                                        required: "price is required",
                                    })}
                                />
                                <p className='error'>{errors.price?.message}</p>

                                <label htmlFor="category">
                                    <h4>Category:</h4>
                                </label>
                                <select name="categoryId" id="categoryId" defaultValue=""
                                    {...register("categoryId", {
                                        required: "category is required",
                                    })} >
                                    <option className='select_placeholder' value='' disabled >Select category</option>
                                    {category?.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                                <p className='error'>{errors.categoryId?.message}</p>
                            </div>

                            <div className='formSubmit'>
                                <button className='close_btn close' onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn add" disabled={loading} >Submit</button>
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

export default AddProduct