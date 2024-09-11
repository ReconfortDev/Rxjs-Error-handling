# Angular Post Handling App

## Overview

This Angular application demonstrates error handling, retry logic, and asynchronous data fetching with RxJS. It simulates fetching posts from a remote API, handling different error scenarios, and displaying posts or error messages based on the outcome.

## Features

- **Simulated Data Fetching**: Fetch posts from a simulated endpoint.
- **Error Handling**: Handle and display errors from the simulated API.
- **Retry Mechanism**: Automatically retry failed requests.
- **Loading State**: Display a loading indicator while data is being fetched.
- **Post Display**: Show fetched posts in a user-friendly format.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli) (Install via npm with `npm install -g @angular/cli`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ReconfortDev/Rxjs-Error-handling.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Rxjs-Error-handling
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

### Running the Application

To start the development server and view the application in your browser:

```bash
npm start 
```

Open your browser and go to `http://localhost:4200` to see the app in action.

### Usage

1. **Get Posts**: Click the "Get Post" button to fetch posts from the simulated API.

2. **View Loading State**: A loading indicator will be shown while the request is being processed.

3. **Retry Logic**: If the request fails, the application will retry fetching posts up to three times.

4. **Error Messages**: If errors occur, appropriate error messages will be displayed.

### API Simulation

The application simulates data fetching with a random outcome. Possible responses include:
- A simulated network error.
- An empty array.
- Actual data from the JSONPlaceholder API.


## Project Structure

- **src/app**: Contains the main application code.
  - **components**: Includes models and other shared components.
  - **service**: Contains the `PostServiceService` used for fetching posts.
  - **app.component.ts**: The main component managing the posts and error handling.
  - **app.component.html**: The template for displaying posts and error messages.
  - **app.component.css**: The styles for the main component.

## Acknowledgments

- [Angular](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
