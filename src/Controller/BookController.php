<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/book")
 */
class BookController extends AbstractController
{
    /**
     * @Route("/new", name="book_new", methods={"GET","POST"})
     */
    public function new()
    {
        return $this->render('book/new.html.twig');
    }

    /**
     * @Route("/update/{id}", name="book_update", methods={"GET","POST"})
     * @param $id
     * @return Response
     */
    public function update($id)
    {
        return $this->render('book/update.html.twig', [
            'bookId' => $id,
        ]);
    }
}
