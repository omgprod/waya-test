Author : Haggerty Brian

Operating System: Parrot OS 5.0 (Electro Ara)
Kernel: Linux 5.18.0-14parrot1-amd64
Architecture: x86-64

Docker version: 20.10.5+dfsg1
Docker compose version : 1.29.2

Repo base symfony flex avec docker de Kévin Dunglas :
https://github.com/dunglas/symfony-docker

- COMMANDS : 

Docker build project 
- docker compose build --pull --no-cache

Start project and build with docker
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up --build

Start project and get logs return in console
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up

Start project daemon
- HTTP_PORT=8000 HTTPS_PORT=4443 docker compose up -d


- docker build -t bharathirajatut/angular-app:latest .
