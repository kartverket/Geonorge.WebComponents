@echo off

call npm run build
call ./node_modules/.bin/clean-package
call ./node_modules/.bin/copyfiles -f ./lib/**/* ./package.json _publish
call ./node_modules/.bin/clean-package restore
call npm publish ./_publish
call ./node_modules/.bin/shx rm -rf _publish