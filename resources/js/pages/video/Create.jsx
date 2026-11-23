import React from "react";
import { 
    CSRFInput,
    documentTitle,
    DisplayErrors,
    Text
} from "@chappy/utils";


function Create({ errors, video }) {
    documentTitle('Video Upload');

    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Upload a Video</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <CSRFInput />
                    <DisplayErrors errors={errors} />
                    <Text 
                        label="Title"
                        name="title"
                        value={video.title}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                </form>
            </div>

        </div>
        
    );
}        
export default Create;