<?php


namespace App\Controller\Api;

use App\Entity\Book;
use App\ViewModel\BookViewModel;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BookController extends AbstractController
{
    /**
     * @Rest\Get(
     *     path = "/api/books/{id}",
     *     name = "book_show",
     * )
     * @Rest\View()
     * @param Book $book
     * @return BookViewModel
     */
    public function show(Book $book)
    {
        return new BookViewModel($book);
    }
}