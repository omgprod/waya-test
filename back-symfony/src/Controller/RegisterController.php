<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_register')]
    public function create(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine ,Request $request): JsonResponse
    {
        $req = $request->toArray();
        $entityManager = $doctrine->getManager();
        $firstname = (string)$req['firstName'] ?? "";
        $lastname = (string)$req['lastName'] ?? "";
        $email = (string)$req['email'] ?? "";
        $password = (string)$req['password'] ?? "";
        $phone = (string)$req['phone'] ?? "";

        if (!$email || !$password) {
            throw $this->createNotFoundException(
                'Email ou mot de passe requis.'
            );
        }

        $user = new Users();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            trim($password)
        );
        if($firstname !== ""){
            $user->setFirstName(htmlspecialchars($firstname));
        }
        if($lastname !== ""){
            $user->setLastName(htmlspecialchars($lastname));
        }
        if($email !== ""){
            $user->setEmail(htmlspecialchars(trim($email)));
        }
        if($password !== "" && $hashedPassword){
            $user->setPassword($hashedPassword);
        }
        if($phone !== ""){
            $user->setPhone(htmlspecialchars($phone));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Enregistré avec succès',
            'status' => 200,
            '_id' => $user->getId(),
            'Lastname' => $user->getLastName(),
            'FirstName' => $user->getFirstName(),
            'Phone' => $user->getPhone(),
            'Email' => $user->getEmail(),
        ]);
    }
}
