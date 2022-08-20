[https://example.com](https://example.com)


Author : Haggerty Brian

Operating System: Parrot OS 5.0 (Electro Ara)

Kernel: Linux 5.18.0-14parrot1-amd64

Architecture: x86-64

Versionning : 

- Docker version: 20.10.5+dfsg1
- Docker compose version : 1.29.2

Repo base symfony flex avec docker de Kévin Dunglas :
https://github.com/dunglas/symfony-docker

PORT BACKEND HTTP_PORT=8000 HTTPS_PORT=4443
PORT FRONTEND HTTP_PORT=4200

## Installation

2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

# COMMANDS 
- npm run build       # Initialisations des images, containers, volumes
- npm run fresh-start # Initialisations et démarrage des containers
- npm run start":     # Démarrage des containers DAEMON,
- npm run start-logs  # Démarrage des containers + logs
- npm run down        # Stop les containers
- npm run stop        # Stop les containers, supprime les volumes liés 
- npm run logs        # Logs des containers
- npm run fixtures    # Injections d'utilisateurs
- npm run restart     # Stop, Redémarre
- npm run reboot      # Stop, Supprime, Redémarre, Log

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
- [x] Documentations
- [x] Récupération de symfony/flex docker 
- [x] Ajout front-end angular 
- [x] Ajout pgadmin4 
- [x] Network
- [x] structuration du docker-compose.yaml
