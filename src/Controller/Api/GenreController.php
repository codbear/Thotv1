<?php


namespace App\Controller\Api;

use App\DTO\GenreDTO;
use App\Entity\Genre;
use App\Repository\GenreRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GenreController extends AbstractController
{

    /**
     * @Rest\View()
     * @Rest\Get("/api/genres")
     * @param GenreRepository $genreRepository
     * @return Genre[]
     */
    public function index(GenreRepository $genreRepository)
    {
        return $genreRepository->findAll();
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/genres")
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("genre", converter="fos_rest.request_body")
     * @param Genre $genre
     * @return GenreDTO
     */
    public function create(Genre $genre)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($genre);
        $em->flush();

        return new GenreDTO($genre);
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/genres/{id}",
     *     requirements={"id"="\d+"}
     *     )
     * @param Genre $genre
     * @return GenreDTO
     */
    public function read(Genre $genre)
    {
        return new GenreDTO($genre);
    }

    /**
     * @Rest\View(StatusCode=200)
     * @Rest\Put(
     *     path="/api/genres/{id}",
     *     requirements={"id"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("editedGenre", converter="fos_rest.request_body")
     * @param Genre $genre
     * @param Genre $editedGenre
     * @return GenreDTO
     */
    public function update(Genre $genre, Genre $editedGenre)
    {
        $genre->setName($editedGenre->getName());
        $this->getDoctrine()->getManager()->flush();

        return new GenreDTO($genre);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/genres/{id}")
     * @param Genre $genre
     */
    public function delete(Genre $genre)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($genre);
        $entityManager->flush();
        return;
    }
}