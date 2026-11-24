import { CSRFInput, DisplayErrors, FileSelector, route, SubmitTag } from "@chappy/utils";
import React from "react";
function Upload({ errors, video}) {

    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Upload</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <CSRFInput />
                    <DisplayErrors errors={errors} />
                    <FileSelector
                        label="Select a video"
                        name="videoName"
                        inputAttrs={{className: 'form-control', accept: 'video/mp4 video/x-msvideo video/x-ms-wmv video/webm video/ogg video/quicktime video/x-flv'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <div className="col-md-12 text-end">
                        <a href={route('video.index')} className="btn btn-default">Cancel</a>
                        <SubmitTag label={"Submit"} inputAttrs={{className: 'btn btn-primary'}}/>
                    </div>
                </form>
            </div>
        </div>
    );
}        
export default Upload;