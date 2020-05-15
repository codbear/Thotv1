<?php


namespace App\Controller;


use App\Repository\AuthorRepository;
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
    public function getAuthorSection(AuthorRepository $authorRepository)
    {
        return $this->render('dashboard/_authors.html.twig', [
            'authors' => $authorRepository->findAll()
        ]);
    }

}