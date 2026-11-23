import React, { useState } from "react";
import { 
    apiDelete, 
    apiError,  
    CSRFInput, 
    CSRFToken,
    DateTime, 
    documentTitle, 
    profileImg,
    redirect, 
    route, 
    SafeHtml 
} from "@chappy/utils";

/**
 * Returns user details component.
 * 
 * @property {object} profileImage The profileImage object.
 * @property {object} user The user whose details wer are viewing.
 * @param {*} param0 
 * @returns 
 */
function Details({ profileImage, user }) {
    documentTitle(`${user.username} Details`);
    const [error, setError] = useState(null);
 
    async function onDeleteClick(e) {
        e.preventDefault();
        if(window.confirm(`Are you sure you want to delete the following user? ${user.username}`)) {
            try {
                const payload = {
                    csrf_token: CSRFToken(e)
                }
                const json = await apiDelete(`/admindashboard/delete/${user.id}`, payload);

                // Use route stored in json to redirect.
                redirect(json.redirect);
            } catch (err) {
                setError(apiError(err));
            }
        }
    }

    return (
        <>
            <h1 className="text-center">Details for {user.username}</h1>
            <div className="align-items-center justify-content-center mx-auto my-3 w-50">
                <a href={route('admindashboard.index')} className="btn btn-sm btn-secondary mb-3">Back</a>
                {profileImage &&
                    <img src={profileImg(profileImage.url)}
                        className="img-thumbnail mx-auto my-5 d-block w-50 rounded border border-primary shadow-lg">
                    </img>
                }
            </div>

            <div className="row align-items-center justify-content-center mx-auto my-3 w-50">
                <div className="col">
                    <table className="table table-striped table-bordered table-hover bg-light my-5 col-md-12">
                        <tbody>
                            <tr>
                                <th className="text-center">First Name</th>
                                <td className="text-center">{user.fname}</td>
                            </tr>
                            <tr>
                                <th className="text-center">Last Name</th>
                                <td className="text-center">{user.lname}</td>
                            </tr>
                            <tr>
                                <th className="text-center">E-mail</th>
                                <td className="text-center">{user.email}</td>
                            </tr>
                            <tr>
                                <th className="text-center">Status</th>
                                {user.inactive == 0 ? (
                                    <td className="text-center">Active</td>
                                ) : (
                                    <td className="text-center">Inactive</td>
                                )}
                            </tr>
                            <tr>
                                <th className="text-center">ACL</th>
                                <td className="text-center">{user.acl}</td>
                            </tr>
                            <tr>
                                <th className="text-center">Login Attempts</th>
                                <td className="text-center">{user.login_attempts}</td>
                            </tr>
                            <tr>
                                <th className="text-center">Password Reset</th>
                                {user.reset_password == 0 ? (
                                    <td className="text-center">Off</td>
                                ) : (
                                    <td className="text-center">On</td>
                                )}
                            </tr>
                            <tr>
                                <th className="text-center">Created</th>
                                <td title={DateTime.formatTime(user.created_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                    {DateTime.timeAgo(user.created_at)}
                                </td>
                            </tr>
                            <tr>
                                <th className="text-center">Last Update</th>
                                <td title={DateTime.formatTime(user.updated_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                    {DateTime.timeAgo(user.updated_at)}
                                </td>
                            </tr>
                            {user.description && (
                                <tr>
                                    <td id="description" className="p-4" colSpan={2}>
                                        <SafeHtml html={user.description} decode className="prose"/>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col col-md-4 mb-5">
                    <a href={route('admindashboard.edit', [user.id])} className="btn btn-info btn-sm mb-2 w-100 text-left">
                        <i className="fa fa-edit"></i> Edit User Profile
                    </a>
                    <a href={route('admindashboard.setResetPassword', [user.id])} className="btn btn-warning btn-sm my-2 w-100 text-left">
                        <i className="fa fa-key"></i> Reset Password
                    </a>
                    <a href={route('admindashboard.setStatus', [user.id])} className="btn btn-primary btn-sm mb-5 mt-2 w-100 text-left">
                        <i className="fa fa-unlock"></i> Set Account Status
                    </a>
                    {error ? (<p className="text-danger">{error}</p>) : 
                        <form method="POST" onSubmit={onDeleteClick}>
                            <CSRFInput />
                            <button type="submit" className="btn btn-danger btn-sm mt-5 w-100 text-left">
                                <i className="fa fa-trash"></i> Delete
                            </button>
                        </form>
                    }
                </div>
            </div>
        </>
    );
}        
export default Details;