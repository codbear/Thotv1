<?php

namespace App\Interfaces;

use App\ViewModel\BookViewModel;

interface BookDetailsFetcherInterface
{
    public function request(int $isbn): BookViewModel;
}