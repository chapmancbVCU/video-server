import React, { useState } from "react";
import { apiDelete, apiError, CSRFInput, CSRFToken, DateTime, documentTitle, route } from "@chappy/utils";
import usePaginatedQuery from '@chappy/utils/usePaginatedQuery';
import Pagination, { PaginationSummary } from '@chappy/components/Pagination';

/**
 * Renders Queue Manager view.
 * 
 * @property {object} pagination The serialized state of paginated data for React.vs views.
 * @property {array} queue The list of queued jobs.
 * @param {*} param0 
 * @returns {HTMLDivElement} View containing features for managing queues. 
 */
function QueueManager({ pagination, queue }) {
    documentTitle("Queue Manager");

    // Paginated query for supporting traversal of pages without reload.
    const { data, loading, error, goToPage } = usePaginatedQuery({ queue, pagination });

    /**
     * Manages state for error.  Errors are generated when there is a failure 
     * deleting a Queue record.
     */
    const [formError, setFormError] = useState(null);

    /**
         * Creates a click handler that deletes a job after the user confirms.
         *
         * On confirmation, sends a DELETE request with the CSRF token to
         * `/admindashboard/deleteJob/{id}` and reloads the page so the list and any
         * flash message reflect the change. Errors are displayed with `setError`.
         *
         * @example
         * <button onClick={onDeleteClick(job)}>Delete</button>
         *
         * @param {{ id: number, job: string }} job The job to delete.
         * @returns {(event: React.MouseEvent) => Promise<void>} Click handler for the delete button.
         */
    const onDeleteClick = (job) => async (event) => {
        event.preventDefault();
        if(window.confirm('Are you sure you want to delete this job?')) {
            try {
                const payload = {
                    csrf_token: CSRFToken(event)
                }
                const json = await apiDelete(`/admindashboard/deleteJob/${job.id}`, payload);
                window.location.reload();
            } catch(err) {
                setFormError(apiError(err));
            }
        }
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <h1 className="text-center mb-5">Queue Manager</h1>
            {queue.length > 0 ? (
                <div className="w-75 mx-auto d-flex flex-column justify-content-center" style={{ opacity: loading ? 0.5 : 1 }}>
                    <PaginationSummary pagination={data.pagination} noun="queue" />
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <th>Queue</th>
                                <th>Attempts</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.queue.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{job.queue}</td>
                                    <td>{job.attempts}</td>
                                    <td title={DateTime.formatTime(job.created_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                        {DateTime.timeAgo(job.created_at)}
                                    </td>
                                    <td title={DateTime.formatTime(job.updated_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                        {DateTime.timeAgo(job.updated_at)}
                                    </td>
                                    <td className="d-flex gap-3 justify-content-center">
                                        <a href={route('admindashboard.jobDetails', [job.id])} className="btn btn-primary btn-sm">
                                            <i className="fa fa-info"></i> Details
                                        </a>
                                        {formError ? (<p className="text-danger">{formError}</p>) : 
                                            <form method="POST" onSubmit={onDeleteClick(job)} className="d-inline-block">
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
                    <Pagination pagination={data.pagination} onPageChange={goToPage} />
                </div>
            ) : (
                <h3 className="text-center">There are no pending jobs in the queue table.</h3>
            )}
        </>
    );
}        
export default QueueManager;