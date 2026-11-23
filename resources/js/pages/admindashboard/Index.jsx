import React, { useEffect, useState } from 'react';
import { DateTime, documentTitle, route } from '@chappy/utils';
import usePaginatedQuery from '@chappy/utils/usePaginatedQuery';
import Pagination, { PaginationSummary, SortableTh } from '@chappy/components/Pagination';
import SafeHtml from '@chappy/components/SafeHtml';

/**
 * Admin dashboard: searchable, filterable, sortable, paginated user list.
 *
 * @param {object} props
 * @param {object[]} props.users Current page of users (DashboardService::userToArray()).
 * @param {object} props.pagination Pagination::toArray().
 * @param {object} props.filter SearchFilter::toArray().
 * @param {{value: string, label: string}[]} props.aclOptions Access level options.
 * @param {{value: string, label: string}[]} props.statusOptions Status options.
 * @param {string} [props.widgetsHtml] Server-rendered dashboard widgets.
 * @returns {JSX.Element}
 */
export default function Index({
    users = [],
    pagination,
    filter,
    aclOptions = [],
    statusOptions = [],
    widgetsHtml = '',
}) {
    documentTitle('Administration');

    const { data, params, loading, error, update, goToPage, reset } =
        usePaginatedQuery({ users, pagination, filter });

    const searchParam = data.filter?.params?.search ?? 'q';
    const filters = data.filter?.filters ?? {};

    // Search box is local until submitted; resync on back/forward or Clear.
    const [term, setTerm] = useState(params[searchParam] ?? '');
    useEffect(() => setTerm(params[searchParam] ?? ''), [params[searchParam]]);

    function onSearch(e) {
        e.preventDefault();
        update({ [searchParam]: term.trim() });
    }

    function onSort(column, dir) {
        const { sort, dir: dirParam } = data.filter?.params ?? { sort: 'sort', dir: 'dir' };
        update({ [sort]: column, [dirParam]: dir });
    }

    const showClear = data.filter?.active || Object.keys(params).length > 0;

    return (
        <>
            <h1 className="text-center">Administration Dashboard</h1>

            <form className="row g-2 mb-3 align-items-end" onSubmit={onSearch} role="search">
                <div className="col-md-5">
                    <label htmlFor="q" className="form-label">Search</label>
                    <input
                        type="search"
                        id="q"
                        className="form-control"
                        placeholder="Username, email, or name"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="acl" className="form-label">Access Level</label>
                    <select
                        id="acl"
                        className="form-select"
                        value={filters.acl ?? ''}
                        onChange={(e) => update({ acl: e.target.value })}
                    >
                        <option value="">All</option>
                        {aclOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inactive" className="form-label">Status</label>
                    <select
                        id="inactive"
                        className="form-select"
                        value={filters.inactive ?? ''}
                        onChange={(e) => update({ inactive: e.target.value })}
                    >
                        <option value="">All</option>
                        {statusOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3 d-flex gap-2">
                    <button type="submit" className="btn btn-primary flex-fill">
                        <i className="fa fa-search"></i> Search
                    </button>
                    {showClear && (
                        <button type="button" className="btn btn-outline-secondary flex-fill" onClick={reset}>
                            Clear
                        </button>
                    )}
                </div>
            </form>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <PaginationSummary pagination={data.pagination} noun="users" />

            <div aria-busy={loading} style={{ opacity: loading ? 0.5 : 1, transition: 'opacity .15s' }}>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <SortableTh column="username" filter={data.filter} onSort={onSort}>Username</SortableTh>
                            <SortableTh column="acl" filter={data.filter} onSort={onSort}>Access Level</SortableTh>
                            <SortableTh column="inactive" filter={data.filter} onSort={onSort}>Status</SortableTh>
                            <SortableTh column="created_at" filter={data.filter} onSort={onSort}>Created</SortableTh>
                            <SortableTh column="updated_at" filter={data.filter} onSort={onSort}>Last Update</SortableTh>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>
                                    {user.acl.length === 0
                                        ? <span className="text-muted">—</span>
                                        : user.acl.map((acl) => (
                                            <span key={acl} className="badge text-bg-secondary me-1">{acl}</span>
                                        ))}
                                </td>
                                <td>{user.inactive ? 'Inactive' : 'Active'}</td>
                                <td title={DateTime.formatTime(user.created_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                    {DateTime.timeAgo(user.created_at)}
                                </td>
                                <td title={DateTime.formatTime(user.updated_at, DateTime.FORMAT_HUMAN_READABLE)}>
                                    {DateTime.timeAgo(user.updated_at)}
                                </td>
                                <td className="text-center">
                                    <a href={route('admindashboard.details', [user.id])} className="btn btn-info btn-sm w-100">
                                        <i className="fa fa-user"></i> Details
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {data.users.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center text-muted py-4">
                                    {data.filter?.active ? 'No users match your search.' : 'No other users yet.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination pagination={data.pagination} onPageChange={goToPage} />

            {widgetsHtml && (
                <SafeHtml html={widgetsHtml} className="widget-container" decode={false} addTargetBlank={false} />
            )}
        </>
    );
}
