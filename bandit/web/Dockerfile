FROM node:16-bullseye-slim as build

WORKDIR /usr/src/app
COPY yarn.lock ./ 
RUN yarn
COPY . .
RUN yarn build


FROM node:16-bullseye-slim as prod
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /usr/src/app

# install only production dependencies
COPY yarn.lock ./
RUN yarn install --production

# copy only dist folder from build stage
COPY --from=build /usr/src/app/dist ./dist

ENV PORT=8080
EXPOSE 8080
CMD [ "yarn", "start" ]
