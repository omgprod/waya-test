# WAYA TEST

### Built With

* [![Angular][Angular.io]][Angular-url]

Author : Haggerty Brian

Operating System: Parrot OS 5.0 (Electro Ara)

Kernel: Linux 5.18.0-14parrot1-amd64

Architecture: x86-64

## Versionning

- Docker version: 20.10.5+dfsg1
- Docker compose version : 1.29.2
- NodeJS v17.9.1
- NPM v8.11.0

Repo base symfony flex avec docker :
[Kévin Dunglas](https://github.com/dunglas/symfony-docker)

## APP PORTS

PORT BACKEND HTTP_PORT=8000 HTTPS_PORT=4443
PORT FRONTEND HTTP_PORT=4200

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/omgprod/waya-test.git
   ```
2. Move to rep
   ```sh
   cd ./waya-test
   ```
3. Build & start
   ```sh
   npm run build && npm run start
   ```

## COMMANDS 
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


[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
