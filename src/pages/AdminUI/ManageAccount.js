import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../StaffUI/PagesStyle.css';
import AccountNew from '../../components/OffCanvas/AccountNew.js';
import AccountEdit from '../../components/OffCanvas/AccountEdit.js';

function ManageAccount() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back" />
                <div className='menu-add-button-line'>
                    <h2>Manage Accounts</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                            Add Account
                    </Button>
                </div>


                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Created At</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>username1</td>
                                <td>2022/10/23:00:12</td>
                                <td>Admin</td>
                                <td>Some Name</td>
                                <td>somename@gmail.com</td>
                                <td>0837466647</td>
                                <td>
                                    <img src={require('../../assets/images/edit.png')} onClick={() => handleShowEdit({ id: 1, username: 'username1', fname: 'Some',lname:'Name', email: 'somename@gmail.com', phone: '0837466647' })} className='edit-btn' alt="Edit"/>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>

                

               

                <AccountNew show={showAdd} handleClose={handleCloseAdd} />
                <AccountEdit show={showEdit} handleClose={handleCloseEdit} item={selectedItem} />
            </div>
        </div>
    );
}

export default ManageAccount;