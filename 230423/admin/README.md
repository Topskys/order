# admin

## Build Setup

```bash

# enter the project directory
cd admin
# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:3423

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
