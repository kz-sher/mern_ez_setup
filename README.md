# Mern Ez Setup

Mern Ez Setup is just a simple MERN boilerplate to help you kickstart your mini project. As we know that the authentication feature in almost every system is indispensable, having this codebase would definitely save you a lot time for building the initial project structure.

## Features

Functional parts:
- Login (cross tabs)
- Logout (cross tabs)
- Register
- Forgot password
- Reset password
- Form data validation
- Silent refresh
- Login popup upon session expiration
- Redirect for protected route and guest route (if user is already logged in)

Presentational parts:
- Form field error display
- Status message display
- Pushable sidebar
- Responsive navbar
- Scroll effect for the appearance of field error and status message
- Shaking effect for the appearance of status message
- Password field visibility

(**IMPORTANT**: These features are not production-ready yet.)

## Installation

1. Just clone this repository by issuing the following command in your terminal

```bash
git clone <repo-link>
```

2. Navigate to the root level of project folder and enter the following command to install all npm packages required:

```bash
npm run install
```

3. To run the project, you would need to have your environment variables set up in `.env`. For more info, go to [Environment Variables](#environment-variables). After it is done, you can execute the command below:

```bash
npm run dev
```

## Environment Variables

1. In your root project folder, create a file called `.env` by typing:

```bash
touch .env
```

2. Key in the value for each of the following values based on type specified. For example: lifetime - 1h, 15m or 365d.

```text
ACCESS_TOKEN_SECRET = <ANY>
REFRESH_TOKEN_SECRET = <ANY>
RANDOM_TOKEN_SECRET = <ANY>
ACCESS_TOKEN_LIFETIME = <NUMBER + SINGLE LETTER TIME UNIT>
REFRESH_TOKEN_LIFETIME = <NUMBER + SINGLE LETTER TIME UNIT>
PASSWORD_RESET_TOKEN_LIFETIME = <NUMBER + SINGLE LETTER TIME UNIT>
EMAIL_CONFIRMATION_TOKEN_LIFETIME = <NUMBER + SINGLE LETTER TIME UNIT>
TOKEN_ID_DIGITS = <NUM>
MAILTRAP_USERNAME = <CHECK ON MAILTRAP>
MAILTRAP_PASSWORD = <CHECK ON MAILTRAP>
MONGODB_URI = <URL, e.g. mongodb://127.0.0.1:27017/database_name>
PORT = <NUMBER, e.g 3000, 5000, etc >
```

## Got question?
> kzsherdev@gmail.com
