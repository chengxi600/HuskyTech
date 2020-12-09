# HuskyTech

Our project uses a NodeJS backend using the express framework. The server's main logic is in the /app.js file with the routing logic within the /routes folder. Additionally there is a script/boilerplate code to start the server located in the /bin/www where run configurations like which port to listen on. To run this script, you must make sure you have node installed, this allowed javascript to be run outside the browser. Please download the latest version here: https://nodejs.org/en/ For MariaDB (included with other programs like FileZilla and phpMyAdmin) please download and install XAMPP from https://www.apachefriends.org/index.html.

Steps to install and run the server:
1. Download Node.JS
2. Download and install XAMPP for the MariaDB MySQL RDBMS.
3. Clone/Download this repository
4. Use phpmyadmin or the console UI mysql program (located in the XAMPP/mysql/bin) to create the database.
    (for phpmyadmin, copy past the ddl and dml files, while for mysql, you must login then use the SOURCE command)
5. After successful database creation and population, in XAMPP start the mysql server.
6. Once inside the HuskyTech/project folder, run the command in the terminal: npm install
    (this installs all necessary modules to run the server)
7. In the same location, run the terminal command: npm start
8. Open your favorite browser and go to the url of the server (default: http://localhost:3000/)

### Breaking down /app.js and /bin/www
