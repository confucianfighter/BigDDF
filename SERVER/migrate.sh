#!/bin/bash
python3 /Users/daylannance/Documents/DEV/DDF/SERVER/Database/manage.py  makemigrations api
python3 /Users/daylannance/Documents/DEV/DDF/SERVER/Database/manage.py  migrate --fake-initial

#"/Users/daylannance/Documents/DEV/DDF/SERVER"