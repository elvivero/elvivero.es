#!/bin/bash
bundle install
bundle exec jekyll serve --incremental --watch
open -a firefox -g http://127.0.0.1:4000
