<?php


namespace App\Controller\Api;

use App\Entity\Collection;
use App\Repository\CollectionRepository;
use App\Repository\PublisherRepository;
use App\ViewModel\CollectionDTO;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class CollectionController extends AbstractController
{

    /**
     * @var PublisherRepository
     */
    private $publisherRepository;

    public function __construct(PublisherRepository $publisherRepository)
    {
        $this->publisherRepository = $publisherRepository;
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/publishers/{id}/collections",
     *     requirements={"id"="\d+"}
     * )
     * @param int $id
     * @param CollectionRepository $collectionRepository
     * @return Collection[]|View
     */
    public function index(int $id, CollectionRepository $collectionRepository)
    {
        $publisher = $this->publisherRepository->find($id);

        if (empty($publisher)) {
            return $this->publisherNotFound();
        }


        return $collectionRepository->findByPublisher($id);
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post(
     *     path="/api/publishers/{id}/collections",
     *     requirements={"id"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("collection", converter="fos_rest.request_body")
     * @param int $id
     * @param Collection $collection
     * @return CollectionDTO|View
     */
    public function create(int $id, Collection $collection)
    {
        $publisher = $this->publisherRepository->find($id);

        if (empty($publisher)) {
            return $this->publisherNotFound();
        }

        $collection->setPublisher($publisher);

        $em = $this->getDoctrine()->getManager();
        $em->persist($collection);
        $em->flush();

        return new CollectionDTO($collection);
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/collections/{id}",
     *     requirements={"id"="\d+"}
     *     )
     * @param Collection $collection
     * @return CollectionDTO
     */
    public function read(Collection $collection)
    {
        return new CollectionDTO($collection);
    }

    /**
     * @Rest\View(StatusCode=200)
     * @Rest\Put(
     *     path="/api/publishers/{publisherId}/collections/{id}",
     *     requirements={"id"="\d+", "publisherId"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("editedCollection", converter="fos_rest.request_body")
     * @param int $publisherId
     * @param Collection $collection
     * @param Collection $editedCollection
     * @return CollectionDTO|View
     */
    public function update(int $publisherId, Collection $collection, Collection $editedCollection)
    {
        $publisher = $this->publisherRepository->find($publisherId);

        if (empty($publisher)) {
            return $this->publisherNotFound();
        }

        $editedCollection->setPublisher($publisher);

        $collection->setName($editedCollection->getName());
        $collection->setPublisher($editedCollection->getPublisher());
        $this->getDoctrine()->getManager()->flush();

        return new CollectionDTO($collection);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/collections/{id}")
     * @param Collection $collection
     */
    public function delete(Collection $collection)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($collection);
        $entityManager->flush();
        return;
    }

    private function publisherNotFound()
    {
        return View::create(['message' => 'Publisher not found'], Response::HTTP_NOT_FOUND);
    }
}