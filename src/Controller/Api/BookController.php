<?php


namespace App\Controller\Api;

use App\DTO\BookDTO;
use App\Entity\Book;
use App\Repository\AuthorRepository;
use App\Repository\CollectionRepository;
use App\Repository\FormatRepository;
use App\Repository\GenreRepository;
use DateTime;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BookController extends AbstractController
{
    /**
     * @var AuthorRepository
     */
    private $authorRepository;
    /**
     * @var GenreRepository
     */
    private $genreRepository;
    /**
     * @var CollectionRepository
     */
    private $collectionRepository;
    /**
     * @var FormatRepository
     */
    private $formatRepository;

    public function __construct(
        AuthorRepository $authorRepository,
        GenreRepository $genreRepository,
        CollectionRepository $collectionRepository,
        FormatRepository $formatRepository)
    {
        $this->authorRepository = $authorRepository;
        $this->genreRepository = $genreRepository;
        $this->collectionRepository = $collectionRepository;
        $this->formatRepository = $formatRepository;
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/books")
     * @ParamConverter("book", converter="fos_rest.request_body")
     * @param Book $book
     * @return BookDTO
     */
    public function create(Book $book)
    {
        $author = $this->authorRepository->find($book->getAuthor()->getId());
        $genre = $this->genreRepository->find($book->getGenre()->getId());
        $collection = $this->collectionRepository->find($book->getCollection()->getId());
        $format = $this->formatRepository->find($book->getFormat()->getId());
        $book->setAuthor($author);
        $book->setGenre($genre);
        $book->setCollection($collection);
        $book->setFormat($format);
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