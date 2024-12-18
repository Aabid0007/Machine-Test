import React from 'react'

import { deleteCategory, getCategories } from '../../../../../Redux/Slices/Category.Slice';
import { useDispatch } from 'react-redux';
import "./DeleteCategory.css"
const DeleteCategory = ({ deleteModalClose, categoryId }) => {
    const dispatch = useDispatch();

    const deleteBtn = async () => {
        try {
            await dispatch(deleteCategory(categoryId));
            dispatch(getCategories());
            deleteModalClose();
            
        } catch (error) {
            console.error("Error deleting Category:", error);
        }
    }
    return (
        <div className='form_section'>
            <div className='DeleteForm'>
                <div className='closeFrom'><button className="close_btn" onClick={deleteModalClose}><i className="fa-solid fa-xmark"></i></button></div>
                <div className="deleteFormSection">
                    <div className="deleteHeading">
                        <h2>Delete Category</h2>
                    </div>
                    <p className='paragraph'>Are you sure you want to delete this Category?</p>
                    <div className='formSubmit'>
                        <button type="submit" className="btn delete" onClick={deleteBtn}> Delete </button>
                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    )
}

export default DeleteCategory