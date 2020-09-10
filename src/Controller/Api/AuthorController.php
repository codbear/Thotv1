<?php


namespace App\Controller\Api;

use App\DTO\AuthorDTO;
use App\Entity\Author;
use App\Repository\AuthorRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthorController extends AbstractController
{

    /**
     * @Rest\View()
     * @Rest\Get("/api/authors")
     * @param AuthorRepository $authorRepository
     * @return Author[]
     */
    public function index(AuthorRepository $authorRepository)
    {
        return $authorRepository->findAll();
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/authors")
     * @Rest\RequestParam(
     *     name="name",
     *     nullable=false
     * )
     * @ParamConverter("author", converter="fos_rest.request_body")
     * @param Author $author
     * @return AuthorDTO
     */
    public function create(Author $author)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($author);
        $em->flush();

        return new AuthorDTO($author);
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/authors/{id}",
     *     requirements={"id"="\d+"}
     *     )
     * @param Author $author
     * @return AuthorDTO
     */
    public function read(Author $author)
    {
        return new AuthorDTO($author);
    }

    /**
     * @Rest\View(StatusCode=200)
     * @Rest\Put(
     *     path="/api/authors/{id}",
     *     requirements={"id"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     nullable=false
     * )
     * @ParamConverter("editedAuthor", converter="fos_rest.request_body")
     * @param Author $authorEntity
     * @param Author $editedAuthor
     * @return AuthorDTO
     */
    public function update(Author $authorEntity, Author $editedAuthor)
    {
        $authorEntity->setName($editedAuthor->getName());
        $this->getDoctrine()->getManager()->flush();

        return new AuthorDTO($authorEntity);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/authors/{id}")
     * @param Author $author
     */
    public function delete(Author $author)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($author);
        $entityManager->flush();
        return;
    }
}