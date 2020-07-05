FROM node:latest
WORKDIR /APP/front/
COPY /front/package.json /front/package-lock.json ./
RUN npm i
COPY /front ./
RUN npm run build

FROM node:latest
WORKDIR /APP
COPY app.js package.json package-lock.json queries.js ./
RUN npm i
COPY --from=0 /APP/front/build ./front/build
ENTRYPOINT ["node","app.js"]