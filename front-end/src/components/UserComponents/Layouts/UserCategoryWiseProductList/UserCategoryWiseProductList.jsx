import React from 'react';
import LeftSideImg from '../../../../assets/image 39 (1) 1.png';
import RightSideImg from '../../../../assets/cocktail1 1.png';
import {  useSelector } from 'react-redux';

import './UserCategoryWiseProductList.css';

const UserCategoryWiseProductList = () => {

    const { products, loadingList, categoryName } = useSelector((state) => state.product);
  const { categories=[] } = useSelector((state) => state.category);

    return (
        <div className='category_wise_product'>
            <div className="container">
                <div className='product_list_section'>
                    <div className='product_section_bg_img'></div>
                    <div className='left_side_img'></div>
                    <div className='right_side_img'></div>
                    <div className="product_section">
                        <div className='product_list'>
                            <div className='left_side_top_img'>
                                <img src={LeftSideImg} alt="" />
                            </div>
                            <div className='heading'>
                                <h1>{categoryName ? categoryName + " COCKTAILS" : '\u00A0'}</h1>
                            </div>
                            <div className="products">
                                {!loadingList && products?.map((product) => (
                                    <div className='product_text' key={product._id}>
                                        <div className='product_names' >
                                            <div className='product_name'>
                                                
                                                <h3>{product.name} </h3>
                                            </div>
                                            <div> <span className="price">{`$` + product.price}</span></div>
                                        </div>
                                        <p>{product.description}</p>
                                    </div>
                                ))}
                            </div>
                                {
                                    (!categories.length || loadingList) &&  <div className="loading_showing"> Loading ... </div>
                                }
                                {
                                   categories.length > 0 && products.length === 0 && !loadingList && <div className="no_product"> No Items Found </div>
                                }
                            <div className='right_side_bottom_img'>
                                <img src={RightSideImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCategoryWiseProductList