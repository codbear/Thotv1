<?php

namespace App\Interfaces;

use App\DTO\BookDTO;

interface BookDetailsFetcherInterface
{
    public function request(int $isbn): BookDTO;
}