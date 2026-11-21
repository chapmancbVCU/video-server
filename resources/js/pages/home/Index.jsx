import React, { useState } from "react";
import HlsPlayer from "@/components/HlsPlayer";

/**
 * Home page: HLS live stream test.
 * @property {object} user The currently logged in user.
 * @property {string} version The current version of the Chappy.php framework.
 * @param {InputProps} param0
 * @returns {JSX.Element} The contents of Index view.
 */
export default function Index({ user, version }) {
    const name = user?.fname ?? "Guest";

    const [streamName, setStreamName] = useState("test");
    const [activeStream, setActiveStream] = useState("test");
    const [status, setStatus] = useState("Idle");

    // Same origin as the app, so no CORS needed for this page.
    const src = `/live/${encodeURIComponent(activeStream)}/index.m3u8`;

    const watch = (e) => {
        e.preventDefault();
        const trimmed = streamName.trim();
        if (trimmed) setActiveStream(trimmed);
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-baseline mb-3">
                <h1 className="h3 mb-0">Live stream test</h1>
                <small className="text-muted">Hello, {name} · Chappy.php {version}</small>
            </div>

            <form className="row g-2 align-items-center mb-3" onSubmit={watch}>
                <div className="col-auto">
                    <label htmlFor="stream" className="col-form-label">Stream name</label>
                </div>
                <div className="col-auto">
                    <input
                        id="stream"
                        className="form-control"
                        value={streamName}
                        onChange={(e) => setStreamName(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" type="submit">Watch</button>
                </div>
            </form>

            <div className="ratio ratio-16x9 mb-2">
                <HlsPlayer key={src} src={src} live onStatus={setStatus} />
            </div>

            <div className="d-flex justify-content-between small">
                <span><strong>Status:</strong> {status}</span>
                <code>{src}</code>
            </div>

            <hr className="my-4" />

            <h2 className="h6">OBS settings</h2>
            <ul className="small text-muted mb-0">
                <li>Server: <code>rtmp://&lt;vm-ip&gt;/live</code></li>
                <li>Stream key: the stream name above</li>
                <li>Output → Keyframe Interval: <code>2</code></li>
            </ul>
        </div>
    );
}