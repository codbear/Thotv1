<?php


namespace App\DTO;


use App\Entity\Book;

class BookDTO
{
    private $id;
    private $isbn;
    private $title;
    private $volume;
    private $author;
    private $publisher;
    private $publicationYear;
    private $collection;
    private $genre;
    private $description;
    private $format;
    private $isEbook;
    private $hasBeenRead;
    private $observations;
    private $createdAt;

    public function __construct(Book $bookEntity = null)
    {
        if ($bookEntity) {
            $this->setId($bookEntity->getId());
            $this->setTitle($bookEntity->getTitle());
            $this->setIsbn($bookEntity->getIsbn());
            $this->setVolume($bookEntity->getVolume());
            $this->setDescription($bookEntity->getDescription());
            $this->setObservations($bookEntity->getObservations());
            $this->setHasBeenRead($bookEntity->getHasBeenRead());
            $this->setIsEbook($bookEntity->getIsEbook());
            $this->setPublicationYear($bookEntity->getPublicationYear());
            $this->setCreatedAt($bookEntity->getCreatedAt());
            $this->setAuthor($bookEntity->getAuthor()->getName());
            $this->setGenre($bookEntity->getGenre()->getName());
            $this->setFormat($bookEntity->getFormat()->getName());
            $this->setPublisher($bookEntity->getCollection()->getPublisher()->getName());
            $this->setCollection($bookEntity->getCollection()->getName());
        }
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     * @return BookDTO
     */
    public function setAuthor($author)
    {
        $this->author = $author;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCollection()
    {
        return $this->collection;
    }

    /**
     * @param mixed $collection
     * @return BookDTO
     */
    public function setCollection($collection)
    {
        $this->collection = $collection;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     * @return BookDTO
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     * @return BookDTO
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFormat()
    {
        return $this->format;
    }

    /**
     * @param mixed $format
     * @return BookDTO
     */
    public function setFormat($format)
    {
        $this->format = $format;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * @param mixed $genre
     * @return BookDTO
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getHasBeenRead()
    {
        return $this->hasBeenRead;
    }

    /**
     * @param mixed $hasBeenRead
     * @return BookDTO
     */
    public function setHasBeenRead($hasBeenRead)
    {
        $this->hasBeenRead = $hasBeenRead;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return BookDTO
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsbn()
    {
        return $this->isbn;
    }

    /**
     * @param mixed $isbn
     * @return BookDTO
     */
    public function setIsbn($isbn)
    {
        $this->isbn = $isbn;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsEbook()
    {
        return $this->isEbook;
    }

    /**
     * @param mixed $isEbook
     * @return BookDTO
     */
    public function setIsEbook($isEbook)
    {
        $this->isEbook = $isEbook;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getObservations()
    {
        return $this->observations;
    }

    /**
     * @param mixed $observations
     * @return BookDTO
     */
    public function setObservations($observations)
    {
        $this->observations = $observations;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPublicationYear()
    {
        return $this->publicationYear;
    }

    /**
     * @param mixed $publicationYear
     * @return BookDTO
     */
    public function setPublicationYear($publicationYear)
    {
        $this->publicationYear = $publicationYear;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPublisher()
    {
        return $this->publisher;
    }

    /**
     * @param mixed $publisher
     * @return BookDTO
     */
    public function setPublisher($publisher)
    {
        $this->publisher = $publisher;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return BookDTO
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getVolume()
    {
        return $this->volume;
    }

    /**
     * @param mixed $volume
     * @return BookDTO
     */
    public function setVolume($volume)
    {
        $this->volume = $volume;
        return $this;
    }
}