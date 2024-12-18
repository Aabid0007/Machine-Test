import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../../Redux/Slices/Category.Slice';
import { useDispatch, useSelector } from 'react-redux';
import './UserCategory.css';
import { updateCategoryId, updateCategoryName } from '../../../../Redux/Slices/Product.Slice';

const UserCategory = () => {
  const { category, loading } = useSelector((state) => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);

  useEffect(() => {
    if (category.length > 0 && !selectedCategoryId) {
      const firstCategory = category[0];
      setSelectedCategoryId(firstCategory._id);
      dispatch(updateCategoryId(firstCategory._id));
      dispatch(updateCategoryName(firstCategory.name));
    }
  }, [category, selectedCategoryId, dispatch]);


  const handleCategoryClick = (categoryId, categoryName) => {
    dispatch(updateCategoryName(categoryName))
    setSelectedCategoryId(categoryId);
    dispatch(updateCategoryId(categoryId))
  };
  console.log(category);


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
          {category.length > visibleCount && (
            <button
              className="fa-solid fa-chevron-left category_slide_btn"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >

            </button>
          )}
         <div className='category_card'>
         {category.slice(startIndex, startIndex + visibleCount).map((category) => (
            <span key={category._id}
              onClick={() => {
                handleCategoryClick(category._id, category.name)
              }}
              className={selectedCategoryId === category._id ? 'active_category' : ''}
            >{category.name}</span>
          ))}
          {
            loading && <div className="loading_showing"> Loading ... </div>
          }
         </div>
          {category.length > visibleCount && (
            <button
              className="fa-solid fa-chevron-right category_slide_btn"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= category.length}
            >
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCategory;