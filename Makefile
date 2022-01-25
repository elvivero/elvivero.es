build:
	jekyll build

push:
	rsync -aPv ./_site/ lambda:/var/www/elvivero.es/ --delete
