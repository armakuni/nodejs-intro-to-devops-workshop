# nodejs-intro-to-devops

## Overview

This repository, is a nodejs introductory application to DevOps. It is a basic application that highlights the core princilples of DevOps.

## Technologies
- Javascript (ES6+)
- Nodejs (v14.x)
- Express
- Jest
- Eslint
- Docker
- Kubernetes

## Setup & Prerequisites
### Install NodeJS
  First you will need to install NodeJS, if your unsure if you already have Node installed then run the version command (see below) to check for any currently installed versions of Node.
  
  ```
  node -v
  ```
  
  If this command gives and error or returns a version other than the one used for this exercise (v14.x) then you will need to install or update Node.

  If you are using a mac then the easiest way to install NodeJS is via brew, by using the following command:
  
  ```
  brew install node@14
  ```
  If you are using windows or linux then follow the installation instructions for your OS at https://nodejs.org/en/download/, you may need to navigate to the previous versions section and search for version 14.

  >If you wish to have multiple different versions of node installed at the same time, as different projects may have different requirements, then you can use a tool such as NVM (https://github.com/nvm-sh/nvm) to manage this. 

  ### Install Docker Desktop
  Next you will need to install Docker Desktop, to do this visit https://www.docker.com/products/docker-desktop/ and follow the instructions for your OS. 

  Once installed ensure docker desktop is running, on mac you should see the docker logo (whale with containers on its back) in your task bar on the top of your screen, when you hover your mouse over it, it should show you the status of docker, this should be `Docker Desktop is Running`.
  
  Open this and then click the cog icon in the top right to navigate to Preferences click on `Kubernetes` and then check the `Enable Kubernetes` box then hit `Apply & Restart`. 

  ### Install kubectl
  The final tool you need to install is kubectl the kubernetes command line tool. To do this visit https://kubernetes.io/docs/tasks/tools/ and follow the instructions for your OS.

  ### Install App Dependencies
  Finally before the app can be run we need to install its dependencies. To do this ensure that you are at the root of the repo and then run the following `npm` command.

  ```
  npm install
  ```

## Running the App locally
With all the prerequisite tools and app dependencies now installed you can run and interact with the app on your local machine. To do this run the following command from the root of the repo.

```
npm run start
```

If successful you should see the following in your terminal

```
app listening on port 3000
```

With the app now running you are able to interact with it on the listening port listed in your terminal by making requests to it via a tool like Postman (https://www.postman.com/downloads/) on:

```
localhost:<port>
```

The app exposes 2 endpoints a `GET` on `/` and a `POST` on `/greet`. The first returns a simple Hello World message if successful, whilst the second expects a json body containing the name to greet, and will return a greeting if successful.

```
{
  "name": "Bob"
}
```
You can terminate the app at any time with `ctrl+c`.

### Running the Tests
The App also contains a series of simple example unit tests, these can be run with the following command, this uses the Jest jaavscript testing framework (https://jestjs.io/).

```
npm run test
```

### Linting
Linting can also be ran against the app code by running the following command, this uses the Eslint javascript linting tool (https://eslint.org/).

```
npm run lint
```

With all dependencies installed you can now run your application using the code below. This will start the application without using docker. Once the application is up and running you can then call the endpoint using postman.


## Running the App in Docker
### Create a Dockerfile
Before we can run the App in docker we first need to create a Dockerfile, this file will contain a series of instructions to be carried out to build the desired docker image, you can read more about Dockerfiles at https://docs.docker.com/engine/reference/builder/. 

The first element of any Dockerfile is defining the base image with which it will build upon. Base images are typically images containing lightweight or cutdown versions of linux based OS's (e.g. https://www.alpinelinux.org/ or Debian Slim etc), but may also contain various tools and dependencies pre-configured and ready for use. 

In this we will be using one of NodeJS's official docker images as the base image (see https://hub.docker.com/_/node), there are a number of different variant images available, known as different tags, with each based on different OS's or OS version or included tools, but all will have some version NodeJS and NPM already installed and configured.

To define this in our Dockerfile we use the FROM statement on the first like of the file, this should then be followed by the name of the image, in this case `node`. We can also optionally define a specific tag of the image to use by adding a `:` and then the name of the tag. Tags are not required but not defining one causes it to use the `latest` tag by default which may not contain the desired versions or tools. In this we want to use specifically Node v14.x so will want the appropriate tag which contains this version, you can search through the available tags here https://hub.docker.com/_/node?tab=tags.

Once pieced together your base image definitions should looks something like:

```
FROM <image_name>:<image_tag>
```

Next we will want to set the working directory of the image, this is essentially just the directory were other commands will be run from. We can do this with the `WORKDIR` statement.

```
WORKDIR <path>
```

Next we will want to copy the files necessary for the app into the image so that we can later run the app within the image. We can copy files and directories with the COPY command followed by the path to the source files locally (this will be relative to location of the build context, this is typically the location of the Dockerfile, but can be different) and then the destination path within the image (absolute path or relative to the working directory).

```
COPY <src> <dest> 
```

Next we we will want to run some commands to perform any configuration that may be needed for the app to run, e.g. installing the apps dependencies. We can do this by using the `RUN` statement followed by the command as you would use it in your own terminal

```
RUN node -v
```

Finally we want to define the command to be executed when we run the built image, this will likely be the command needed to start the app. We do this with the `CMD` statement followed by a list of comma separated parameters & arguments.

```
CMD ["node","-v"]
```

### Build the Docker Image
Before we can run the docker image containing our app we first need to build it using the Dockerfile we previously created. We do this with the following command, specifying a tag to name the image (e.g. `my-node-app`) with the `-t` option, and then the path to the context (this is important as the src location in `COPY` commands is relative to this). Optionally you can also use the `-f` option followed by a path if your Dockerfile is in a different location from where you are building the image.

```
docker build -t <tag_name> <path_to_context>
```

If the image successfully builds then you should see it in the list of locally available images when you run the docker list images command:

```
docker image ls
```

### Running the Image
With the image now successfully built we can now run the image in a docker container, we can do this with the following run command, specifying the image name and tag, that we defined when we built it, with the `-p` option to expose ports and optionally the `-d` option to run it in detached mode in the background.

```
docker run -p <container_port>:<local_port> <image_name>
```

With the container now running you should be able to interact with the app as you did when you ran it locally substituting the port for the local port you defined when you ran the container. If you ran the container without the -d option then you should now see any output of the container in your terminal. If you ran the container in detached mode with the -d option then you can check to see if the container is running with the following command:

```
docker container ls
```

and you can check its output with the docker logs command using the `Container ID` found in the output of the previous command:

```
docker logs <container_id>
```

### Stopping the Container
If you ran the container in the foreground without the `-d` option then you can stop the container by using `ctrl+c`. However if you ran it in detached mode you can stop the container with the docker stop command using the `Container ID` found when you list the running containers.

```
docker stop <container_id>
```

### Running the App in Kubernetes

