# Cool Darts, version Web

### Architecture

Un serveur `nodejs` reposant sur `express`.  
Le `/` du serveur sert une app `React` créée avec [vitejs](https://vitejs.dev/) dont les sources sont dans [client/](./client).  
Le code source est à la racine du repo car c'est la seule façon que je connaisse pour qu'Heroku puisse déployer.

### Développement

`Prettier` s'exécute en pre-commit hook.  
La [CLI Heroku](https://devcenter.heroku.com/categories/command-line) est nécessaire pour travailler efficacement.

#### Lancer le serveur

> `yarn dev`
>
> Utilise `nodemon` pour avoir du live reload.

> `yarn heroku-local`
>
> Build le client puis lance le serveur comme sur Heroku.

> `cd client/ && yarn build`
>
> Build le client dans `client/dist/` ce qui met à

#### Lancer le client

> `cd client/ && yarn dev`

### Déploiement

C'est [Heroku](https://dashboard.heroku.com/apps/cool-darts/) qui déploie.  
Les `postinstall` et `heroku-postbuild` dans le [package.json](./package.json) sont pour lui : installer les dépendances npm du `client/` puis le builder.
