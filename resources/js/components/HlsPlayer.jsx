import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

/**
 * Plays an HLS stream (live or VOD).
 *
 * Uses hls.js where Media Source Extensions are available and falls back
 * to native HLS (Safari / iOS).  Recovers from transient network and media
 * errors, which is common for live streams that haven't started yet.
 *
 * @property {string}   src        URL of the .m3u8 playlist.
 * @property {boolean}  [live]     Tune buffering for live playback.
 * @property {function} [onStatus] Called with status strings for display.
 * @param {InputProps} param0
 * @returns {JSX.Element} The video element.
 */
export default function HlsPlayer({ src, live = true, onStatus = () => {} }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        let hls = null;
        let retryTimer = null;

        if (Hls.isSupported()) {
            hls = new Hls({
                // Stay ~3 segments behind the live edge: low delay, few stalls.
                liveSyncDurationCount: live ? 3 : undefined,
                manifestLoadingMaxRetry: 2,
            });

            hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
                onStatus(`Playing (${data.levels.length} rendition${data.levels.length === 1 ? "" : "s"})`);
                video.play().catch(() => onStatus("Ready - click play"));
            });

            hls.on(Hls.Events.ERROR, (_e, data) => {
                if (!data.fatal) return;
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // Stream offline or not started yet: keep retrying.
                        onStatus("Waiting for stream...");
                        retryTimer = setTimeout(() => {
                            hls.loadSource(src);
                            hls.startLoad();
                        }, 3000);
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        onStatus("Recovering from media error...");
                        hls.recoverMediaError();
                        break;
                    default:
                        onStatus(`Fatal error: ${data.details}`);
                        hls.destroy();
                }
            });

            hls.loadSource(src);
            hls.attachMedia(video);
            onStatus("Loading...");
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari / iOS play HLS natively.
            video.src = src;
            video.addEventListener("loadedmetadata", () => {
                onStatus("Playing (native HLS)");
                video.play().catch(() => onStatus("Ready - click play"));
            });
        } else {
            onStatus("HLS is not supported in this browser");
        }

        return () => {
            clearTimeout(retryTimer);
            if (hls) hls.destroy();
            video.removeAttribute("src");
            video.load();
        };
    }, [src, live]);

    return (
        <video
            ref={videoRef}
            className="w-100 bg-black rounded"
            controls
            muted          // browsers only autoplay muted video
            playsInline
        />
    );
}