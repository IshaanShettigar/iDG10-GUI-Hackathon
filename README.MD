# iDG10 Subsea Diagramming Tool

Welcome to the iDG10 Subsea Diagramming Tool! This tool allows you to create and manipulate subsea diagrams easily. Please note that the iDG10 Subsea Diagramming Tool is a proprietary software, and its usage is subject to a valid license.

## Prerequisites

Before installing and using the iDG10 Subsea Diagramming Tool, please ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org) (version 12 or higher) installed on your machine. You can download Node.js from the official website and follow the installation instructions specific to your operating system.
- (Optional) [Docker](https://www.docker.com/) installed and running. Docker is required only for the Docker deployment method.

## Installation

To use the iDG10 Subsea Diagramming Tool, follow these steps:

1. Clone the repository using Git:

   ```shell
   git clone https://github.com/IshaanShettigar/iDG10-GUI-Hackathon.git
   ```

2. Change to the "vite" branch:

   ```shell
   git checkout vite
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

## Usage

Choose one of the following methods to use the iDG10 Subsea Diagramming Tool:

### Web Application

1. Build the project:

   ```shell
   npm run build
   ```

2. Preview the application on your local machine:

   ```shell
   npm run preview
   ```

   The application will be exposed on port 8080. Open your web browser and navigate to the following address: `http://localhost:8080`.

3. Use the various tools and options provided in the interface to create and manipulate subsea diagrams according to your requirements.

### Docker Deployment

1. If you choose to use the Docker deployment method, make sure you have Docker installed and running on your machine. You can follow the official [Docker installation instructions](https://docs.docker.com/get-docker/) to install Docker.

2. Customize the `docker-compose.yml` file according to your deployment setup.

3. Build and run the Docker containers:

   ```shell
   docker-compose up -d
   ```

   Ensure that the Docker engine is running in the background.

4. The iDG10 Subsea Diagramming Tool will be accessible through your specified configuration.

5. Use the various tools and options provided in the interface to create and manipulate subsea diagrams according to your requirements.

### Desktop Application

1. Build the project:

   ```shell
   npm run build
   ```

2. Create the desktop application package using Electron Forge:

   ```shell
   npm run make
   ```

   The package for your system will be generated in the `out` folder, specifically in the `make` subfolder.

3. Locate the generated package for your system and execute the application according to your operating system's conventions.

4. Use the various tools and options provided in the interface to create and manipulate subsea diagrams according to your requirements.

## Contributing

If you would like to contribute to the iDG10 Subsea Diagramming Tool, please contact the authorized distributor or the respective owner for information on contributing guidelines.

## License

The iDG10 Subsea Diagramming Tool is a proprietary software. Proper licensing is required to use the tool. Please contact the authorized distributor or the respective owner for licensing details and terms of use.

## Contact

If you have any questions or need assistance regarding the iDG10 Subsea Diagramming Tool, please contact the authorized distributor or the respective owner.

Thank you for your interest in the iDG10 Subsea Diagramming Tool!
