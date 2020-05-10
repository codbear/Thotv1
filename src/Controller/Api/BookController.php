<?php


namespace App\Controller\Api;

use App\Entity\Book;
use App\ViewModel\BookViewModel;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BookController extends AbstractController
{
    /**
     * @Rest\View()
     * @Rest\Get("/api/books/{id}")
     * @param Book $book
     * @return BookViewModel
     */
    public function show(Book $book)
    {
        return new BookViewModel($book);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/books/{id}")
     * @param Book $book
     */
    public function delete(Book $book)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($book);
        $entityManager->flush();
        return;
    }
}