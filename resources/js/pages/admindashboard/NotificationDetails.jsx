import { DateTime, documentTitle, htmlspecialchars, route } from "@chappy/utils";
import React from "react";

/**
 * Renders Notification Details view.
 * 
 * @property {object} notification The notification whose details we are viewing.
 * @param {*} param0 
 * @returns {HTMLDivElement} Contents of Notification Details view.
 */
function NotificationDetails({ notification }) {
    const data = JSON.parse(notification.data);
    documentTitle(`Notification ID: ${notification.id} Details`);

    return (
        <>
            <a href={route('admindashboard.notifications')} className="me-5 btn btn-sm btn-secondary">Back</a>
            <h1 className="text-center">Notification Details</h1>
            <div className="d-flex justify-content-center w-75 mx-auto">
                <table className="table table-striped table-bordered table-hover bg-light my-5 col-md-12">
                    <tbody>
                        <tr>
                            <th scope="row" className="text-center w-25">ID</th>
                            <td className="text-center" colSpan={2}>{notification.id}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Type</th>
                            <td className="text-center" colSpan={2}>{ htmlspecialchars(notification.type)}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Notifiable Type</th>
                            <td className="text-center" colSpan={2}>{htmlspecialchars(notification.notifiable_type)}</td>
                        </tr>
                        <tr>
                            <th className="text-center align-middle">Data</th>
                            <td className="text-start">
                                {Object.entries(data).map(([k,v]) => (
                                    <div key={k}>"{k}": {v}</div>
                                ))}
                            </td>
                        </tr>
                        {notification.read_at && (
                            <tr>
                                <th scope="row" className="text-center w-25">Read At</th>
                                <td title={DateTime.formatTime(notification.read_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                    {DateTime.formatTime(notification.read_at, DateTime.FORMAT_HUMAN_READABLE)}
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th scope="row"className="text-center w-25">Created At</th>
                            <td title={DateTime.formatTime(notification.created_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                {DateTime.formatTime(notification.created_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Updated At</th>
                            <td title={DateTime.formatTime(notification.updated_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                {DateTime.formatTime(notification.updated_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}        
export default NotificationDetails;