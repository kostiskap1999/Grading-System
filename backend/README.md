# Grading System Backend

## Setting up the Database
1. Download and install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/). You can also download it from snap.
2. Once installed, open it and navigate to MySQL Connections. Create a new connection named `GradingSystem`. Leave everything as default. Then you will be prompted to put in your root credentials. The credentials may be empty, or it may request a default password. Follow step 3 in case it asks for a default password on linux.
3. To learn the temporary password, run on a bash terminal the following command: `sudo grep 'temporary password' /var/log/mysqld.log`
4. Regardless of if you had a temporary password or not, during the first login you will be requested to place a new password. For the purposes of this project, the password is `Root123!`
5. After creating the Connection, navigate to home and then to models, where you can upload the mwb file under the project's `./database` folder.
6. Open the model and from the top bar select `Database > Forward Engineer`. Make sure the selected connection is the one you made earlier. Then hit Next every time until you finish.
7. Open the Connection. Create a new query and paste the inserts from `db.sql` found under the project's `./database` folder.
8. Finally, create a new query and run the following commands.
   * ##### `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Root123!';`
   * ##### `flush privileges;`
This ensures you won't run into an `ER_NOT_SUPPORTED_AUTH_MODE` error after running the backend.


## Setting up the backend

### `npm install`

To install all the dependencies. A few dependencies may or may not get installed automatically, in which case the backend will crash upon launch. If this happens, see the console logs and install them manually for now (this will be fixed in the final version).


## Available Scripts

### `npm run start-win`

Runs the app in development mode for windows. Uses [http://localhost:8000](http://localhost:8000).

### `npm run start-lin`

Runs the app in development mode for linux. Uses [http://localhost:8000](http://localhost:8000).
