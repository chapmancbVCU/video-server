import React from "react";
import { 
    CSRFInput, 
    documentTitle, 
    DisplayErrors,
    FileSelector,
    RichText,
    route,
    SubmitTag
} from "@chappy/utils";

/**
 * The attachments form component.
 * 
 * @property {object} attachment The attachment object.
 * @property {object} errors The errors object.
 * @property {number|string} id The id of an existing record or the string "new" 
 * to tell the view we are uploading a file.
 * @param {*} param0 
 * @returns 
 */
function AttachmentsForm({ attachment, errors, id }) {
    const isNew = (id === 'new') ? true : false;
    const header = isNew ? "Add Attachment" : "Edit Attachment";
    attachment.description = (isNew) ? '' : attachment.description;
    documentTitle(header);

    return (
        <>
            <h1 className="text-center mb-4">{header}</h1>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 bg-light p-3">
                    <form className="form" action="" method="POST" encType="multipart/form-data">
                        <DisplayErrors errors={errors}/>
                        <CSRFInput />
                        <RichText 
                            label="Description"
                            name="description"
                            value={attachment.description}
                            inputAttrs={{className: 'form-control input-sm'}}
                            divAttrs={{className: 'form-group mb-3'}}
                        />
                        {isNew && (
                            <FileSelector 
                                label="Upload"
                                name="attachment_name"
                                inputAttrs={{className: 'form-control', accept: 'image/giv image/jpeg image/png'}}
                                outputAttrs={{className: 'form-group'}}
                            />
                        )}
                        <div className="col-md-12 text-end mt-3">
                            <a href={route('admindashboard.Attachments')} className="btn btn-default">Cancel</a>
                            <SubmitTag label="Save" inputAttrs={{className: 'btn btn-primary'}} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}        
export default AttachmentsForm;