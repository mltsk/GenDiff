install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
test-coverage:
	npm test -- --coverage --coverageProvider=v8
run:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
test:
	npm test
rec:
	asciinema rec
.PHONY: test