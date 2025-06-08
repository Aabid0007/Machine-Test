import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getProducts } from '../../../../../Redux/Slices/Product.Slice';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

const ProductList = () => {
    const { products,loadingList, error } = useSelector((state) => state.product);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productId, setProductId] = useState('');
    const dispatch = useDispatch();
    const { categoryId } = useParams();

    useEffect(() => {
        if (categoryId) {
            dispatch(getProducts(categoryId));
        }
    }, [dispatch, categoryId ]);


    const handleCategoryEditModal = (productId) => {
        setProductId(productId);
        setEditModal(true);
    };

    const handleCategoryDeleteModal = (productId) => {
        setProductId(productId);
        setDeleteModal(true);
    };
    
if (loadingList) {
    return <div className="loading">Loading...</div>
  }

    return (
        <div className="admin_category_section">
            <div className="container">
                <div className='categoryPage'>
                    <div className='contentHeading'>
                        <h3>Products</h3>
                    </div>
                    <div className='addCategoryBtn'>
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
                                {products[0] && products?.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td >{product.name}</td>
                                        <td>{product.description.length > 20 ? product.description.slice(0, 20) + ' ...' : product.description}</td>
                                        <td>{'$' + product.price}</td>
                                        <td>
                                            <div className='category_action'>
                                                <button className="category_btn edit_btn" onClick={() => handleCategoryEditModal(product._id)} >
                                                    <span className="fa-solid fa-pen" />
                                                </button>
                                                <button className="category_btn delete_btn" onClick={() => handleCategoryDeleteModal(product._id)}>
                                                    <span className="fa-regular fa-trash-can" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!loadingList && products?.length === 0 && <div className='NoProduct'>No Items found</div>}
                    {
                        !products.length && loadingList && <div className="loading"> Loading ... </div>
                    }
                    {
                        error && <div className="error"> {error} </div>
                    }
                    {
                        addModal && <AddProduct closeModal={() => setAddModal(false)} categoryId={categoryId} />
                    }
                    {
                        editModal && <EditProduct editModalClose={() =>
                            setEditModal(false)}
                            productId={productId}
                            categoryId={categoryId}
                        />
                    }
                    {
                        deleteModal && <DeleteProduct deleteModalClose={() => setDeleteModal(false)} productId={productId} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList