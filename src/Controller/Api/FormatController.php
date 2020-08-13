<?php


namespace App\Controller\Api;

use App\DTO\FormatDTO;
use App\Entity\Format;
use App\Repository\FormatRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FormatController extends AbstractController
{

    /**
     * @Rest\View()
     * @Rest\Get("/api/formats")
     * @param FormatRepository $formatRepository
     * @return Format[]
     */
    public function index(FormatRepository $formatRepository)
    {
        return $formatRepository->findAll();
    }

    /**
     * @Rest\View(StatusCode = 201)
     * @Rest\Post("/api/formats")
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("format", converter="fos_rest.request_body")
     * @param Format $format
     * @return FormatDTO
     */
    public function create(Format $format)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($format);
        $em->flush();

        return new FormatDTO($format);
    }

    /**
     * @Rest\View()
     * @Rest\Get(
     *     path="/api/formats/{id}",
     *     requirements={"id"="\d+"}
     *     )
     * @param Format $format
     * @return FormatDTO
     */
    public function read(Format $format)
    {
        return new FormatDTO($format);
    }

    /**
     * @Rest\View(StatusCode=200)
     * @Rest\Put(
     *     path="/api/formats/{id}",
     *     requirements={"id"="\d+"}
     * )
     * @Rest\RequestParam(
     *     name="name",
     *     requirements="[a-zA-Z,.\-\ ]{3,}",
     *     nullable=false
     * )
     * @ParamConverter("editedFormat", converter="fos_rest.request_body")
     * @param Format $format
     * @param Format $editedFormat
     * @return FormatDTO
     */
    public function update(Format $format, Format $editedFormat)
    {
        $format->setName($editedFormat->getName());
        $this->getDoctrine()->getManager()->flush();

        return new FormatDTO($format);
    }

    /**
     * @Rest\View(StatusCode = 204)
     * @Rest\Delete("/api/formats/{id}")
     * @param Format $format
     */
    public function delete(Format $format)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($format);
        $entityManager->flush();
        return;
    }
}