<?php

namespace App\Controller\Api;

use App\DTO\BookDTO;
use App\Services\FetchBookDetailsFromBookfinder;
use App\Services\FetchBookDetailsFromGoogle;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SearchController extends AbstractController
{
    const ISBN10_REGEX = '#^[0-9X]{10}$#';
    const ISBN13_REGEX = '#^97[89][0-9]{10}$#';

    /**
     * @Rest\View();
     * @Rest\Get("/api/search/external/{isbn}")
     * @param $isbn
     * @param SerializerInterface $serializer
     * @param FetchBookDetailsFromGoogle $googleFetcher
     * @param FetchBookDetailsFromBookfinder $bookfinderFetcher
     * @return BookDTO|void
     */
    public function external($isbn,
                             SerializerInterface $serializer,
                             FetchBookDetailsFromGoogle $googleFetcher,
                             FetchBookDetailsFromBookfinder $bookfinderFetcher)
    {
        if (!$this->checkIsbn($isbn)) {
            return;
            //todo: send response with error "wrong isbn"
        }

        $book = new BookDTO();
        $fromGoogle = $googleFetcher->request($isbn);
        $fromBookfinder = $bookfinderFetcher->request($isbn);
        $book->setTitle($fromGoogle->getTitle() ?? $fromBookfinder->getTitle());
        $book->setAuthor($fromGoogle->getAuthor() ?? $fromBookfinder->getAuthor());
        $book->setDescription($fromGoogle->getDescription() ?? $fromBookfinder->getDescription());
        $book->setPublisher($fromGoogle->getPublisher() ?? $fromBookfinder->getPublisher());
        $book->setPublicationYear($fromGoogle->getPublicationYear() ?? $fromBookfinder->getPublicationYear());

        return $book;
    }

    private function checkIsbn($isbn)
    {
        return (preg_match(self::ISBN10_REGEX, (int)$isbn) || preg_match(self::ISBN13_REGEX, (int)$isbn));
    }

}