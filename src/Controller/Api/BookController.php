<?php


namespace App\Controller\Api;

use App\DTO\BookDTO;
use App\Entity\Book;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BookController extends AbstractController
{
    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/books")
     * @ParamConverter("book", converter="fos_rest.request_body")
     * @param Book $book
     * @return BookDTO
     */
    public function create(Book $book)
    {
        $book->setCreatedAt(new DateTime());
        $em = $this->getDoctrine()->getManager();
        $em->persist($book);
        $em->flush();

        return new BookDTO($book);
    }

    /**
     * @Rest\View()
     * @Rest\Get("/api/books/{id}")
     * @param Book $book
     * @return BookDTO
     */
    public function read(Book $book)
    {
        return new BookDTO($book);
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