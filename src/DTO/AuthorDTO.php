<?php


namespace App\DTO;


use App\Entity\Author;

class AuthorDTO
{

    private $id;
    private $name;

    public function __construct(Author $authorEntity = null)
    {
        if ($authorEntity) {
            $this->setId($authorEntity->getId());
            $this->setName($authorEntity->getName());
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
     * @return AuthorDTO
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
     * @return AuthorDTO
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

}