<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api', name: "api_")]
class UserController extends AbstractController
{
    #[Route('/users', name: 'list_user', methods: 'GET')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $users = $doctrine->getRepository(Users::class)->findAll();

        if (!$users) {
            return $this->json([
                "type" => "Erreur",
                "message" => "Aucun utilisateur trouvé",
                "status" => 404,
            ]);
        }

        $arrayCollection = array();

        foreach($users as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'Lastname' => $item->getLastName(),
                'FirstName' => $item->getFirstName(),
                'Phone' => $item->getPhone(),
                'Email' => $item->getEmail(),
                'Roles' => $item->getRoles(),
            );
        }

        return new JsonResponse($arrayCollection);
    }

    #[Route('/user-create', name: 'create_user')]
    public function generateAdminUser(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine, ValidatorInterface $validator): JsonResponse
    {
        $entityManager = $doctrine->getManager();

        $user = new Users();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            "password"
        );
        $user->setUsername('admin');
        $user->setFirstName('admin');
        $user->setLastName('admin');
        $user->setPassword($hashedPassword);
        $user->setEmail('admin@admin.fr');
        $user->setPhone('0613072006');
        $user->setRoles(['ROLE_ADMIN']);

        dump($user);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => $errors,
                "status" => 404,
            ]);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'User have been created !',
            '_id' => $user->getId(),
            'Username' => $user->getUsername(),
            'Lastname' => $user->getLastName(),
            'FirstName' => $user->getFirstName(),
            'Phone' => $user->getPhone(),
            'Email' => $user->getEmail(),
            'Password' => $user->getPassword(),
            'Roles' => $user->getRoles(),
        ]);
    }

    #[Route('/users/{id}', name: 'show', methods: 'GET')]
    public function show(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $doctrine->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => "Aucun utilisateur trouvé",
                "status" => 404,
            ]);
        }

        return new JsonResponse([
            'message' => 'User have been found !',
            'status' => 200,
            '_id' => $user->getId(),
            'Lastname' => $user->getLastName(),
            'FirstName' => $user->getFirstName(),
            'Phone' => $user->getPhone(),
            'Email' => $user->getEmail(),
            'Roles' => $user->getRoles(),
        ]);
    }

    #[Route('/users', name: 'user_create', methods: 'POST')]
    public function create(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine ,Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $entityManager = $doctrine->getManager();
        $firstname = (string)$request->request->get('firstName');
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

    #[Route('/users/{id}', name: 'user_edit', methods: 'PUT')]
    public function update(UserPasswordHasherInterface $passwordHasher,
                           ManagerRegistry $doctrine,
                           Request $request,
                           int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $firstname = (string)$request->request->get('firstName');
        $lastname = (string)$request->request->get('lastName');
        $email = (string)$request->request->get('email');
        $phone = (string)$request->request->get('phone');
        $password = (string)$request->request->get('password');
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

    #[Route('/users/{id}', name: 'user_show', methods: 'DELETE')]
    public function remove(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $entityManager = $doctrine->getManager();
        $user = $doctrine->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => "Aucun utilisateur trouvé",
                "status" => 404,
            ]);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'User have been removed !',
            'status' => 200,
        ]);
    }
}
