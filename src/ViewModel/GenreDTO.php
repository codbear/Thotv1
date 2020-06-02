<?php


namespace App\ViewModel;


use App\Entity\Genre;

class GenreDTO
{

    private $id;
    private $name;

    public function __construct(Genre $genre = null)
    {
        if ($genre) {
            $this->setId($genre->getId());
            $this->setName($genre->getName());
        }
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
     * @return GenreDTO
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return GenreDTO
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

}