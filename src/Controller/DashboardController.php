<?php


namespace App\Controller;


use App\Repository\AuthorRepository;
use App\Repository\CollectionRepository;
use App\Repository\PublisherRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", name="dashboard")
     * @return Response
     */
    public function dashboard()
    {
        return $this->render('dashboard/dashboard.html.twig');
    }

    /**
     * @Route("/dashboard/authors", name="authors_section")
     * @param AuthorRepository $authorRepository
     * @return Response
     */
    public function getAuthorsSection(AuthorRepository $authorRepository)
    {
        return $this->render('dashboard/_section.html.twig', [
            'section' => 'authors',
            'ressources' => $authorRepository->findAll(),
        ]);
    }

    /**
     * @Route("/dashboard/publishers", name="publishers_dashboard")
     * @param PublisherRepository $publisherRepository
     * @return Response
     */
    public function getPublishersSection(PublisherRepository $publisherRepository)
    {
        return $this->render('dashboard/_section.html.twig', [
            'section' => 'publishers',
            'ressources' => $publisherRepository->findAll(),
        ]);
    }

    /**
     * @Route("/dashboard/collections", name="collections_dashboard")
     * @param CollectionRepository $collectionRepository
     * @return Response
     */
    public function getCollectionsSection(CollectionRepository $collectionRepository)
    {
        return $this->render('dashboard/_section.html.twig', [
            'section' => 'collections',
            'ressources' => $collectionRepository->findAll(),
        ]);
    }
}