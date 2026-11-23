import React from "react";
import { CheckBoxLeftLabel, CSRFInput, documentTitle, route, SubmitTag } from "@chappy/utils";

/**
 * Renders set account status view.
 * 
 * @property {boolean} checked The checked status for the checkbox.
 * @property {object} errors The errors object.
 * @property {object} users The users object.
 * @param {*} param0 
 * @returns 
 */
function SetAccountStatus({ checked, errors, user }) {
    const title = `Set status for ${user.username}`;
    documentTitle(title);
    return (
        <>
            <h1 className="text-center">{title}</h1>

            <div className="row align-items-center justify-content-center">
                <div className="col-md-3 bg-light p-3">
                    <form className="form" method="POST" action="">
                        <CSRFInput />
                        <CheckBoxLeftLabel 
                            label="Select to activate/deactivate account"
                            name="inactive"
                            value="on"
                            checked={checked}
                            divAttrs={{className: 'form-group mb-3'}}
                            errors={errors}
                        />
                        <div className="col-md-12 text-end pt-3">
                            <a href={route('admindashboard.details', [user.id])} className="btn btn-default">Cancel</a>
                            <SubmitTag label="Submit" inputAttrs={{className: 'btn btn-primary'}} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}        
export default SetAccountStatus;