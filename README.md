# Developer Portal

## Description

An app used to keep track of different items such as tutorials, blogs, podcasts, and resources. The user has the ability to add and delete items to each section. The app also utilizes the Github API to display the user's profile and their commits.


## Screenshot

<img width="1429" alt="screen shot 2019-01-06 at 7 27 47 pm" src="https://user-images.githubusercontent.com/16019344/50744537-a97b6800-11e9-11e9-9427-b56f8a218ff6.png">


## Technologies Used
* React
* Sass
* Axios
* Firebase
* Reactstrap
* Font Awesome

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase
1. Clone the repository to your local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime databse in Firebase, and start in test mode.

### 2. Serve up the app
#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.