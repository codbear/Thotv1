<?php

namespace App\Services;

use App\DTO\BookDTO;
use App\Entity\Author;
use App\Entity\Publisher;
use App\Interfaces\BookDetailsFetcherInterface;
use simplehtmldom\HtmlWeb;

class FetchBookDetailsFromBookfinder implements BookDetailsFetcherInterface
{

    public function request(int $isbn): BookDTO
    {
        $client = new HtmlWeb();
        $html = $client->load('https://www.justbooks.fr/search/?isbn=' . $isbn . '&mode=isbn&st=sr&ac=qr');
        $book = new BookDTO();
        $author = new Author();
        $publisher = new Publisher();
        $book->setTitle($html->find('[itemprop=name]', 0)->plaintext ?? null);
        $author->setName($html->find('[itemprop=author]', 0)->plaintext ?? null);
        $book->setAuthor($author);
        $book->setDescription($html->find('[itemprop=description]', 0)->plaintext ?? null);
        $publisherElement = $html->find('[itemprop=publisher]', 0)->plaintext ?? null;

        if ($publisherElement) {
            $explodedPublisherString = explode(",", $publisherElement);
            $publisher->setName($explodedPublisherString[0]);
            $book->setPublisher($publisher);
        }

        return $book;
    }
}