#!/bin/bash
# This script contains all local commands that I enter to setup our django project.
# Here's a great article that explains the stuff: 
# https://www.smashingmagazine.com/2020/08/demystifying-djangos-magic/#startproject-startapp-commands
# This stuff does not go into our Dockerfile because it generates code that we then alter.
# If we had django generate the code in docker, then our own subsequent modifications would not be reflected.
# The each command will give a CommandEror if the thing already exists, but then it installs anything that doesn't exist.
# One advantage of putting them in a script is we know that the script ran, and the code worked.

#This command Produces a folder with premade code, called DDF_SITE,
#DDF_SITE code goes into the path DDF_SITE/DDF_SITE, which looks reduntant, but hey.
django-admin startproject DDF_SITE
#And this code produces an app called api, which goes into the api folder at the root. It will be then entry point
#for all requests come from the front end.
django-admin startapp api
#After I ran that, I added 'rest_framework' and 'api.apps.ApiConfig'
# to the DDF_SITE/DDF_SITE/settings.py INSTALLED_APPS[] list.
# I then added this to api/views.py:
#from django.http import HttpResponse

# def main(requests):

# This is the function that is run anytime someone goes to DDF.com Whatever comes after DDF.com is called a route.
# It then redirects those routes to whatever file and function you want to use to handle it.
# for instance if it was DDF.com/DATABASE/PriceHistory/?first=10&orderby=volumeUSD, the route would be /Database/Queries
# The request object would be sent to some pricehistory retrieval function and it's keyword arguments would be first=10
# and orderby=volumeUSD. We would then send a JSON object as the response. A person would probably never go to that route
# because a react front end is supposed to stay on one url if possible.
# but the javascript code would send its own https requests to these routes to retrieve data.

