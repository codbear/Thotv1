<?php


namespace App\Controller\Api;

use App\Entity\Collection;
use App\Entity\Publisher;
use App\Repository\PublisherRepository;
use App\ViewModel\PublisherDTO;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PublisherController extends AbstractController
{

    /**
     * @Rest\View()
     * @Rest\Get("/api/publishers")
     * @param PublisherRepository $publisherRepository
     * @return Publisher[]
     */
    public function index(PublisherRepository $publisherRepository)
    {
        return $publisherRepository->findAll();
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/publishers")
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("publisher", converter="fos_rest.request_body")
     * @param Publisher $publisher
     * @return PublisherDTO
     */
    public function new(Publisher $publisher)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($publisher);
        $em->flush();

        $collection = new Collection();
        $collection->setName('Hors collection');
        $collection->setPublisher($publisher);
        $em->persist($collection);
        $em->flush();

        return new PublisherDTO($publisher);
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/publishers/{id}",
     *     requirements={"id"="\d+"}
     *     )
     * @param Publisher $publisher
     * @return PublisherDTO
     */
    public function show(Publisher $publisher)
    {
        return new PublisherDTO($publisher);
    }

    /**
     * @Rest\View(StatusCode=200)
     * @Rest\Put(
     *     path="/api/publishers/{id}",
     *     requirements={"id"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("editedPublisher", converter="fos_rest.request_body")
     * @param Publisher $publisher
     * @param Publisher $editedPublisher
     * @return PublisherDTO
     */
    public function edit(Publisher $publisher, Publisher $editedPublisher)
    {
        $publisher->setName($editedPublisher->getName());
        $this->getDoctrine()->getManager()->flush();

        return new PublisherDTO($publisher);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/publishers/{id}")
     * @param Publisher $publisher
     */
    public function delete(Publisher $publisher)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($publisher);
        $entityManager->flush();
        return;
    }
}