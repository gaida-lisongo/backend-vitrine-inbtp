# README.md Content

# express-memcached-k6

This project is a Node.js/Express application that serves as the backend for the "About" page of a microservices architecture. It integrates a Memcached server for caching and uses k6 for performance testing, all deployed within a Docker container.

## Project Structure

- **src/**: Contains the main application code.
  - **app.js**: Entry point of the application.
  - **controllers/**: Contains controllers for handling requests.
    - **aboutController.js**: Controller for the "About" page.
  - **routes/**: Defines the routes for the application.
    - **aboutRoutes.js**: Routes for the "About" page.
  - **services/**: Contains service classes for business logic.
    - **memcachedService.js**: Service for interacting with Memcached.
  - **config/**: Configuration files.
    - **memcached.js**: Configuration for Memcached connection.

- **tests/**: Contains performance tests.
  - **performance/**: Performance testing scripts.
    - **k6-script.js**: k6 script for testing the "About" page.

- **docker/**: Contains Docker configuration files.
  - **Dockerfile**: Instructions for building the Docker image.
  - **docker-compose.yml**: Defines services for Docker.

- **package.json**: npm configuration file.

## Setup Instructions

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Use Docker to build and run the application.

## Performance Testing

To run performance tests, use the k6 script located in `tests/performance/k6-script.js`.

## Récupérer une branche distante

Pour récupérer une branche distante, suivez les étapes ci-dessous :

1. Récupérez les branches distantes :
    ```sh
    git fetch
    ```

2. Basculez sur la branche distante :
    ```sh
    git checkout <nom-de-la-branche>
    ```

Remplacez `<nom-de-la-branche>` par le nom de la branche que vous souhaitez récupérer.

## Récupérer les dernières modifications de la branche main

Pour récupérer les dernières modifications de la branche `main` depuis le dépôt distant `origin`, suivez les étapes ci-dessous :

1. Assurez-vous d'être sur la branche `main` :
    ```sh
    git checkout main
    ```

2. Récupérez et fusionnez les modifications :
    ```sh
    git pull origin main
    ```

## Configurer la branche main pour suivre origin/main

Pour configurer la branche `main` pour suivre la branche distante `origin/main`, suivez les étapes ci-dessous :

1. Assurez-vous d'être sur la branche `main` :
    ```sh
    git checkout main
    ```

2. Configurez la branche `main` pour suivre `origin/main` :
    ```sh
    git branch --set-upstream-to=origin/main main
    ```

## License

This project is licensed under the MIT License.