# Parallel app chat backend

## Quick Start
#### 1. Clone this repository
#### 2. Enter the directory
#### 3. Install packages
#### 4. Setup database
- Copy any files with `.example` namespace
- Edit those files with your own data
- Remove `.example` in their names.
```
// ormconfig.json
{
  "type": "mongodb",
  "host": "localhost",      <---- Put your own database information here
  "port": 27017,             <----
  "database": "parallel",       <----
  "synchronize": true,
  "logging": false,
  "entities": ["dist/entity/**/*.js"],
  "migrations": ["dist/migration/**/*.js"],
  "subscribers": ["dist/subscriber/**/*.js"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}

```
## Usage
### Development

```
$ npm run watch
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
