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
                "message" => "Aucun utilisateurs trouvé",
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

    #[Route('/user-create', name: 'create_user', methods: 'GET')]
    public function generateAdminUser(
        UserPasswordHasherInterface $passwordHasher,
        ManagerRegistry $doctrine,
        ValidatorInterface $validator): JsonResponse
    {
        $entityManager = $doctrine->getManager();

        $user = new Users();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            "password"
        );
        $user->setUsername('admin');
        $user->setFirstName('Jean');
        $user->setLastName('Test');
        $user->setPassword($hashedPassword);
        $user->setEmail('admin@admin.fr');
        $user->setPhone('0613072006');
        $user->setRoles(['ROLE_ADMIN']);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => $errors,
                "status" => 404,
            ]);
        }
        for ($i = 0; $i < 10; $i++) {
            $userRand = $this->generateRandomUsers($passwordHasher, $doctrine, $validator);
            $entityManager->persist($userRand);
            $entityManager->flush();
        }
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Génération terminé',
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

    private function generateRandomUsers(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine,ValidatorInterface $validator): Users | JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $names = ["jean", "richard", "paul", "john", "anne", "lea", "marie", "lucia"];
        $lastnames = ["dupont", "doe", "henry", "carter", "stein", "nguyen"];
        $mail = ["@gmail.com", "@live.com", "@mailjet.com", "@orange.com", "@free.com", "@msfr.com"];
        $role = ["ROLE_USER", "ROLE_ADMIN"];
        $phone = "06" . random_int(10000000, 99999999);
        $user = new Users();

        while(1){
            $name = $names[array_rand($names)];
            $lastname = $lastnames[array_rand($lastnames)];
            $roles = $role[array_rand($role)];
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                "password"
            );
            $email = $names[array_rand($names)] . $mail[array_rand($mail)];
            $alreadyIn = $entityManager->getRepository(Users::class)->findBy(["email" => $email]);
            if(!$alreadyIn){
                break;
            }
        }

        $user->setFirstName($name);
        $user->setLastName($lastname);
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setRoles([$roles]);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => $errors,
                "status" => 400,
            ]);
        }
        return $user;
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
            'message' => 'Utilisateur trouvé',
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
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $entityManager = $doctrine->getManager();
        $firstname = (string)$request->request->get('firstName');
        $lastname = (string)$request->request->get('lastName');
        $email = (string)$request->request->get('email');
        $password = (string)$request->request->get('password');
        $phone = (string)$request->request->get('phone');

        if (!$email) {
            return new JsonResponse([
                "type" => "Erreur",
                "message" => "Aucun utilisateur trouvé",
                "status" => 404,
            ]);
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
            'message' => 'Utilisateur créé',
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
            return new JsonResponse([
                "type" => "Erreur",
                "message" => "Aucun utilisateur trouvé",
                "status" => 404,
            ]);
        }
        if (!empty($request->getContent()))
        {
            $params = json_decode($request->getContent(), true);
            foreach ($params as $key => $value) {
                if($key === "password"){
                    $hashedPassword = $passwordHasher->hashPassword(
                        $user,
                        $value
                    );
                    $user->setPassword($hashedPassword);
                }
                if($key === "firstName"){
                    $user->setFirstName(htmlspecialchars($value));
                }
                if($key === "lastName"){
                    $user->setLastName(htmlspecialchars($value));
                }
                if($key === "email"){
                    $user->setEmail(htmlspecialchars($value));
                }
                if($key === "phone"){
                    $user->setPhone(htmlspecialchars($value));
                }
                if($key === "roles"){
                    if($value === "ROLE_USER" || $value === "ROLE_ADMIN")
                        $user->setRoles(htmlspecialchars($value));
                }
            }
            $entityManager->flush();
        }

        return new JsonResponse([
            'id' => $user->getId(),
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
            'message' => 'Utilisateur supprimé',
            'status' => 200,
        ]);
    }
}
