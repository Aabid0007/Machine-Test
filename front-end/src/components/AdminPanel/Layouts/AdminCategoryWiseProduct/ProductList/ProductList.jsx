import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import { getProducts, updateCategoryId } from '../../../../../Redux/Slices/Product.Slice';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

const ProductList = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const categoryId = location.state?.categoryId;
    const { product, loading, error } = useSelector((state) => state.product);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        if (!loading && categoryId && categoryId) {
            dispatch(getProducts({ categoryId }));
            dispatch(updateCategoryId(categoryId));
        }
    }, [dispatch, categoryId]);

    const handleCategoryEditModal = (productId) => {
        setProductId(productId);
        setEditModal(true);
    };

    const handleCategoryDeleteModal = (productId) => {
        setProductId(productId);
        setDeleteModal(true);
    };

    return (
        <div className="admin_category_section">
            <div className="container">
                <div className='categoryPage'>
                    <div className='contentHeading'>
                        <h3>Products</h3>
                    </div>
                    <div className='addContactBtn'>
                        <button className='addBtn' onClick={() => setAddModal(true)}><span className="fa-solid fa-plus">
                        </span><h4>Add Product</h4></button>
                    </div>
                    <div className='page_content_section_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Sl.No
                                    </th>
                                    <th>
                                        Product Name
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Price
                                    </th>
                                    <th>
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product[0] && product?.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td >{product.name}</td>
                                        <td>{product.description.length > 20 ? product.description.slice(0,20)+ ' ...': product.description}</td>
                                        <td>{'$' + product.price}</td>
                                        <td>
                                            <div className='contact_action'>
                                                <button className="contact_btn edit_btn" onClick={() => handleCategoryEditModal(product._id)} >
                                                    <span className="fa-solid fa-pen" />
                                                </button>
                                                <button className="contact_btn delete_btn" onClick={() => handleCategoryDeleteModal(product._id)}>
                                                    <span className="fa-regular fa-trash-can" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {product?.length === 0 && <p className='NoProduct'>No Product found</p>}
                    {
                        loading && <div className="loading"> Loading ... </div>
                    }
                    {
                        error && <div className="error"> {error} </div>
                    }
                    {
                        addModal && <AddProduct closeModal={() => setAddModal(false)} />
                    }
                    {
                        editModal && <EditProduct editModalClose={() => setEditModal(false)} productId={productId} />
                    }
                    {
                        deleteModal && <DeleteProduct deleteModalClose={() => setDeleteModal(false)} productId={productId} />
                    }
                    {
                        loading && <div className="loading"> Loading ... </div>
                    }
                    {
                        error && <div className="error"> {error} </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList