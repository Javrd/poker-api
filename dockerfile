FROM node:8.9.3-alpine

# This avoid to create node_modules if package.json hasn't changed.
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /home/node/

# We add here the rest of the code.
WORKDIR /home/node
ADD . /home/node

ENTRYPOINT [ "npm", "start" ]