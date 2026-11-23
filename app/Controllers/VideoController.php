<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Undocumented class
 */
class VideoController extends Controller {
    public function createAction(): void {
        $this->view->renderJsx('video.Create');
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