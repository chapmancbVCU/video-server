import React, { useState } from "react";
import { apiError, apiDelete, CSRFInput, DateTime, documentTitle, route, CSRFToken } from "@chappy/utils";
import usePaginatedQuery from '@chappy/utils/usePaginatedQuery';
import Pagination, { PaginationSummary } from '@chappy/components/Pagination';

/**
 * Renders manage ACLs view.
 * 
 * @property {array} usedAcls The array of used ACLs.
 * @property {array} unUsedAcls The array of unUsedAcls ACLs.
 * @property {object} unusedPagination The unused acls pagination object.
 * @property {object} usedPagination The used acls pagination object.
 * @param {*} param0 
 * @returns {HTMLDivElement} View containing features for managing ACLs.
 */
function ManageAcls({ usedAcls, unUsedAcls, unusedPagination, usedPagination }) {
    documentTitle("Manage ACLs");
    // Paginated query for supporting traversal of pages without reload.
    const { data: unusedData, loading: usUsedLoading, error: unUsedError, goToPage: unusedToPage } = usePaginatedQuery({ unUsedAcls, unusedPagination });
    const { data: usedData, loading: usedLoading, error: usedError, goToPage: usedToPage } = usePaginatedQuery({ usedAcls, usedPagination });
    /**
     * Manages state for error.  Errors are generated when there is a failure 
     * deleting an ACL record.
     */
    const [error, setError] = useState(null);
    
    /**
     * Creates a click handler that deletes an ACL after the user confirms.
     *
     * On confirmation, sends a DELETE request with the CSRF token to
     * `/admindashboard/deleteAcl/{id}` and reloads the page so the list and any
     * flash message reflect the change. Errors are displayed with `setError`.
     *
     * @example
     * <button onClick={onDeleteClick(acl)}>Delete</button>
     *
     * @param {{ id: number, acl: string }} acl The ACL to delete.
     * @returns {(event: React.MouseEvent) => Promise<void>} Click handler for the delete button.
     */
    const onDeleteClick = (acl) => async (event) => {
        event.preventDefault();
        if(window.confirm(`Are you sure you want to delete the ACL: ${acl.acl}`)) {
            try {
                const payload = {
                    csrf_token: CSRFToken(event)
                }
                const json = await apiDelete(`/admindashboard/deleteAcl/${acl.id}`, payload);
                window.location.reload();
            } catch(err) {
                setError(apiError(err));
            }
        }
    }

    return (
        <>
            <h1 className="text-center mb-4">Manage ACLs
                <a href={route('admindashboard.editAcl', ['new'])} className="btn btn-primary btn-sm ms-3">
                    <i className="fa fa-plus"></i> Add ACL
                </a>
            </h1>
            
            {unUsedError && <div className="alert alert-danger" role="alert">{unUsedError}</div>}
            <PaginationSummary pagination={unusedData.unusedPagination} noun="acls not in use" />
            <div aria-busy={usUsedLoading} style={{ opacity: usUsedLoading ? 0.5 : 1, transition: 'opacity .15s' }}>
                <table className="table table-striped table-bordered table-hover mb-5">
                    <thead>
                        <tr>
                            <th className="text-center">ACL</th>
                            <th className="text-center">Created</th>
                            <th className="text-center">Updated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {unusedData.unUsedAcls.map((acl) => (
                            <tr key={acl.id}>
                                <>
                                    <td className="text-center w-50">{acl.acl}</td>
                                    <td title={DateTime.formatTime(acl.created_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                        {DateTime.timeAgo(acl.created_at)}
                                    </td>
                                    <td title={DateTime.formatTime(acl.updated_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                        {DateTime.timeAgo(acl.updated_at)}
                                    </td>
                                    <td className="text-center">
                                        <a href={route('admindashboard.editAcl', [acl.id])} className="btn btn-info btn-sm">
                                            <i className="fa fa-edit"></i> Edit ACL
                                        </a>
                                        {error ? (<p className="text-danger">{error}</p>) : 
                                            <form method="POST" onSubmit={onDeleteClick(acl)} className="d-inline-block">
                                                <CSRFInput />
                                                <button type="submit" className="btn btn-danger btn-sm">
                                                    <i className="fa fa-trash"></i> Delete
                                                </button>
                                            </form>
                                        }
                                    </td>
                                </> 
                            </tr>
                        ))}
                        {unusedData.unUsedAcls.length === 0 && (
                            <tr><td colSpan={4} className="text-center text-muted py-4">No unused ACLs.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination pagination={unusedData.unusedPagination} onPageChange={unusedToPage} />

            <h2 className="text-center">ACLs In Use</h2>
            {usedError && <div className="alert alert-danger" role="alert">{usedError}</div>}
            <PaginationSummary pagination={usedData.unusedPagination} noun="acls in use" />
            <div aria-busy={usedLoading} style={{ opacity: usedLoading ? 0.5 : 1, transition: 'opacity .15s' }}>
                <table className="table table-striped table-bordered table-hover mb-5">
                    <thead>
                        <tr>
                            <th className="text-center">ACL</th>
                            <th className="text-center">Created</th>
                            <th className="text-center">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usedData.usedAcls.map((acl) => (
                            <tr key={acl.id}>
                                <>
                                    <td className="text-center w-50">{acl.acl}</td>
                                    <td title={DateTime.formatTime(acl.created_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                        {DateTime.timeAgo(acl.created_at)}
                                    </td>
                                    <td title={DateTime.formatTime(acl.updated_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center">
                                        {DateTime.timeAgo(acl.updated_at)}
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination pagination={usedData.usedPagination} onPageChange={usedToPage} />
        </>
    );
}        
export default ManageAcls;