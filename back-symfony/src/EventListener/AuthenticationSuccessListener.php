<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $event->setData([
            'code' => $event->getResponse()->getStatusCode(),
            'payload' => $event->getData(),
            'user' => [
                'id' => $event->getUser()->getId(),
                'username' => $event->getUser()->getUsername(),
                'email' => $event->getUser()->getEmail(),
                'phone' => $event->getUser()->getPhone(),
                'firstname' => $event->getUser()->getFirstName(),
                'lastname' => $event->getUser()->getLastName(),
                'roles' => $event->getUser()->getRoles(),
            ]
        ]);
    }
}
