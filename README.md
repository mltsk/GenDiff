### Hexlet tests and linter status:
[![Actions Status](https://github.com/mltsk/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mltsk/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/mltsk/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/7c9e17dd5b67001497e1/maintainability" /></a>
<a href="https://codeclimate.com/github/mltsk/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/7c9e17dd5b67001497e1/test_coverage" /></a>
![example workflow](https://github.com/mltsk/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)<br>

## Вычислитель отличий

__Вычислитель отличий__ – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

__Возможности утилиты:__

- поддержка разных входных форматов: yaml, json;
- генерация отчета в различных форматах: plain text, stylish и json;

## Установка

Для установки выполните следующие команды:
```
npm install gendiff -g
```
## Пример использования:
```JS
# справка
gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
  
# формат plain
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```
## Steps:
Step 1:
[![asciicast](https://asciinema.org/a/iJte3d6NOF9WnyFkirQBrdkid.svg)](https://asciinema.org/a/iJte3d6NOF9WnyFkirQBrdkid)
Step 2:
[![asciicast](https://asciinema.org/a/eBGTkfQS2L1iyIAyWAy59bZ6x.svg)](https://asciinema.org/a/eBGTkfQS2L1iyIAyWAy59bZ6x)
Step 3:
[![asciicast](https://asciinema.org/a/LLLJvadgjIzAylHeP3UHtLwon.svg)](https://asciinema.org/a/LLLJvadgjIzAylHeP3UHtLwon)
Step 4:
[![asciicast](https://asciinema.org/a/5RpwlkBIEQD8zePrZb7PITYFL.svg)](https://asciinema.org/a/5RpwlkBIEQD8zePrZb7PITYFL)
Step 5:
[![asciicast](https://asciinema.org/a/YsdHdpCwgkD2jDqhn1lKZOoex.svg)](https://asciinema.org/a/YsdHdpCwgkD2jDqhn1lKZOoex)
Step 6:
[![asciicast](https://asciinema.org/a/7hGsaXhJeiQhEUhAATdq90Ww6.svg)](https://asciinema.org/a/7hGsaXhJeiQhEUhAATdq90Ww6)
Step 7:
[![asciicast](https://asciinema.org/a/y5Oer9lkgOKVhkoTAnRDRyURG.svg)](https://asciinema.org/a/y5Oer9lkgOKVhkoTAnRDRyURG)
Step 8:
[![asciicast](https://asciinema.org/a/1NYV2wklOCroQ7lGd8D5v4WL8.svg)](https://asciinema.org/a/1NYV2wklOCroQ7lGd8D5v4WL8)
