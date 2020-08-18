<?php

namespace App\DTO;

use App\Entity\Collection;

class CollectionDTO
{

    private $id;
    private $name;
    private $publisher;

    public function __construct(Collection $collectionEntity = null)
    {
        if ($collectionEntity) {
            $this->setId($collectionEntity->getId());
            $this->setName($collectionEntity->getName());
            $this->setPublisher($collectionEntity->getPublisher());
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
     * @return CollectionDTO
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
     * @return CollectionDTO
     */
    public function setName($name)
    {
        $this->name = $name;
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
     * @return CollectionDTO
     */
    public function setPublisher($publisher)
    {
        $this->publisher = $publisher;
        return $this;
    }
}