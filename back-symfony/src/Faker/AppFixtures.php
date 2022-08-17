<?php

namespace App\Faker\Provider;

use App\Entity\Users;
use Faker\Generator;
use Faker\Provider\Base as BaseProvider;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

final class JobProvider extends BaseProvider{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(Generator $generator, UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct($generator);
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * @return string Random job abbreviation title
     */
    public function hashPass()
    {
        $user = new Users();
        return $this->passwordHasher->hashPassword(
            $user,
            "password"
        );
    }
}
