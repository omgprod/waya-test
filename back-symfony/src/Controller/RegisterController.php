<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_register')]
    public function create(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine ,Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $response = new Response();


        if (!empty($request->getContent())) {
            $params = json_decode($request->getContent(), true);
            $user = new Users();

            foreach ($params as $key => $value) {
                if ($key === "password") {
                    if (!$value) {
                        $response->setContent(json_encode([
                            'message' => 'Email ou mot de passe requis.',
                            'status' => 400,
                        ]));
                        return $response;
                    }
                    $hashedPassword = $passwordHasher->hashPassword(
                        $user,
                        $value
                    );
                    $user->setPassword($hashedPassword);
                }
                if ($key === "firstName") {
                    $user->setFirstName(htmlspecialchars($value));
                }
                if ($key === "lastName") {
                    $user->setLastName(htmlspecialchars($value));
                }
                if ($key === "email") {
                    $userFound = $doctrine->getRepository(Users::class)->findOneBy(["email" => $value]);
                    if($userFound || !$value){
                        $response->setContent(json_encode([
                            'message' => 'Utilisateur déjà enregistré',
                            'status' => 400,
                        ]));
                        return $response;
                    }
                    $user->setEmail(htmlspecialchars($value));
                }
                if ($key === "phone") {
                    $user->setPhone(htmlspecialchars($value));
                }
            }

            $entityManager->persist($user);
            $entityManager->flush();

            $response->setContent(json_encode([
                'message' => 'Enregistré avec succès',
                'status' => 200,
                '_id' => $user->getId(),
                'Lastname' => $user->getLastName(),
                'FirstName' => $user->getFirstName(),
                'Phone' => $user->getPhone(),
                'Email' => $user->getEmail(),
            ]));
            return $response;
        } else {
            $response->setContent(json_encode([
                'message' => 'Erreur',
                'status' => 400,
            ]));
            return $response;
        }
    }
}
