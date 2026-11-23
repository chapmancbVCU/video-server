import React from "react";
import SafeHtml from '@chappy/components/SafeHtml';
import { DateTime, route, documentTitle } from '@chappy/utils';

/**
 * Renders attachment details view.
 * 
 * @property {object} attachment The attachment object
 * @property {string} size The size of the file.
 * @property {object} uploader The upload of the attachment.
 * @param {*} param0 
 * @returns 
 */
function AttachmentDetails({ attachment, size, uploader }) {
    documentTitle("Details for " + attachment.attachment_name);
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 bg-light p-3">
                <a href={route('admindashboard.Attachments')}  className="btn btn-sm btn-secondary">Back</a>
                <h2 className="text-center">{attachment.attachment_name}</h2>
                <div className="row">
                    <div className="col-md-6">
                        <p title={DateTime.formatTime(attachment.created_at, DateTime.FORMAT_HUMAN_READABLE)}>
                            <strong>Created at: </strong>
                            {DateTime.timeAgo(attachment.created_at)}
                        </p>
                        <p title={DateTime.formatTime(attachment.updated_at, DateTime.FORMAT_HUMAN_READABLE)}>
                            <strong>Updated at: </strong>
                            {DateTime.timeAgo(attachment.updated_at)}
                        </p>
                        <p><strong>Size: </strong>{size}</p>
                        <p><strong>MIME Type: </strong>{attachment.mime_type}</p>
                        <p><strong>Uploader: </strong>{uploader.username}</p>
                        <div>
                            <strong>Description: </strong>
                            <SafeHtml html={attachment.description} decode className="prose"/>
                        </div>
                        <p>
                            <strong>Preview: </strong>
                            <a href={route('admindashboard.preview', [attachment.id])} target="_blank">
                                {attachment.attachment_name}    
                            </a> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default AttachmentDetails;