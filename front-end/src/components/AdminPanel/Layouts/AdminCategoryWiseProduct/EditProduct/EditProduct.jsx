import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProductById, getProducts } from '../../../../../Redux/Slices/Product.Slice';
import { getCategories } from '../../../../../Redux/Slices/Category.Slice';

const EditProduct = ({ editModalClose, productId }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { category } = useSelector((state) => state.category);
  const { categoryId } = useSelector((state) => state.product);
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        const fetchCategoryData = async () => {
          try {
            const actionResult = await dispatch(getProductById(productId));
            const productData = actionResult.payload.data;
            if (productData) {
              setValue("name", productData.name || '');
              setValue("description", productData.description || '');
              setValue("price", productData.price || '');
              setValue("categoryId", productData.categoryId || '');
            }
          } catch (error) {
            console.error("Error fetching Category data:", error);
          }
        };
    
        fetchCategoryData();
      }, [productId, dispatch, setValue]);

     const onSubmit = async (data) => {
      try {
        const formData = {
            name: data.name,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
          };
          await dispatch(editProduct({ id: productId, data: formData }));
          const result = await dispatch(getProducts({ categoryId }));
          console.log('Fetched products:', result); 
          editModalClose();
          
      } catch (error) {
        console.error("Error updating Category:", error);
      }
      };
  return (
    <div className='form_product_section'>
            <div className="Add_product_Form">
                <div className='add_product_section'>
                <div className='closeFrom'><button className="close_btn" onClick={editModalClose}><i className="fa-solid fa-xmark"></i></button></div>
                <div className="FormSection">
                    <div className="form_heading">
                        <h2>Edit Product</h2>
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
                                    <option value="" disabled>Select category</option>
                                    {category?.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                                <p className='error'>{errors.categoryId?.message}</p>
                            </div>
                            <div className='formSubmit'>
                                <button className='close_btn close' onClick={editModalClose}>Cancel</button>
                                <button type="submit" className="btn add" > Submit</button>
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

export default EditProduct