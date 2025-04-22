# build environment
FROM node:17-alpine as build
WORKDIR /app

### disable linking of Cypres test framework
ARG CYPRESS_DISABLED=1

ENV PATH /app/node_modules/.bin:$PATH
COPY ./app/package.json ./
COPY ./app/package-lock.json ./
COPY ./app/make.ts ./
COPY ./app/makelib/ ./makelib/
RUN npm i
COPY ./app/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
RUN apk add --no-cache bash
RUN rm -rf /etc/nginx/conf.d
COPY templates/nginx/conf.d/ /etc/nginx/conf.d/
#COPY templates/nginx/.htpasswd /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html
COPY ./gen-config.sh /usr/share/nginx/gen-config.sh
EXPOSE 80
CMD ["/bin/bash", "-c", "cd /usr/share/nginx && chmod 755 ./gen-config.sh && ./gen-config.sh > html/config.js && nginx -g 'daemon off;'"]
