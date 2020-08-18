<?php


namespace App\Services;


use App\DTO\BookDTO;
use App\Entity\Author;
use App\Entity\Publisher;
use App\Interfaces\BookDetailsFetcherInterface;

class FetchBookDetailsFromGoogle implements BookDetailsFetcherInterface
{

    public function request(int $isbn): BookDTO
    {
        $request = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' . $isbn . '&key:' . $_ENV['GOOGLE_API_KEY'];
        $response = file_get_contents($request);
        $results = json_decode($response);
        $book = new BookDTO();
        $author = new Author();
        $publisher = new Publisher();

        if ($results->totalItems > 0) {
            $bookDetails = $results->items[0];
            $book->setTitle($bookDetails->volumeInfo->title ?? null);
            $book->setDescription($bookDetails->volumeInfo->description ?? null);
            $book->setPublicationYear((int)substr($bookDetails->volumeInfo->publishedDate, 0, 4) ?? null);
            $author->setName($bookDetails->volumeInfo->authors[0] ?? null);
            $book->setAuthor($author);
            $publisher->setName($bookDetails->volumeInfo->publisher ?? null);
            $book->setPublisher($publisher);
        }

        return $book;
    }
}