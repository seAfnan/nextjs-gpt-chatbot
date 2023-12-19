# Nextjs GPT Chatbot
Embeddable chatbot component for Next.js using ChatGPT API

## Overview

This Next.js ChatGPT Chatbot built with Next.js, TypeScript, App Router, Radix UI, and Tailwind CSS. It allows users to easily integrate a chatbot into their Next.js applications. The chatbot sends user input to the ChatGPT API to receive responses and displays them in a user-friendly chatbox. The component supports light and dark modes, and users can easily close the chatbox.

## Technologies Used

- **Next.js:** A React framework for building server-rendered applications.
- **TypeScript:** Adds static typing to JavaScript, enhancing code quality and maintainability.
- **App Router:** Routing library for handling navigation in your application.
- **Radix UI:** Component library for building accessible and customizable interfaces.
- **Tailwind CSS:** Utility-first CSS framework for building modern designs.

## Features

- Chat button at the bottom right corner
- Chatbox with light/dark mode
- Close button

## Getting Started

### Prerequisites

- Node.js
- ChatGPT API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seAfnan/nextjs-gpt-chatbot.git
   ```

2. Install dependencies:
   ```bash
   cd nextjs-gpt-chatbot
   npm install
   ```

3. Set up environment variables:
   - Include your GPT API Key in `.env` file.

5. Start the application:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Configuration

1. **Replace ChatGPT API Endpoint:**

   Open `ChatBot.tsx` and replace `url` with your ChatGPT API endpoint.
   

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## Acknowledgements

Special thanks to the open-source community and the creators of the technologies used in this project.

Feel free to explore and contribute to make this Chatbot even better! 🚀

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
