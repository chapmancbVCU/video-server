import React from "react";
import { documentTitle, ProfileImageSorter, route } from '@chappy/utils';
import * as Forms from '@chappy/components/Forms'

/**
 * Renders edit view for administrators.
 * 
 * @property {object} acls The acls for the form.
 * @property {object} errors The errors.
 * @property {object} profileImages The user's profile images.
 * @property {object} user The user to be modified.
 * @property {array} userAcls An array of user assigned acls.
 * @param {*} param0 
 * @returns 
 */
function Edit({ acls, errors, profileImages, user, userAcls }) {
    documentTitle(`Edit Details for ${user.username}`);

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Edit Details for {user.username}</h1>
                <hr />
                <form className="form" action="" method="post">
                    <Forms.CSRFInput />
                    <Forms.DisplayErrors errors={errors}/>

                    <Forms.Text
                        label="First Name"
                        name="fname"
                        value={user.fname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Text 
                        label="Last Name"
                        name="lname"
                        value={user.lname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Email 
                        label="Email"
                        name="email"
                        value={user.email}
                        inputAttrs={{className: 'form-control input-sm', placeholder: 'joe@example.com'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.RichText
                        label="Description"
                        name="description"
                        value={user.description}
                        inputAttrs={{ placeholder: 'Describe yourself here...' }}
                        divAttrs={{ className: 'form-group mb-3' }}
                    />
                    <div className="form-group mb-3">
                        <label>Manage ACLs:</label>
                        <Forms.CheckboxGroup 
                            name='acls'
                            options={acls}
                            selectedValues={userAcls}
                            divAttrs={{className: 'form-check'}}
                        />
                    </div>
                    <ProfileImageSorter initialImages={profileImages} deleteEndpoint="/profile/deleteImage" />
                    <div className="col-md-12 text-end">
                        <a href={route('admindashboard.details', [user.id])} className="btn btn-default">Cancel</a>
                        <Forms.SubmitTag label={"Submit"} inputAttrs={{className: 'btn btn-primary'}}/>
                    </div>
                </form>
            </div>
        </div>
    );
}        
export default Edit;