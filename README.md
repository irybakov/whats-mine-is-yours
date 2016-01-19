# What's Mine is Yours


A music streaming service made with love. A work in progress. Slow progress.


### SETUP

Before getting starting, you'll need to grab a few dependencies:
 * [VirtualBox](https://www.virtualbox.org/) 
 * [Vagrant](https://www.vagrantup.com/downloads.html) 

Navigate to the project directory in your console and run the following:

    $ vagrant up
    $ vagrant ssh 
    $ sudo apt-get update
    $ sudo apt-get install nodejs-legacy
    $ sudo apt-get install npm
    $ cd /vagrant/api
    $ nmp install
    $ npm install -g nodemon
    $ nodemon

Bam! You should now be up and running. Here's the 2 main entry points:
 * [Web Application ('/')](http://localhost:32401)
 * [API ('/api')](http://localhost:32401/api/)



### Known Issues
 * Requesting '/api' is currently throwing an error. It should redirect to '/api/' - See  [Vaprobash Helper: ngxcb](https://github.com/joelray/Vaprobash/blob/master/helpers/ngxcb.sh#L140)