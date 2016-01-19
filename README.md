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
    $ sudo cp /vagrant/docs/server/nginx-config/vagrant.conf /etc/nginx/sites-available/vagrant
    $ cd /vagrant/api
    $ nmp install
    $ npm install -g nodemon
    $ nodemon

Bam! You should now be up and running. Here's the 2 main entry points:
 * [Web Application ('/')](http://localhost:32401)
 * [API ('/api')](http://localhost:32401/api/)



### TODOs
 * Add current time ticker
 * Add scrubber/track position bar


### Known Issues
 * Calling AudioController.pause() loses track position
 * Seeking currently reloads track source
