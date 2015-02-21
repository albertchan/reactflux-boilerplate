# reactflux-boilerplate

Quickstart project template for building a web app using the React/Flux architecture.

## Running

You must have npm and gulp installed on your computer. From the root project directory run these commands from the command line:

    npm install -g gulp
    npm install

This will install all dependencies.

To build the project, first run this command:

    gulp build    # or, 'gulp build --release'

This will perform an initial build and start a watcher process that will update build.js with any changes you wish to make. This watcher is based on Browserify and Watchify, and it transforms React's JSX syntax into standard JavaScript with Reactify.

To run the app, spin up an HTTP server and visit http://localhost/.../reactflux-boilerplate/. Or simply open the index.html file in a browser.
