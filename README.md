## HHLL-FRONTEND

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Specify node version with [`nvm`](https://github.com/nvm-sh/nvm)
This command will read .nvmrc file and set node version for current project

```bash
nvm use
```

Run the development server:

```bash
yarn dev
```

Run lint

```bash
yarn lint
```

Run Storybook to view components document

```
yarn storybook
```

## Packages used in project

- [`ant design`](https://ant.design/components/overview) UI framework
- [`axios`](https://github.com/axios/axios) - api request
- [`tailwind`](https://tailwindcss.com/docs/installation) - css class ready for use
- [`zustand`](https://github.com/pmndrs/zustand) - state store
- [`next-translate`](https://github.com/aralroca/next-translate) - i18n
- [`day.js`](https://day.js.org/docs/en/installation/node-js) - manipulate datetime
- [`lodash`](https://lodash.com/docs/4.17.15) - additional function
- [`Storybook`](https://storybook.js.org/docs/get-started/install) - UI components documentation

## Project Structure

```
.
├── .storybook
├── locales
├── public
├── src
│  ├── api
│  ├── app                    # route components
│  ├── components             # common components
│  ├── configs                # config for app, env variable should be decleare here
│  ├── features               #        
│  ├── hooks                  #      
│  ├── libs                   # axios, zustand
│  ├── providers              #          
│  ├── public                 #      
│  ├── stores                 #      
│  ├── stories                #        
│  ├── styles                 #      
│  └── types                  #      
├── .editorconfig
├── .env.staging
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── .yarnrc.yml
├── i18n.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```
