<?php
namespace App\Controllers;
use Core\Controller;
use App\Models\Video;
/**
 * Undocumented class
 */
class VideoController extends Controller {
    public function createAction(): void {
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
}