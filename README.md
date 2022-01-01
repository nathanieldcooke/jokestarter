## Welcome to Jokestarter!

_**[Jokestarter](https://joke-starter.herokuapp.com/)**_ is a human driven, crowd-sourcing platform that allows people to bring to the market the greatest products from the hit TV show, _Impractical Jokers_. 

## **Meeting Project Requirements**

  1. Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js  
    - The jokestarter application uses React for the frontend.

  2. Create an application that can be interacted with in a minimum of three different ways by the user.  
    - The jokestarter application consist of 4 features; user profile, projects, bookmarks, and contributions 
      - further details on these features can be found in the Wiki/**[Feature List](https://github.com/nathanieldcooke/jokestarter/wiki/Feature-List)** and the Wiki/**[User Stories](https://github.com/nathanieldcooke/jokestarter/wiki/User-Stories)**

  3. Integration with a backend service developed by you, integrated with a PostgreSQL database, with CRUD (create, read, update, delete) operations.  
    - The jokestarter application uses a custom made API, that utilizes the sequelize ORM to interact with the PostgrSQL database, in-order to perform CRUD operations for the 4 site features.
      - further details on the API and CRUD functionality can be found in the Wiki/**[API Documentation & Routes](https://github.com/nathanieldcooke/jokestarter/wiki/API-Documentation-&-Routes)** and the Wiki/**[Application Architecture](https://github.com/nathanieldcooke/jokestarter/wiki/Application-Architecture)**

  4. The usage of a specified architectural pattern (MVC, MVP, MVVM, etc.).  
    - The jokestarter application is designed with an MVC architecture.
      - further details on the mapping of the architecture to the application can be found in the Wiki/**[Application Architecture](https://github.com/nathanieldcooke/jokestarter/wiki/Application-Architecture)**

  5. Integration of a third party RESTful API.  
    - The jokestarter application uses the Stripe API to process payments
      - Note: The current state of the app uses a test key, further details on how to make payments can be found [below](#cont). 

  6. Usage of at least 5 UI components from the material-ui/@core library.  

  - Modal '@mui/material/Modal'

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/modal.png" alt="drawing" width="200"/>

  - <type>Icon '@mui/icons-material/GitHub'

    ```
      - Bookmark 
      - Dislike Thumb
      - Github
      - Folder
      - LinkedIn
    ```

  - Pagination '@mui/material'

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/pageination.png" alt="drawing" width="200"/>

  - LinearProgress '@mui/material/LinearProgress'

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/LinearProgress.png" alt="drawing" width="200"/>

  - Snackbar '@mui/material/Snackbar' & MuiALert '@mui/material/Alert'

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/snack-bar.png" alt="drawing" width="200"/>

  - Button '@material-ui/core/Button'

   ```- LOG IN
      - DEMO
      - SIGN UP
      - BACK THIS PROJECT
      - BOOKMARK
      - CONTINUE
   ```

  7. An example of a reusable component that you have created and used in the app.
    - ProjectTile is one example of a custom component that is used throughout the application. 
      - The component can be found in src/frontend/src/Contributions and src/frontend/src/Projects

## **Views**
  - ### Projects

  <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/projects-s.gif" alt="drawing" width="900"/>

  - ### Profile

  <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/profile.gif" alt="drawing" width="900"/>

  - ### Bookmarks

  <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/bookmark-s.gif" alt="drawing" width="900"/>

  - ### Contributions <a name="cont"></a>

    - Note: test API key requirements to simulate making successful payment
      - Card Number: 4242 4242 4242 4242
      - Expiration Date: any future date (i.e. 04/27)

  <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/contributions.gif" alt="drawing" width="900"/>

## **Installation & Getting Started**
  - git clone or download the project [repo](https://github.com/nathanieldcooke/jokestarter)
  - create a .env file based the .env example
    - This will involve creating an account with the [Stripe API](https://stripe.com/docs), in-order to generate the API key for payment processing.
  - `cd REPO_NAME/dist/backend` run `npm install`
  - `cd REPO_NAME/dist/frontend` run `npm install` 
  - `cd REPO_NAME/dist/backend` run `npm start`
    - this will start the backend server
  - `cd REPO_NAME/dist/frontend` run `npm start`
    - this will start the frontend server 

## **Notable Design Decisions**
Going beyond what has been noted in the project [Wiki](https://github.com/nathanieldcooke/jokestarter/wiki), here are a few additional design decisions that were made. 

  - Separation and Vertical Orientation of route helper-functions
    - As to keep the router files uncluttered with non-router specific code. Functions used to aggregate data for specific router actions, has been abstracted away to the vertically organized file `routeDataAggregators`, where the helper functions are exported.

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/aggreg.png" alt="drawing" width="900"/>

  - Generating and Seeding a unique demo user, upon `DEMO` button click
    - Giving future users the ability to experience the website un-inhibited by prior user interactions.

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/demo-user-2.png" alt="drawing" width="900"/>

  - Minimalist router design
    - After recognizing the components needed to achieve the functionality of the site. I aimed to simplify and consolidate routes, using the wildcards of `:categoryName` and `:pageNumber` in the route path.

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/routes.png" alt="drawing" width="900"/>