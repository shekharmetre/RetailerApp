# setting the base image to create the image for my retailerapp backend
FROM node:latest

RUN addgroup app && adduser --system --ingroup app --no-create-home --home /app --shell /bin/false app

USER app

WORKDIR /app 

#copy package.json and package-lock.json to the working directory
#this is done before copying the rest of the files to take advantage of docker's cache
#if the package.json and package-lock.json files haven't changed,docker will use the cached depedencies.


COPY  package*.json ./


# sometimes the  ownership of the files in the working directory is changed to root
# and thus app can't access the files and throws an error -> Eaccess:permission denied
#to avoid this ,change the ownership of the files to the root user

USER root

RUN  chown -R app:app .


USER app

COPY .env ./



RUN npm install

COPY . .

EXPOSE 8080

CMD npm run dev


