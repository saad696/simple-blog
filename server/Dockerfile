#use an existing docker image as base
FROM alpine

# download dependencies
RUN apk add --update gcc
RUN apk add --update redis

# telling image what to do when it starts
CMD ["redis-server"]