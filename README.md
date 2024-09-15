![Horizontal Feedbacks.me Logo](/public/logo-horizontal.png)

feedbacks.me is a user-friendly platform that enables users to send anonymous feedback on anything, anytime. Whether it's sharing thoughts on a product, service, experience, or even personal relationships, our app provides a safe and confidential space for honest communication.

## Key Features

1. **Anonymous Feedback**
   - Send feedback without revealing your identity
   - Recipients can't trace the feedback back to the sender

2. **Universal Application**
   - Provide feedback on any topic: products, services, experiences, relationships, etc.
   - No limitations on what can be addressed

3. **Easy-to-Use Interface**
   - Simple, intuitive design for quick feedback submission
   - Minimal setup required to start using the app

## How It Works

1. Sign up to start sending or receiving feedback
2. Choose a recipient and compose your anonymous message
3. Send your feedback securely
4. Recipients can view and reflect on the feedback received

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB implemented with Zod
- **Authentication**: NextAuth.js
- **Hosting**: Vercel

## Getting Started

To get started with feedbacks.me locally, follow these steps:

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/feedbacks.me.git
   cd feedbacks.me
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```
   npm run dev
   ```

5. **Open the application**
   Navigate to `http://localhost:3000` in your web browser.


## Privacy and Security

We take user privacy seriously. All feedback is handled with utmost confidentiality. For more details, please see our [Privacy Policy](https://feedbacks.me/privacy).

## Support

For support, please email support@feedbacks.me or visit our [Help Center](https://help.feedbacks.me).

## Contributing

We welcome contributions! If you'd like to contribute to feedbacks.me, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with clear, descriptive messages
4. Push your changes to your fork
5. Submit a pull request to the main repository

Please ensure your code adheres to our coding standards and includes appropriate tests. For major changes, please open an issue first to discuss what you would like to change.

Don't forget to update the documentation as necessary. Thank you for helping improve feedbacks.me!

## License

feedbacks.me is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.