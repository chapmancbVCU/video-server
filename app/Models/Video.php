<?php
namespace App\Models;
use Core\Model;

/**
 * Implements features of the Video class.
 */
class Video extends Model {

    // Fields you don't want saved on form submit
    public const blackList = ['id', 'deleted'];

    // Fields you want fillable by a form
    // public const whiteList = ['field_one', 'field_two'];
    
    // Set to name of database table.
    protected static string $_table = 'video';

    // Soft delete
    protected static bool $_softDelete = true;
    
    // Date casting for toArray() and JSON output
    protected array $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    // List your allowed file types.
    protected static array $allowedFileTypes = [];
    
    // Set your max file size.
    protected static int $maxAllowedFileSize = 5242880;

    // Set your file path.  Include your bucket if necessary.
    protected static string $_uploadPath = "";
    
    // Fields from your database
    public int $deleted = 0;
    public int $id;
    public ?string $name = null;
    public ?string $url = null;
    public int $user_id;

    public function afterDelete(): void {
        // Implement your function
    }

    public function afterSave(): void {
        // Implement your function
    }

    public function beforeDelete(): void {
        // Implement your function
    }

    public function beforeSave(): void {
        // Implement your function
    }

    /**
     * Getter function for $allowedFileTypes array
     *
     * @return array $allowedFileTypes The array of allowed file types.
     */
    public static function getAllowedFileTypes(): array {
        return self::$allowedFileTypes;
    }

    /**
     * Getter function for $maxAllowedFileSize.
     *
     * @return int $maxAllowedFileSize The max file size for an individual 
     * file.
     */
    public static function getMaxAllowedFileSize(): int {
        return self::$maxAllowedFileSize;
    }

    /**
     * Performs upload
     *
     * @return void
     */
    public static function uploadFile(): void {
        // Implement your function
    }
}