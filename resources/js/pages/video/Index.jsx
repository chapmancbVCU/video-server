import { route } from "@chappy/utils";
import React from "react";
function Index() {

    return (
        <>
            <h1 className="text-center">Video Center
                <a href={route('video.upload')} className="btn btn-primary btn-sm ms-3">
                    <i className="fa fa-camera"></i> Upload Video
                </a>
            </h1>
        </>
    );
}        
export default Index;