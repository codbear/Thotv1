<?php


namespace App\Controller\Api;

use App\DTO\BookDTO;
use App\Entity\Author;
use App\Entity\Book;
use App\Entity\Collection;
use App\Entity\Format;
use App\Entity\Genre;
use App\Repository\AuthorRepository;
use App\Repository\BookRepository;
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
    /**
     * @var Author|null
     */
    private $authorEntity;
    /**
     * @var Genre|null
     */
    private $genreEntity;
    /**
     * @var Collection|null
     */
    private $collectionEntity;
    /**
     * @var Format|null
     */
    private $formatEntity;

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
     * @Rest\View()
     * @Rest\Get("/api/books")
     * @param BookRepository $bookRepository
     * @return Book[]
     */
    public function index(BookRepository $bookRepository)
    {
        return $bookRepository->findAll();
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
        $this->findRelatedEntities($book);

        $book->setAuthor($this->authorEntity);
        $book->setGenre($this->genreEntity);
        $book->setCollection($this->collectionEntity);
        $book->setFormat($this->formatEntity);
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
     * @Rest\View(StatusCode = 201)
     * @Rest\Put("/api/books/{id}")
     * @ParamConverter("editedBook", converter="fos_rest.request_body")
     * @param Book $book
     * @param Book $editedBook
     * @return BookDTO
     */
    public function update(Book $book, Book $editedBook)
    {
        $book->setTitle($editedBook->getTitle());
        $book->setIsbn($editedBook->getIsbn());
        $book->setVolume($editedBook->getVolume());
        $book->setDescription($editedBook->getDescription());
        $book->setObservations($editedBook->getObservations());
        $book->setHasBeenRead($editedBook->getHasBeenRead());
        $book->setIsEbook($editedBook->getIsEbook());
        $book->setPublicationYear($editedBook->getPublicationYear());

        $this->findRelatedEntities($editedBook);

        $book->setAuthor($this->authorEntity);
        $book->setGenre($this->genreEntity);
        $book->setCollection($this->collectionEntity);
        $book->setFormat($this->formatEntity);

        $em = $this->getDoctrine()->getManager();
        $em->persist($book);
        $em->flush();

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
    }

    private function findRelatedEntities(Book $bookDetails)
    {
        $this->authorEntity = $this->authorRepository->find($bookDetails->getAuthor()->getId());
        $this->genreEntity = $this->genreRepository->find($bookDetails->getGenre()->getId());
        $this->collectionEntity = $this->collectionRepository->find($bookDetails->getCollection()->getId());
        $this->formatEntity = $this->formatRepository->find($bookDetails->getFormat()->getId());
    }
}