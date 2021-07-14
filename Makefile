install:
	npm ci
publish:
	npm publish --dry-run
gendiff:
	node gendiff.js
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
test-coverage:
	npm test -- --coverage --coverageProvider=v8
run:
	gendiff file1.json file2.json
jest:
	npx -n '--experimental-vm-modules' jest
rec:
	asciinema rec
.PHONY: test