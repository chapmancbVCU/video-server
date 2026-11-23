import React, { useState } from "react";
import { documentTitle, route, CSRFInput, CSRFToken, apiError, apiDelete } from "@chappy/utils";
import Pagination, { PaginationSummary } from "@chappy/components/Pagination";

/**
 * Renders list of all attachments that have been uploaded.
 * 
 * @property {array} attachments An array of attachments available
 * @param {*} param0 
 * @returns {HTMLDivElement} View for listing and managing Email Attachments.
 */
function Attachments({ attachments, pagination }) {
    documentTitle("Attachments");

    /**
     * Manages state for error.  Errors are generated when there is a failure 
     * deleting an Attachments record.
     */
    const [error, setError] = useState(null);

    /**
     * Creates a click handler that deletes an Attachment after the user confirms.
     *
     * On confirmation, sends a DELETE request with the CSRF token to
     * `/admindashboard/deleteAttachment/{id}` and reloads the page so the list and any
     * flash message reflect the change. Errors are displayed with `setError`.
     *
     * @example
     * <button onClick={onDeleteClick(acl)}>Delete</button>
     *
     * @param {{ id: number, attachment: string }} attachment The Attachment to delete.
     * @returns {(event: React.MouseEvent) => Promise<void>} Click handler for the delete button.
     */
    const onDeleteClick = (attachment) => async (event) => {
        event.preventDefault();
        if(window.confirm(`Are you sure you want to delete the attachment: ${attachment.name}`)) {
            try {
                const payload = {
                    csrf_token: CSRFToken(event)
                }
                const json = await apiDelete(`/admindashboard/deleteAttachment/${attachment.id}`, payload);
                window.location.reload();
            } catch(err) {
                setError(apiError(err));
            }
        }
    }

    return (
        <>
            <h1 className="text-center mb-4">Attachments
                <a href={route('admindashboard.editAttachments', ['new'])} className="btn btn-primary btn-sm ms-3">
                    <i className="fa fa-plus"></i> Add Attachment
                </a>
            </h1>
            <div className="d-flex flex-column w-75 mx-auto justify-content-center">
                <PaginationSummary pagination={pagination} noun="attachments" />
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Original Name</th>
                            <th>Uploader</th>
                            <th>size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {attachments.map((attachment) => (
                            <tr key={attachment.id}>
                                <td>
                                    <a href={route('admindashboard.attachmentDetails', [attachment.id])}>
                                        {attachment.attachment_name}
                                    </a>
                                </td>
                                <td>{attachment.uploadUsername}</td>
                                <td>{attachment.formattedBytes}</td>
                                <td className="text-end">
                                    <a href={route('admindashboard.editAttachments', [attachment.id])}
                                        className="btn btn-secondary btn-sm"><i className="fas fa-edit"></i> Edit
                                    </a>
                                    {error ? (<p className="text-danger">{error}</p>) : 
                                        <form method="POST" onSubmit={onDeleteClick(attachment)} className="d-inline-block">
                                            <CSRFInput />
                                            <button type="submit" className="btn btn-danger btn-sm">
                                                <i className="fa fa-trash"></i> Delete
                                            </button>
                                        </form>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination pagination={pagination} />
            </div>
        </>
    );
}        
export default Attachments;