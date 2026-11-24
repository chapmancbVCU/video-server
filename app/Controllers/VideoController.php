<?php
namespace App\Controllers;
use Core\Controller;
use App\Models\Video;
use Core\Lib\FileSystem\Uploads;
use Core\Services\AuthService;

/**
 * Undocumented class
 */
class VideoController extends Controller {
    public function createAction(int $id): void {
        $video = new Video();

        if($this->request->isPost()) {
            $this->request->csrfCheck();

            if($video->save()) {}
        }

        $props = [
            'video' => $video,
            'errors' => $video->getErrorMessages()
        ];
        $this->view->renderJsx('video.Create', $props);
    }

    public function indexAction(): void {
        $this->view->renderJsx('video.Index');
    }
    
    /**
     * Runs when the object is constructed.
     *
     * @return void
     */
    public function onConstruct(): void {
        $this->view->setLayout('default');
    }

    public function uploadAction(): void {
        $video = new Video();
        $user = AuthService::currentUser();
        if($this->request->isPost()) {
            $this->request->csrfCheck();

            $upload = Uploads::handleUpload(
                'videoName',
                Video::class,
                env('S3_BUCKET') . 'uploads',
                "500MB",
                $video
            );
            // if($video->save()) {}
            if($upload) {
                redirect('video.create', [$video->id]);
            }
            
            $video->addErrorMessage('You must choose a video to upload');
        }

        $props = [
            'video' => $video,
            'errors' => $video->getErrorMessages()
        ];
        $this->view->renderJsx('video.Upload', $props);
    }
}