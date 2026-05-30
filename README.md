# MERN Calendar backend for DevTalles React course

This repository is created to take note for the MERN calendar backend created to use it with the React calendar frontend. The frontend calendar code is found [here](https://github.com/pipe753951/08-react-mern-calendar-frontend).

# Steps to configure project

1. Install NPM modules with `npm install`.
2. Configure your MongoDB database on environment variables.
3. Configure rest of your environment variables.
4. In addition, if you want to develop in this project, use `npm run dev`.

# How to start your project?

The project isn't built by default, you need to run development command (`npm run dev`) to run without building, or run `npm run build` to compile your project to JavaScript.

After building, run `npm run start`.

# Deployment note

Note that if you want to deploy this project, you must have the following folder structure:

1. `dist`, where the built backend files are served.
2. `public`, where the React frontend build are served.
3. `.env`
4. NPM package information and NPM modules.

Also, note that if you don't use `public` directory in the same parent folder as `dist`, project frontend will not work.
