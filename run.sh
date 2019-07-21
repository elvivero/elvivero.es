#!/bin/bash
bundle install
bundle exec jekyll serve --incremental --watch --host 0.0.0.0 -P 4000
