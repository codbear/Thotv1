<?php


namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @var BookRepository
     */
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @Route("/", name="home")
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('home.html.twig', [
            'books' => $this->bookRepository->findAll(),
        ]);
    }

}