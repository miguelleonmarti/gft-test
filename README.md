# Podcaster

**Podcaster** brings the world of top podcasts from iTunes to your fingertips. Explore, listen, and enjoy a curated selection of the top 100 podcasts. This application is designed to provide a seamless experience for podcast enthusiasts, offering features such as:

- **Podcast Discovery:** Easily browse and discover the most popular podcasts currently trending on iTunes.

- **Detailed Podcast Information:** Dive into the details of your favorite podcasts, exploring information about each show and its episodes.

- **Episode Selection:** Select and play specific episodes, allowing you to enjoy your preferred content with just a click.

Podcaster aims to enhance your podcast listening experience, making it convenient and enjoyable to explore the diverse world of audio content.

## Technologies Used

- React
- TypeScript
- Webpack
- Cypress

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed

## Getting Started

To get a local copy up and running, follow these simple steps.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/miguelleonmarti/gft-test.git
   ```
2. **Navigate to the project directory:**

   ```bash
   cd gft-test
   ```
3. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application Locally

Follow these steps to run the application on your local machine.

1. **Start the development server:**

   ```bash
   npm start
   ```
   The application should be accessible at http://localhost:3000.

## Building for Production

To build the application for production, run:

   ```bash 
   npm run build
   ```
   This command will generate optimized and minified assets in the **'dist'** directory.

## Running Tests with Cypress

To run end-to-end tests using Cypress, follow these steps:

1. **Open a new terminal tab/window:**

2. **Run Cypress in interactive mode:**

   ```bash
   npm run cypress:open
   ```
   The Cypress Test Runner will open, allowing you to run and interact with your tests.

3. **Select and run your tests:**
- Click on a test file in the Cypress Test Runner to run the tests interactively.
Alternatively, run tests in headless mode using:
   ```bash
   npm run cypress:run
   ```