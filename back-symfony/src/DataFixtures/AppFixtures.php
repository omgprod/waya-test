<?php

namespace App\DataFixtures;

use App\Entity\Users;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher
    )
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function hasshPass()
    {
        $user = new Users();
        return $this->passwordHasher->hashPassword(
            $user,
            "password"
        );

    }
}
