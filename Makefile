publish:
	npm publish --dry-run
gendiff:
	node gendiff.js
lint:
	npx eslint .
lintfix:
	npx eslint . --fix