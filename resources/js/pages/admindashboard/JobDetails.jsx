import { documentTitle, htmlspecialchars, route } from "@chappy/utils";
import { DateTime } from "@chappy/utils/datetime";
import React from "react";

/**
 * Renders Job Details view.
 * 
 * @property {object} job The job whose details we are viewing.
 * @param {*} param0 
 * @returns {HTMLDivElement} Contents of Job Details view.
 */
function JobDetails({ job }) {
    const payload = JSON.parse(job.payload);
    documentTitle(`Job ID: ${job.id} Details`);
    return (
        <>
            <a href={route('admindashboard.queueManager')} className="ms-5 btn btn-sm btn-secondary">Back</a>
            <h1 className="text-center">Queued Job Details</h1>
            <div className="d-flex justify-content-center w-75 mx-auto">
                <table className="table table-striped table-bordered table-hover bg-light my-5 col-md-12">
                    <tbody>
                        <tr>
                            <th scope="row" className="text-center w-25">ID</th>
                            <td className="text-center" colSpan={2}>{job.id}</td>
                        </tr>
                        <tr>
                            <th className="text-center w-25">Queue</th>
                            <td>{htmlspecialchars(job.queue)}</td>
                        </tr>
                        <tr>
                            <th scope="row" rowSpan={4} className="text-center w-25">Payload</th>
                            <td className="text-end">Job:</td>
                            <td>{htmlspecialchars(payload.job)}</td>
                        </tr>
                        <tr>
                            <td className="text-end">"data":</td>
                            <td className="text-start">
                                {Object.entries(payload.data).map(([k, v]) => (
                                    <p key={k}>"{k}": {v}</p>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-end w-25">"available_at":</td>
                            <td title={DateTime.formatTime(payload.available_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-start">
                                {DateTime.formatTime(payload.available_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center w-25">"max_attempts":</td>
                            <td className="text-start">{payload.max_attempts}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Attempts</th>
                            <td className="text-center" colSpan={2}>{job.attempts}</td>
                        </tr>
                        {job.reserved_at && (
                            <tr>
                                <th scope="row" className="text-center w-25">Reserved At</th>
                                <td title={DateTime.formatTime(job.reserved_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                    {DateTime.formatTime(job.reserved_at, DateTime.FORMAT_HUMAN_READABLE)}
                                </td>
                            </tr>
                        )}
                        {job.failed_at && (
                            <tr>
                                <th scope="row" className="text-center w-25">Failed At</th>
                                <td title={DateTime.formatTime(job.failed_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                    {DateTime.formatTime(job.failed_at, DateTime.FORMAT_HUMAN_READABLE)}
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th scope="row" className="text-center w-25">Available At</th>
                            <td title={DateTime.formatTime(job.available_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                {DateTime.formatTime(job.available_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"className="text-center w-25">Created At</th>
                            <td title={DateTime.formatTime(job.created_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                {DateTime.formatTime(job.created_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Updated At</th>
                            <td title={DateTime.formatTime(job.updated_at, DateTime.FORMAT_HUMAN_READABLE)} className="text-center" colSpan={2}>
                                {DateTime.formatTime(job.updated_at, DateTime.FORMAT_HUMAN_READABLE)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-center w-25">Exception</th>
                            <td className="text-center" colSpan={2}>{job.exception}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}        
export default JobDetails;