# Project Title

This projects depicts working of micro service via a simple project buying application

---
## Requirements

For development, you will only need Node.js and a node global package, npm , installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

## Install

    $ git clone https://github.com/KETAN986/product_services_demo/
    $ cd product_services_demo
    $ npm install


## Running the api gateway

    $ npm start


## Running the services
    $ cd services/service_product
    $ npm start
    $ cd..

    $ cd service_product_price
    $ npm start
    $ cd..

    $ cd service_product_stocks
    $ npm start
    $ cd..


## building docker image

- ### docker image of api gateway

  create docker image and run

      $ docker build -t gateway .
      $ docker run -d  -p 6001:6001 gateway

- ### docker image of services

  create docker images of service and run

      $ cd services/service_product
      $ docker build -t service_product .
      $ docker run -d  -p 6004:6004 service_product
      $ cd..

      $ cd service_product_price
      $ docker build -t service_product_price .
      $ docker run -d  -p 6003:6003 service_product_price
      $ cd..

      $ cd service_product_stocks
      $ docker build -t service_product_stocks .
      $ docker run -d  -p 6002:6002 service_product_stocks
      $ cd..
