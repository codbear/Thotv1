<?php


namespace App\Services;


use App\Interfaces\BookDetailsFetcherInterface;
use App\ViewModel\BookViewModel;

class FetchBookDetailsFromGoogle implements BookDetailsFetcherInterface
{

    public function request(int $isbn): BookViewModel
    {
        $request = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' . $isbn . '&key:' . $_ENV['GOOGLE_API_KEY'];
        $response = file_get_contents($request);
        $results = json_decode($response);
        $book = new BookViewModel();

        if ($results->totalItems > 0) {
            $bookDetails = $results->items[0];
            $book->setTitle($bookDetails->volumeInfo->title ?? null);
            $book->setAuthor($bookDetails->volumeInfo->authors[0] ?? null);
            $book->setDescription($bookDetails->volumeInfo->description ?? null);
            $book->setPublisher($bookDetails->volumeInfo->publisher ?? null);
            $book->setPublicationYear((int)substr($bookDetails->volumeInfo->publishedDate, 0, 4) ?? null);
        }

        return $book;
    }
}