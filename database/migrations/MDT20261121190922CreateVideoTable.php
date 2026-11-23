<?php
namespace Database\Migrations;
use Core\Lib\Database\Schema;
use Core\Lib\Database\Blueprint;
use Core\Lib\Database\Migration;

/**
 * Migration class for the video table.
 */
class MDT20261121190922CreateVideoTable extends Migration {
    /**
     * Performs a migration for a new table.
     *
     * @return void
     */
    public function up(): void {
        Schema::create('video', function (Blueprint $table) {
            $table->id();
            $table->string('url', 255);
            $table->integer('user_id');
            $table->string('title', 255);
            $table->timestamps();
            $table->softDeletes();
            $table->index('user_id');
            $table->string('length');
            $table->integer('width');
            $table->integer('height');
            $table->text('description');
        });
    }

    /**
     * Undo a migration task.
     *
     * @return void
     */
    public function down(): void {
        Schema::dropIfExists('video');
    }
}