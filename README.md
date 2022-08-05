### How to start the project locally

-   Clone project in your local folder
-   Install all packages with: npm install
-   Start the project with: npm start

### Scripts before deployment

-   npm run build

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Project Description

##### Users Authentication

To create and store our user's information we're using email and password authentication provided by firebase.

##### Image Storage

To store the clients images, we use the firebase cloud storage, where all files are converted into links and used in our website.

### Functionalities

-   Login
-   Register
-   CRUD operations for:
    -   user data
    -   post
    -   comments
    -   replies
-   Like post
-   Notifications for liked or commented post
-   NY Times API for fetching best 15 books from 3 categories:
    -   Hardcover fiction
    -   Hardcover non-fiction
    -   Paperback non-fiction
-   Google Books API for searching books
-   Add saved posts
-   Change profile photo
