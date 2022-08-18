Author : Haggerty Brian

Operating System: Parrot OS 5.0 (Electro Ara)

Kernel: Linux 5.18.0-14parrot1-amd64

Architecture: x86-64

Docker version: 20.10.5+dfsg1

Docker compose version : 1.29.2

Repo base symfony flex avec docker de Kévin Dunglas :
https://github.com/dunglas/symfony-docker

# COMMANDS 

# Build project
- ./back-symfony
- docker compose build --pull --no-cache

# Start project with build
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up --build

# Start project
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up

# Start project daemon
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up -d

# Reload fixtures
docker compose exec php bin/console hautelook:fixtures:load

# Front-end 
- [ ] Documentations
- [x] Generation App & Composants
- [x] Mise en place routing, 404
- [x] Mise en place HttpModule & autres libs
- [x] Mise en place Auth, Interceptors, Guard, JWT
- [x] Récupérations de données, mise en forme TS
- [ ] Mise en place de toutes les pages et des données
- [ ] Login
- [x] Register
- [x] Logout
- [ ] Observable
- [ ] Store NGRX
- [x] Get Deep on Angular Materials Components 
- [ ] UI & SASS
- [ ] Vérification sécurité & optimization code

# Back-end 
- [ ] Documentations
- [x] Récupération de Symfony Flex
- [x] Ajouts deps : FOSRest, Doctrine, lexik_jwt, nelmio_alice, nelmio_cors 
- [x] Entités Users
- [x] Controller REST
- [x] JWT
- [x] Routes sécurisées
- [x] Fixtures
- [ ] Validation, Sécurisations
- [ ] Security.yaml
- [ ] Vérification sécurité & optimization code
- [ ] Test de l'ensemble
- [ ] PHPUnit

# Docker 
- [ ] Documentations
- [x] Récupération de symfony/flex docker 
- [x] Ajout front-end angular 
- [x] Ajout pgadmin4 
- [x] Network
- [x] structuration du docker-compose.yaml
- [ ] docker-compose.yaml à la racine fonctionnel
