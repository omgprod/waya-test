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
        //$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        return new JsonResponse([
            "1" => [$request->get('email')],
            "11" => [$request->toArray()],
            /*      "2" => [$request->request->get("phone")],
                  "3" => [$request->request->get("password")],
                  "4" => [$request->request->get("username")],*/
        ]);
        $entityManager = $doctrine->getManager();
        $firstname = (string)$request->get->get('firstName');
        $lastname = (string)$request->request->get('lastName');
        $email = (string)$request->request->get('email');
        $password = (string)$request->request->get('password');
        $phone = (string)$request->request->get('phone');

        if (!$email) {
            throw $this->createNotFoundException(
                'Email is required '
            );
        }
        $user = new Users();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        if($firstname){
            $user->setFirstName(htmlspecialchars($firstname));
        }
        if($lastname){
            $user->setLastName(htmlspecialchars($lastname));
        }
        if($email){
            $user->setEmail(htmlspecialchars($email));
        }
        if($password && $hashedPassword){
            $user->setPassword($hashedPassword);
        }
        if($phone){
            $user->setPhone(htmlspecialchars($phone));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'User have been updated !',
            '_id' => $user->getId(),
            'Lastname' => $user->getLastName(),
            'FirstName' => $user->getFirstName(),
            'Phone' => $user->getPhone(),
            'Email' => $user->getEmail(),
            'Roles' => $user->getRoles(),
        ]);
    }
}
