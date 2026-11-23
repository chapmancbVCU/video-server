import { apiDelete, apiError, CSRFInput, CSRFToken, DateTime, documentTitle, route } from "@chappy/utils";
import React, { useState } from "react";
import Pagination, { PaginationSummary } from "@chappy/components/Pagination";

/**
 * Renders notifications view.
 * 
 * @property {object} pagination The serialized state of paginated data for React.vs views.
 * @property {array} notifications The list of notifications within the database channel..
 * @param {*} param0 
 * @returns {HTMLDivElement} View containing features for notifications. 
 */
function Notifications({ notifications, pagination }) {
    documentTitle("Notifications");

    /**
     * Manages state for error.  Errors are generated when there is a failure 
     * deleting a notification record.
     */
    const [error, setError] = useState(null);

    const onDeleteClick = (notification) => async (event) => {
        event.preventDefault();
        console.log(notification.id)
        if(window.confirm('Are you sure you want to delete this notification?')) {
            try {
                const payload = {
                    csrf_token: CSRFToken(event)
                }
                const json = await apiDelete(`/admindashboard/deleteNotification/${notification.id}`, payload);
                window.location.reload();
            } catch (err) {
                setError(apiError(err));
            }
        }
    }

    return (
        <>
            <h1 className="text-center mb-5">Notifications</h1>

            {notifications.length > 0 ? (
                <div className="w-75 mx-auto d-flex flex-column justify-content-center">
                    <PaginationSummary pagination={pagination} noun="notifications" />
                    <table className="table table-striped table-bordered table-hover table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification) => (
                                <tr key={notification.id}>
                                    <td>{notification.id}</td>
                                    <td>{notification.type}</td>
                                    <td title={DateTime.formatTime(notification.created_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                        {DateTime.timeAgo(notification.created_at)}
                                    </td>
                                    <td title={DateTime.formatTime(notification.updated_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                        {DateTime.timeAgo(notification.updated_at)}
                                    </td>
                                    <td className="d-flex gap-3 justify-content-center">
                                        <a href={route('admindashboard.NotificationDetails', [notification.id])} className="btn btn-primary btn-sm">
                                            <i className="fa fa-info"></i> Details
                                        </a>
                                        {error ? (<p className="text-danger">{error}</p>) :
                                            <form method="POST" onSubmit={onDeleteClick(notification)} className="d-inline-block">
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
            ) : (
                <h3 className="text-center">There are no pending notifications within the database channel.</h3>
            )}
        </>
    );
}        
export default Notifications;