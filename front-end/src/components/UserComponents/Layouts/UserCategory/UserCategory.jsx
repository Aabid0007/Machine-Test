import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../../Redux/Slices/Category.Slice';
import { useDispatch, useSelector } from 'react-redux';
import './UserCategory.css';
import { getProducts, updateCategoryName } from '../../../../Redux/Slices/Product.Slice';

const UserCategory = () => {
  const { category = [], loading } = useSelector((state) => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);


  useEffect(() => {
    if (category.length > 0 && !selectedCategoryId) {
      const { _id, name } = category[0];
      setSelectedCategoryId(_id);
      dispatch(getProducts(_id));
      dispatch(updateCategoryName(name));
    }

  }, [category, selectedCategoryId, dispatch]);


  const handleCategoryClick = (categoryId, categoryName) => {
    dispatch(updateCategoryName(categoryName));
    setSelectedCategoryId(categoryId);
    dispatch(getProducts(categoryId));
  };


  const handleNext = () => {
    if (startIndex < category.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="categories_banner">
      <div className="container">
        <div className="background_Img"></div>
        <div className="category_section">

          {/* Previous Button */}
          {category?.length > visibleCount && (
            <button
              className="fa-solid fa-chevron-left category_slide_btn"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
            </button>
          )}
          <div
            className="category_card">

            {/* Category List */}
            {!loading &&
              category?.slice(startIndex, startIndex + visibleCount).map((category) => (
                <span key={category._id}
                  onClick={() => {
                    handleCategoryClick(category._id, category.name)
                  }}
                  className={selectedCategoryId === category._id ? 'active_category' : ''}
                >{category.name}</span>
              ))}
          </div>

          {/* Next Button */}
          {category?.length > visibleCount && (
            <button
              className="fa-solid fa-chevron-right category_slide_btn"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= category.length}
            >
            </button>
          )}
          {
            loading && <div className="loading"  {...(loading ? { style: { padding: "19px 25px" } } : {})}> Loading... </div>
          }
          {
            category.length === 0 && !loading && <div className="no_category"> No Categories Found </div>
          }
        </div>
      </div>
    </div>
  );
};

export default UserCategory;