<?php


namespace App\ViewModel;


use App\Entity\Format;

class FormatDTO
{

    private $id;
    private $name;

    public function __construct(Format $format = null)
    {
        if ($format) {
            $this->setId($format->getId());
            $this->setName($format->getName());
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
     * @return FormatDTO
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
     * @return FormatDTO
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

}