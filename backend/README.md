# Getting Started with Create React App

## `Setting up the Database`
1. Download and install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/). You can also download it from snap.
2. Once installed, open it and navigate to MySQL Connections. Create a new connection named `GradingSystem`. Leave everything as default. Then you will be prompted to put in your root credentials.
3. To learn the temporary password placed on root, run on terminal the following command
### sudo grep 'temporary password' /var/log/mysqld.log^C
Copy and paste the password on the prompt, where you'll be requested to get a new password. For the purposes of this project, the password is `Root123!`
4. After creating the Connection, navigate to home and then to models, where you can upload the mwb file under `./database`
5. Open the model and from the top bar select Database>Forward Engineer. Make sure the selected connection is the one you made earlier. Then select Next every time until you finish.
6. Open the connection. Create a new sql file and paste the inserts from `db.sql` found under `./database`.
7. Before running the backend, create a new sql file and run the following commands.
### ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Root123!';
### flush privileges;
This ensures you won't run into an `ER_NOT_SUPPORTED_AUTH_MODE` error after running the backend.



## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

