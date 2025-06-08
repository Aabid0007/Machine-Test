import React, { useEffect, useState } from 'react'
import AddCategory from './AddCategory/AddCategory'
import EditCategory from './EditCategory/EditCategory';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../Redux/Slices/Category.Slice';
import "./AdminCategory.css";
import '../../Common/AdminMediaQuery.css'
import { useNavigate } from 'react-router-dom';

const AdminCategory = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/admin/category/${categoryId}/products`);
  };
  const handleCategoryEditModal = (categoryId) => {
    setCategoryId(categoryId);
    setEditModal(true);
  };

  const handleCategoryDeleteModal = (categoryId) => {
    setCategoryId(categoryId);
    setDeleteModal(true);
  };

  return (
    <div className="admin_category_section">
      <div className="container">
        <div className='categoryPage'>
          <div className='contentHeading'>
            <h3>Categories</h3>
          </div>
          <div className='addCategoryBtn'>
            <button className='addBtn' onClick={() => setAddModal(true)}>
              <span className="fa-solid fa-plus"></span>
              <h4>Add Category</h4>
            </button>
          </div>
          <div className='page_content_section_table'>
            <table>
              <thead>
                <tr>
                  <th>
                    Sl.No
                  </th>
                  <th>
                    Category Name
                  </th>
                  <th>
                    Category Des..
                  </th>
                  <th>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories[0] && categories?.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td className='cursor_pointer' onClick={() => handleCategoryClick(category._id)}>
                      <div className='items_btn'>
                        {category.name}
                      <button className='cursor_pointer'>Items</button>
                      </div>
                    </td>
                    <td>{category.description}</td>
                    <td>
                      <div className='category_action'>
                        <button className="category_btn edit_btn" onClick={() => handleCategoryEditModal(category._id)} >
                          <span className="fa-solid fa-pen" />
                        </button>
                        <button className="category_btn delete_btn" onClick={() => handleCategoryDeleteModal(category._id)}>
                          <span className="fa-regular fa-trash-can" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            !loading && categories?.length === 0 && <div className='NoProduct'>No Category found</div>
          }
          {
            !categories.length && loading && <div className="loading"> Loading ... </div>
          }
          {
            error && <div className="error"> {error} </div>
          }
          {addModal && <AddCategory closeModal={() => { setAddModal(false) }} />}
          {editModal && <EditCategory editModalClose={() => { setEditModal(false) }} categoryId={categoryId} />}
          {deleteModal && <DeleteCategory deleteModalClose={() => { setDeleteModal(false) }} categoryId={categoryId} />}
        </div>
      </div>
    </div>
  )
}

export default AdminCategory