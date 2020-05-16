<?php


namespace App\ViewModel;


use App\Entity\Publisher;

class PublisherDTO
{
    private $id;
    private $name;

    public function __construct(Publisher $publisher = null)
    {
        if ($publisher) {
            $this->setId($publisher->getId());
            $this->setName($publisher->getName());
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
     * @return PublisherDTO
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
     * @return PublisherDTO
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
}