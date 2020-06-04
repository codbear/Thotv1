<?php

namespace App\Services;

use App\Interfaces\BookDetailsFetcherInterface;
use App\ViewModel\BookViewModel;
use simplehtmldom\HtmlWeb;

class FetchBookDetailsFromBookfinder implements BookDetailsFetcherInterface
{

    public function request(int $isbn): BookViewModel
    {
        $client = new HtmlWeb();
        $html = $client->load('https://www.justbooks.fr/search/?isbn=' . $isbn . '&mode=isbn&st=sr&ac=qr');
        $book = new BookViewModel();
        $book->setTitle($html->find('[itemprop=name]', 0)->plaintext ?? null);
        $book->setAuthor($html->find('[itemprop=author]', 0)->plaintext ?? null);
        $book->setDescription($html->find('[itemprop=description]', 0)->plaintext ?? null);
        $publisher = $html->find('[itemprop=publisher]', 0)->plaintext;

        if ($publisher) {
            $explodedPublisherString = explode(",", $publisher);
            $book->setPublisher($explodedPublisherString[0]);
        }

        return $book;
    }
}