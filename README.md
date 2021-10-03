# Movielib

Movielib is an application to manage your favorite movies.

## Development

### Description
The application is developed with the following elements:
- MongoDB,
- Node.js with Strapi,
- Vue.js with Nuxt.js and vuetify
    

### Prerequisites
- Docker
- Docker compose

### Setup
This setup has be made for development mode only.

Start the whole application:
```bash
make start
```
Stop the whole application:
```bash
make stop
```
Delete the whole application (included data):
```bash
make delete
```

The environment variables are defined in the .env file at the root of the project.