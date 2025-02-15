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

## License

This project is licensed under the MIT License.