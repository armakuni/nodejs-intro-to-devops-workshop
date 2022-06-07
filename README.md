# nodejs-intro-to-devops

<h2>Technologies used</h2>
<ul>
<li>nodejs</li>
<li>express</li>
<li>jest</li>
<li>eslint</li>
<li>docker</li>
<li>kubernetes</li>
<li>postman</li>
</ul>
<h2>Overview</h2>

This repository, is a nodejs introductory application to DevOps. It is a basic application that highlights the core princilples of DevOps.

<h2>Setup</h2>
<ul>
  <h3>Node</h3>
  <li>Check you have node version 14 on your machine</li>

  ```
  node -v
  ```
  <li>If node version 14 is not present use Homebrew to install it (you can have multiple node versions and manage them using nvm)</li>

  ```
  brew install node@14
  ```
  <h3>Postman</h3>
  <li><a href="https://www.postman.com/product/rest-client/">To download and install postman</a></li></p>
  <h3>Docker</h3>
  <li><a href="https://www.docker.com/products/docker-desktop/">Download and Install docker </a></li>
  <li>After forking the repo, install dependencies (npm install)</li>
</ul>
<h2>Start Server without docker</h2>
 <p>With all dependencies installed you can now run your application using the code below. This will start the application without using docker. Once the application is up and running you can then call the endpoint using postman.</p>

  ```
  npm start
  ```
<h2>Run Test</h2>
 <p></p>

  ```
  npm test
  ```

<h2>Docker file code Snippet</h2>
<p>To run this app in docker, docker needs to already have been installed on your machine</p>
<p>Create and update your Dockerfile using this code below</p>

```
FROM node[insert version here]
WORKDIR /app []
COPY . /app []
RUN npm install []
EXPOSE []
CMD ["node","npm start"] []
```
<h2>To run docker use codes below</h2>
<h3>To build a docker image</h3>
<p>The code below, builds an image of your current code, you need to save any unsaved work before running this command in order to pick up latest changes to the file(s).</p>
<p>An image is simply a combination of our code and runtime engine</p>

```
docker build .
```
<h3>List docker image</h3>
<p>In order to see the latest image you will need to run a command to list all images, and then copy the latest image_id. This image id will be used in the command</p>

```
docker image ls
```
<h3>RUN Container</h3>
<p>A container is a running instance of an image</p>

```
docker run image id
```
<h2>Kubernetes</h2>

