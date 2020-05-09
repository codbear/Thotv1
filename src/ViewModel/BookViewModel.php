<?php


namespace App\ViewModel;


use App\Entity\Book;

class BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
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
     * @return BookViewModel
     */
    public function setVolume($volume)
    {
        $this->volume = $volume;
        return $this;
    }
}