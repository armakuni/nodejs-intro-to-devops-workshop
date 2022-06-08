# nodejs-intro-to-devops

## Overview

This repository, is a nodejs introductory application to DevOps. It is a basic application that highlights the core principles of DevOps.

### Technologies
- Javascript (ES6+)
- Nodejs (v14.x)
- Express
- Jest
- Eslint
- Docker
- Kubernetes

## Setup & Prerequisites

  ### 1. Create Docker Hub account

  Sign up for a Free docker hub account by [clicking here](https://hub.docker.com/signup).
  
  Remember your docker hub id and password as we will require them later.

  ### 2. Install NodeJS
  First you will need to install NodeJS, if your unsure if you already have Node installed then run the version command (see below) to check for any currently installed versions of Node.
  
  ```
  node -v
  ```
  
  If this command errors or returns a version other than the one used for this exercise (v14.x) then you will need to install or update Node.

  If you are using a mac then the easiest way to install NodeJS is via brew, by using the following command:
  
  ```
  brew install node@14
  ```
  If you are using windows or linux then follow the installation instructions for your OS at https://nodejs.org/en/download/, you may need to navigate to the previous versions section and search for version 14.

  >If you wish to have multiple different versions of node installed at the same time, as different projects may have different requirements, then you can use a tool such as [NVM](https://github.com/nvm-sh/nvm) to manage this. 

  ### 3. Install Docker Desktop
  Next you will need to install Docker Desktop, to do this visit https://www.docker.com/products/docker-desktop/ and follow the instructions for your OS. 

  Once installed ensure docker desktop is running, on mac you should see the docker logo (whale with containers on its back) in your task bar on the top of your screen, when you hover your mouse over it, it should show you the status of docker, this should be `Docker Desktop is Running`.

  Execute below command to confirm the docker is running:
  ```
  docker --version
  ```

  ### 4. Enable Kubernetes in Docker Desktop

  Open the docker desktop app and follow the steps below as shown in the images to setup Kubernetes as indicated by the red arrow.

  #### 4.1 Click on the gear icon
  ![Alt text](./images/image-one.png )
  #### 4.2 Select kubernetes
  ![Alt text](./images/image-two.png )
  #### 4.2 Enable kubernetes checkbox
  ![Alt text](./images/image-three.png )
  #### 4.2 Click on Apply & Restart
  ![Alt text](./images/image-four.png )

  ### 4.4 Installing `kubectl` cli

  We use kubernetes command line tool `kubectl` to interact with the Kubernetes cluster. Execute below command in your terminal to install it:
  ```
  brew install kubectl
  ```
  For other OS installation options [click here](https://kubernetes.io/docs/tasks/tools/).

  To ensure your Kubernetes installation is working execute the following command
  ```
  kubectl get namespaces
  ```

  You should see an output as below, these are the default namespaces that comes with your installation.

  ![Alt text](./images/image-five.png "Select gear")

## Running the App locally

Clone the repository to your workspace and open the codebase in an IDE of your choice.

```
git clone https://github.com/armakuni/nodejs-intro-to-devops-workshop.git
```

### Install App Dependencies
Finally before the app can be run we need to install its dependencies. To do this ensure that you are at the root of the repo and then run the following `npm` command.

  ```
  npm install
  ```

With all the prerequisite tools and app dependencies now installed you can run and interact with the app on your local machine. To do this run the following command from the root of the repo.


### Running the Tests
The App also contains a series of simple example unit tests, these can be run with the following command, this uses the Jest javascript testing framework (https://jestjs.io/).

```
npm run test
```

### Linting
Linting can also be ran against the app code by running the following command, this uses the Eslint javascript linting tool (https://eslint.org/).

```
npm run lint
```

### Node Application
Execute below command to start the application:
```
npm run start
```

If successful you should see the following in your terminal

```
app listening on port 3000
```

The app exposes 2 endpoints which can either be tested using CLI utility [curl](https://curl.se/), [Postman](https://www.postman.com/downloads/) or browser for `GET` requests:


- A `GET` on `http://localhost:3000/` which  returns a simple `Hello local world!` message if successful.

  To test the application on your browser, click on   the link below
  http://localhost:3000

  Expected Output:
  ![](./images/local-response.png)


- A `POST` on `/greet` expects a json body   containing the name to greet, and will return a   greeting if successful.
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"name": "Bob"}' http://localhost:3000/greet
  ```

  Expected Output:

  ```json
  {
    "msg":"Hello Bob!"
  }
  ```

You can terminate the app at any time with `ctrl  +c`.

## Running the App in Docker

### Create a Dockerfile

The very first step is to create a Docker file, it is a set of instruction that Docker understands to perform the desired operation.

Please find below a list of important Docker keywords and there respective description.

| KEYWORD       | Usage Description
| ------------- | ------------- 
| FROM          | Defines the base image to use to start the build process. A image defined here will be pulled from Docker Hub or other container repository. It needs to be the first command declared inside a Dockerfile.         
| WORKDIR      | Set where the command defined with CMD is to be executed.       
| ENV          | Sets an Environment variable within the container & can be accessed by scripts and applications alike.         
| CMD          | Execute the given command when a container is instantiated using the image being built.         
| RUN          | Execute any additional command when docker image is built.        
| EXPOSE       | Used to associate a specified port to enable networking between the running process inside the container and the outside world (i.e. the host).
| COPY         | Takes in a src and destination arguments & copy a local file or directory from your host (the machine building the Docker image) into the Docker image itself.
| ADD          | Apart from what COPY does, it also supports 2 other sources. First, you can use a URL instead of a local file / directory. Secondly, you can extract a tar file from the source directly into the destination.        
| ENTRYPOINT   | Sets the concrete default application that is used every time a container is created using the image. For example, here we are using Spring Boot application inside the image. To only run that application use ENTRYPOINT and whenever a container is created our application will be the target. If we couple ENTRYPOINT with CMD, we can remove “application” from CMD and just leave “arguments” which will be passed to the ENTRYPOINT.

Once pieced together your base image definitions should looks something like the below:

```
FROM node:14-alpine3.16
WORKINGDIR /app
COPY . /app
RUN npm install
RUN addgroup www; \
    adduser -D -G www nodeusr; \
    chown -R :www /app;
USER nodeusr
CMD ["npm", "start"]
```

Using the example above, create a docker file for this project <b>[there are deliberate mistakes to be fixed].</b>


### Build the Docker Image
Before we can run the docker image containing our app we first need to build it using the Dockerfile we previously created.

We do this with the following command, specifying a tag to name the image (e.g. `my-node-app`) with the `-t` option, and then the path to the context (this is important as the src location in `COPY` commands is relative to this).

Optionally you can also use the `-f` option followed by a path if your Dockerfile is in a different location from where you are building the image.

```
docker build -t [YOUR_DOCKER_HUB_ID/DOCKER_IMAGE_NAME]:[TAG] [path_to_context]
```

Example:
```
docker build -t abhisheksr01/helloworld:0.0.1 .
```

If the image successfully builds then you should see it in the list of locally available images when you run the docker list images command:

```
docker image ls
```

### Running the container using the image
With the image now successfully built we can now run the image in a docker container.

We can do this with the following run command, specifying the image name and tag, that we defined when we built it, with the `-p` option to expose ports and optionally the `-d` option to run it in detached mode in the background.

```
docker run -p [container_port]:[local_port] -d [YOUR_DOCKER_HUB_ID/DOCKER_IMAGE_NAME]:[TAG]
```

Example:

```
docker run -p 3001:3000 -d abhisheksr01/helloworld:0.0.1
```

With the container now running you should be able to interact with the app as you did when you ran it locally substituting the port for the local port you defined when you ran the container.

http://localhost:3001/

If you ran the container without the -d option then you should now see any output of the container in your terminal.

If you ran the container in detached mode with the -d option then you can check to see if the container is running with the following command:

```
docker container ls
```

and you can check its output with the docker logs command using the `Container ID` found in the output of the previous command:

```
docker logs [container_id]
```

### Stopping the Container
If you ran the container in the foreground without the `-d` option then you can stop the container by using `ctrl+c`. However if you ran it in detached mode you can stop the container with the docker stop command using the `Container ID` found when you list the running containers.

```
docker stop [container_id]
```

### Pushing Image to Docker Hub

Logging to docker hub using credentials obtained during setup step:

```
docker login
```

Expected Output:
![](./images/docker-login.png)

Push local docker image to docker hub as below:
```
docker push [YOUR_DOCKER_HUB_ID/DOCKER_IMAGE_NAME]:[TAG]
```

Example:
```
docker push abhisheksr01/helloworld:0.0.1
```

## Running the App in Kubernetes

- There are two files we need to familiarize ourselves with, both of them are kubernetes manifest located in the kubernetes folder.

- These files outline the objects that will be created.

## Update Kubernetes Manifest
Open the [deployment.yaml](./kubernetes/deployment.yaml) file and replace the docker image name with the one you have pushed to the docker hub.

```yaml
- name: nodejs-intro-to-devops
  image: [YOUR_DOCKER_HUB_ID]/[DOCKER_IMAGE_NAME]:[DOCKER_IMAGE_TAG]
```

Example:
```yaml
- name: nodejs-intro-to-devops
  image: abhisheksr01/helloworld:0.0.1
```

Once done execute below command:

## Deploy app to kubernetes
```
kubectl apply -f ./kubernetes
```

Kubernetes apply will instruct the kubernetes api to create the object as specified in the kubernetes manifest.

## Check the app deployed
The get pods lists all running pods. You should be able to see the nodejs intro to devops listed after this command is run.
```
kubectl get pods
```

```
kubectl get deployments
```

```
kubectl get services
```

## Accessing the application locally

The following command exposes the port
```
kubectl port-forward service/nodejs-intro-to-devops 3002:3000
```

Click the url http://localhost:3002 to access the application.

## Changing the application response

Our application uses an environment variable `GREET_MESSAGE` to store the Greeting message.

Lets update the deployment.yaml to change the response.

```yaml
containers:
        - name: nodejs-intro-to-devops
          image: [YOUR_DOCKER_HUB_ID]/[DOCKER_IMAGE_NAME]:[DOCKER_IMAGE_TAG]
          ports:
            - containerPort: 3000
          imagePullPolicy: Always
          env:
            - name: "GREET_MESSAGE"
              value: "Hello World I am running inside k8s cluster."
```

Execute below command to implement the changes:

```
kubectl apply -f ./kubernetes
```

To re establish the port forwarding execute below command:

```
kubectl port-forward service/nodejs-intro-to-devops 3002:3000
```

### Delete kubernetes objects

Finally, to cleanup your project, run the command to delete the pod
```
kubectl delete -f ./kubernetes
```