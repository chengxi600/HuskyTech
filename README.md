# HuskyTech
![HuskyTech intro banner](./public/images/huskytech-banner.png)
Our project uses a NodeJS backend using the express framework. The server's main logic is in the /app.js file with the routing logic within the /routes folder. Additionally there is a script/boilerplate code to start the server located in the /bin/www where run configurations like which port to listen on. To run this script, you must make sure you have node installed, this allowed javascript to be run outside the browser. Please download the latest version here: https://nodejs.org/en/ For MariaDB (included with other programs like FileZilla and phpMyAdmin) please download and install XAMPP from https://www.apachefriends.org/index.html.

For installation and demo videos refer to these youtube links:
Installation: https://youtu.be/1YSjqVkLiZ4
Demo: https://youtu.be/-J9lJU5HJEk

Steps to install and run the server:
1. Download Node.JS
2. Download and install XAMPP for the MariaDB MySQL RDBMS.
3. Clone/Download this repository/Import into your favorite IDE
4. Use phpmyadmin or the console UI mysql program (located in the XAMPP/mysql/bin) to create the database.
    - (for phpmyadmin, copy paste the ddl and dml files, while for mysql, you must login then use the SOURCE command)
5. After successful database creation and population, in XAMPP start the mysql server.
6. Once inside the HuskyTech/project folder, run the command in the terminal: npm install
    - (this installs all necessary modules to run the server)
7. In the same location, run the terminal command: npm start
8. Open your favorite browser and go to the url of the server (default: http://localhost:3000/)

## Breaking down /app.js, /bin/www, and routes

### /app.js
/app.js stores the central logic for the express framework web server. An express object (const app) is created from the npm module import 'express'. The express object then uses middleware functions like app.use(express.json()) parse incoming http requests' bodies. Middleware functions are used to customize your server by providing functionality on incoming http requests and outgoing responses. We some more middleware functions follow in the form of routes. (Line 28: app.use("/login", loginRouter) This line ensures that all requests to http://localhost:3000/login are handled in the Router object returned by the file in /routes/login.js). Finally app.js has more middleware functions to render an error page when an error occurs.

### /bin/www
/bin/www is a Javascript script that builds the http server utilizing the http server module. This script is where the port is set, an event listener for an errors is set, and an event listener for "listening" events. The npm start command just runs the script, it is actually just a simplified naming of the command "node ./bin/www". The node command is the command to run when running javascript outside of the browser. So npm start runs the code to start the server.

### /routes
This folder holds all of the Express.Router JS files that hold all logic for a specific route. For the "/" (http://localhost:3000/) address. The index router is instructed to redirect to the login page. So all requests for a homepage should be redirected to http://localhost:3000/login. The login, employee, and users routes all serve their respective html files when accessed by a GET Request. However, employee and users both notably serve an additional html file as a secondary page (reports and review pages for employee and users respectively). The api route is the most notable and hold most of the logic for the back-end. This router contains the connection object used to connect to the MariaDB server. This router has an address for every task query, report query, and miscellaneous query the front-end could desire and get/post request handler for each. The request handler would take request's information if any, and respond with JSON response with a status and information from the query.
