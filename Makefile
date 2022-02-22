build:
    JEKYLL_ENV=production jekyll build

push:
	rsync -aPv ./_site/ lambda:/var/www/elvivero.es/ --delete
