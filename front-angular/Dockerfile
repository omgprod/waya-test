FROM node:lts
RUN mkdir /home/node/app && chown node:node /home/node/app
RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
WORKDIR  /home/node/app
USER node
COPY --chown=node:node package.json package-lock.json ./
#COPY --chown=node:node package.json ./
#RUN npm install -g @angular/cli
RUN npm ci --quiet
COPY --chown=node:node . .
EXPOSE 4200
