FROM node:18-alpine

ADD . /app
WORKDIR /app

ENV PORT 8765
EXPOSE 8765
CMD ["npm", "start"]
