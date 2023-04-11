# Angular built-in i18n

## Table of contents
- [Benefits](#benefits)
- [How does it work?](#how-does-it-work)
- [Deploy multiple locales](#deploy-multiple-locales)
- [Demo](#demo)
  - [Mark text for translation](#mark-text-for-translation)
  - [Extract translatable text](#extract-translatable-text)
  - [Add translations](https://angular.io/guide/i18n-common-translation-files)
  - [Update build configuration](#update-build-configuration)


## Benefits
- [native support](https://angular.io/guide/i18n-overview) by the Angular team
- ability to validate translations during CI/CD
- [ICU expressions](https://angular.io/guide/i18n-common-prepare#icu-expressions) support
- integration with [built-in pipes](https://angular.io/api/common#pipes) ([date](https://angular.io/api/common/DatePipe), [currency](https://angular.io/api/common/CurrencyPipe), etc.)
- smaller bundle size - translations are part of a code
- flexibility
  - separate bundle for each locale
  - single bundle with run-time translation
  - dynamic locale change (with some conventions)
- translator-friendly
  - supports [meta-data](https://angular.io/guide/i18n-common-prepare#i18n-metadata-for-translation) for translation units
  - supports different [file formats](https://angular.io/guide/i18n-common-translation-files#change-the-source-language-file-format) ([.arb](https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification), [.json](https://www.json.org/json-en.html), [.xliff](http://docs.oasis-open.org/xliff/xliff-core/xliff-core.html) 1.2, [.xliff](http://docs.oasis-open.org/xliff/xliff-core/v2.0/cos01/xliff-core-v2.0-cos01.html) 2.0, [.xmb](https://cldr.unicode.org/development/development-process/design-proposals/xmb))
  - translation can be split into several files with different formats


## How does it work?
- mark text for translation in a [template](https://angular.io/guide/i18n-common-prepare#mark-text-in-component-template) via `i18n` or `i18n-*` attributes
- mark text for translation in a [component](https://angular.io/guide/i18n-common-prepare#mark-text-in-component-code) via `$localize` tagged template
- marked text will be replaced with translations during the build
  - or during the bootstrap in case of runtime translation
- [LOCALE_ID](https://angular.io/api/core/LOCALE_ID) value and locale data will be applied automatically during the build
  - should be done manually for runtime translation


## Deploy multiple locales
- after the build, each locale will have a separate instance of the app under the appropriate directory
- deploy them all to single storage (e.g. Amazon S3)
- redirect the user to the proper route based on the `Accept-Language` header
- routing strategies:
  - subdomain ([**en**.wikipedia.org](https://en.wikipedia.org/), [**uk**.wikipedia.org](https://uk.wikipedia.org/))
  - national domain ([angular.**cn**](https://angular.cn/), [angular.**jp**](https://angular.jp/))
  - path prefix ([developer.mozilla.org/**en-US**/](https://developer.mozilla.org/en-US/), [developer.mozilla.org/**es**/](https://developer.mozilla.org/es/))


## Demo
## Mark text for translation:
- in component [template](src/app/pages/home/home.component.html)
- in component [code](src/app/pages/home/home.component.ts)

[More details](https://angular.io/guide/i18n-common-prepare)


## Extract translatable text

Add `extract-i18n` configuration to the `angular.json`.

E.g.
```json
"projects": {
  "app": {
    "architect": {
      "extract-i18n": {
        "builder": "@angular-devkit/build-angular:extract-i18n",
        "options": {
          "browserTarget": "app:build",
          "outFile": "locales/en.xlf",
          "format": "xlf2"
        }
      }
    }
  }
}
```

Add **extract-i18n** script to the `package.json`.

E.g.
```json
{
  "scripts": {
    "extract-i18n": "ng extract-i18n"
  }
}
```

Execute the command `yarn extract-i18n`.

Then you will have an [XLIFF](http://docs.oasis-open.org/xliff/xliff-core/v2.0/cos01/xliff-core-v2.0-cos01.html) file with the extracted text (e.g. [en.xlf](src/messages/xlf2/en.xlf)).

[More details](https://angular.io/guide/i18n-common-translation-files)


## Update build configuration
- add `i18n` details (source locale, supported locales and their translations)
- update `build` options (add localization, report on missing/duplicate translations)
- set-up locale-specific builders (for development)

E.g.
```json
{
  "projects": {
    "app": {
      "i18n": {
        "sourceLocale": "en",
        "locales": {
          "he": {
            "translation": "locales/he.xlf",
            "baseHref": "/he/"
          },
          "uk": {
            "translation": "locales/uk.xlf",
            "baseHref": "/uk/"
          }
        }
      },
      "architect": {
        "build": {
          "options": {
            "localize": true,
            "i18nMissingTranslation": "error",
            "i18nDuplicateTranslation": "error"
          },
          "configurations": {
            "development": {
              "localize": ["en"]
            },
            "he": {
              "localize": ["he"]
            },
            "uk": {
              "localize": ["uk"]
            }
          }
        }
      }
    }
  }
}
```

[More details](https://angular.io/guide/i18n-common-merge#define-locales-in-the-build-configuration)

Add locale-specific serve scripts to the `package.json` (for development).

E.g.
```json
{
  "scripts": {
    "start:he": "ng serve -c=he",
    "start:uk": "ng serve -c=uk"
  }
}
```
