# WePlay Frontend App
**Requirenments:**
- Node: 12.11.1

## Clone
```
git clone ssh://git@weplay.dsgroup.mobi:7999/wmf/frontend.git
```

## Installation

```bash
$ yarn
```

## Run in development
**Starting by default on localhost:8080**

```bash
$ yarn start
```

## Build
```bash
NODE_ENV=production yarn build
```

## Run in production
**Starting by default on 127.0.0.1:8080**

```bash
$ NODE_ENV=production yarn start
```

## Eslint

To check code with official JS style guide execute following:

```bash
./node_modules/.bin/eslint ./src  --ext .js --ext .jsx --fix
```

## Nginx Config

```
server {
  listen 80;
  server_name  weplay.devel.org.ua;
  location / {
    root /frontend/public;
    index  index.html index.htm;
    try_files $uri /index.html;
    add_header Last-Modified $date_gmt;
    add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    if_modified_since off;
    expires off;
    etag off;
  }
}
```

## Play with Docker

- **Build container:**

```bash
NODE_ENV=production yarn build

docker build -t weplayregistrytest.azurecr.io/frontend:v0.0.1 .
```

- **Run Container:**
Go to http://localhost:7700 in browser
```bash
docker run --name weplay-app -d -p 7700:80 weplayregistrytest.azurecr.io/frontend:v0.0.1
```

- **Stop, Remove process & container image:**
```bash
docker ps -a | grep weplayregistrytest.azurecr.io/frontend | cut -d ' ' -f 1 | xargs docker stop | xargs docker rm

docker images | grep weplayregistrytest.azurecr.io/frontend | cut -d ' ' -f 1 | xargs docker rmi

docker rmi `docker images | grep weplayregistrytest.azurecr.io/frontend | awk '{ print $3; }'`
```

- **Push Container to Azure cloud registry:**
```bash
docker push weplayregistrytest.azurecr.io/frontend:v0.0.1
```

- **Pull Container to Azure cloud registry:**
```bash
docker pull weplayregistrytest.azurecr.io/frontend:v0.0.1
```

- **Export Docker image to file:**
```bash
docker image save -o weplay-frontend-v0.0.1.img 2c298741f0d7
```

- **Import Docker image from file:**
```bash
docker image load -iq weplay-frontend-v0.0.1.img
```

yarn login

TODO: add
  "publishConfig": {
    "registry": "http://ec2-3-120-159-84.eu-central-1.compute.amazonaws.com:4873"
  },
  when coming back to lerna


Migration to React 16.9
1. SideEffect(NullComponent) - react helmet 
https://github.com/nfl/react-helmet/issues/413
https://github.com/gaearon/react-side-effect/issues/54

3. ReactPlayer
https://github.com/CookPete/react-player/issues/696


https://github.com/webpack-contrib/mini-css-extract-plugin/pull/344 - support for rel prefetch
 for styles
