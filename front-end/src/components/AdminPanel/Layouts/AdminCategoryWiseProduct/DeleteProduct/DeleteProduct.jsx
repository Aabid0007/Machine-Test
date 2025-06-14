import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../../../Redux/Slices/Product.Slice';
import { toast } from 'react-toastify';

const DeleteProduct = ({ deleteModalClose, productId }) => {

    const dispatch = useDispatch();

    const deleteBtn = async () => {
        try {
            await dispatch(deleteProduct(productId)).unwrap();             
            deleteModalClose();
             toast.success('Item Deleted successfully!');
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
                        <h2>Delete Product</h2>
                    </div>
                    <p className='paragraph'>Are you sure you want to delete this Product?</p>
                    <div className='formSubmit'>
                        <button type="submit" className="btn delete" onClick={deleteBtn}> Delete </button>
                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    )
}

export default DeleteProduct