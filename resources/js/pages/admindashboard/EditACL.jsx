import { CSRFInput, documentTitle, route, SubmitTag, Text } from "@chappy/utils";
import React from "react";

/**
 * Renders form for adding/editing an ACL.
 * 
 * @property {object} acl The acl object.
 * @property {object} errors The errors object
 * @property {number|string} id The id of an existing record or the string "new" 
 * to tell the view we are creating a new record.
 * @param {} param0 
 * @returns 
 */
function EditACL({ acl, errors, id }) {
    const isNew = (id === 'new') ? true : false;
    const header = isNew ? "Add ACL" : "Edit ACL";
    documentTitle(header);

    return (
        <>
            <h1 className="text-center">{header}</h1>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 bg-light p-3">
                    <form className="form" action="" method="POST">
                        <CSRFInput />
                        <Text 
                            label="ACL"
                            name="acl"
                            value={acl.acl}
                            inputAttrs={{className: 'form-control input-sm'}}
                            divAttrs={{className: 'form-group'}}
                            errors={errors}
                        />
                        <div className="col-md-12 text-end pt-3">
                            <a href={route('admindashboard.manageAcls')} className="btn btn-default">Cancel</a>
                            <SubmitTag label="Save" inputAttrs={{className: 'btn btn-primary'}} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}        
export default EditACL;