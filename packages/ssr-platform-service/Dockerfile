# Use a Node.js image and assign it as our build
FROM node:12.6.0 as build
# Set the working directory, copy dependency management files to the working directory,
# and install the dependencies
WORKDIR /usr/src
RUN printenv && \
    mkdir -p packages/weplay-events && \
    mkdir -p packages/weplay-core && \
    mkdir -p packages/weplay-singleton && \
    mkdir -p packages/weplay-components && \
    mkdir -p packages/weplay-media && \
    mkdir -p packages/weplay-competitive && \
    mkdir -p packages/weplay-platform && \


    mkdir -p packages/ssr-platform-service

    # ============== node libs ===========
RUN ls && \
    mkdir -p packages/weplay-node-logger && \
    mkdir -p packages/weplay-node-cloud-config && \
    mkdir -p packages/weplay-node-shutdown && \
    mkdir -p packages/weplay-node-registration
    # ============== node libs ===========

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .npmrc .npmrc
# ================= our dependencies ============
COPY packages/weplay-singleton/package.json packages/weplay-singleton/package.json
COPY packages/weplay-core/package.json packages/weplay-core/package.json
COPY packages/weplay-components/package.json packages/weplay-components/package.json
COPY packages/weplay-media/package.json packages/weplay-media/package.json
COPY packages/weplay-competitive/package.json packages/weplay-competitive/package.json
COPY packages/weplay-platform/package.json packages/weplay-platform/package.json
COPY packages/weplay-events/package.json packages/weplay-events/package.json
# ================= our dependencies ============
COPY packages/ssr-platform-service/package.json packages/ssr-platform-service/package.json

# ============== node libs ===========
COPY packages/weplay-node-shutdown/package.json packages/weplay-node-shutdown/package.json
COPY packages/weplay-node-shutdown/tsconfig.json packages/weplay-node-shutdown/tsconfig.json
COPY packages/weplay-node-logger/package.json packages/weplay-node-logger/package.json
COPY packages/weplay-node-logger/tsconfig.json packages/weplay-node-logger/tsconfig.json
COPY packages/weplay-node-cloud-config/package.json packages/weplay-node-cloud-config/package.json
COPY packages/weplay-node-cloud-config/tsconfig.json packages/weplay-node-cloud-config/tsconfig.json
COPY packages/weplay-node-registration/package.json packages/weplay-node-registration/package.json
COPY packages/weplay-node-registration/tsconfig.json packages/weplay-node-registration/tsconfig.json
# ============== node libs ===========

COPY packages/weplay-node-shutdown/scripts/trap_wrapper.sh .
RUN chmod a+x trap_wrapper.sh
RUN yarn install
COPY . .

RUN node_modules/.bin/lerna run build --stream --scope=weplay-node-*

RUN yarn ssr-platform-service
RUN yarn --production
RUN rm -f .npmrc
# Create a new image using a minimal Node.js image
# with no extra tools packaged in, such as Yarn or npm for the smallest final size
FROM node:12.6.0-alpine

#https://github.com/nodejs/docker-node#nodealpine
RUN apk add libc6-compat

# Set the working directory for the new image and
WORKDIR /usr/src
ENV NODE_ENV="production"

# Copy files from the base image over to our new image's working directory
COPY --from=build /usr/src .
# https://stackoverflow.com/questions/40944479/how-to-use-bash-with-an-alpine-based-docker-image
RUN apk add bash
EXPOSE 3000
CMD ["bash", "./trap_wrapper.sh"]
