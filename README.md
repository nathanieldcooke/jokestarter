## Welcome to Jokestarter!

_**[Jokestarter](https://joke-starter.herokuapp.com/)**_ is a human driven, crowd-sourcing platform that allows people to bring to the market the greatest products from the hit TV show, _Impractical Jokers_. 

**[Wiki](https://github.com/nathanieldcooke/jokestarter/wiki)**: Jokestarter Application Details

## **Meeting Project Requirements**
___

  1. Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js.  
    - The Jokestarter application uses React for the frontend.

  2. Create an application that can be interacted within a minimum of three different ways by the user.  
    - The Jokestarter application consists of 4 features: **User Profile**, **Projects**, **Bookmarks**, and **Contributions**. 
      - Further details on these features can be found in the Wiki/**[Feature List](https://github.com/nathanieldcooke/jokestarter/wiki/Feature-List)** and the Wiki/**[User Stories](https://github.com/nathanieldcooke/jokestarter/wiki/User-Stories)**.

  3. Integration with a backend service developed by you, integrated with a PostgreSQL database, with CRUD (create, read, update, delete) operations.  
    - The Jokestarter application uses a custom-made API that utilizes the Sequelize ORM to interact with the PostgreSQL database in order to perform CRUD operations for the 4 site features.
      - Further details on the API and CRUD functionality can be found in the Wiki/**[API Documentation & Routes](https://github.com/nathanieldcooke/jokestarter/wiki/API-Documentation-&-Routes)** and the Wiki/**[Application Architecture](https://github.com/nathanieldcooke/jokestarter/wiki/Application-Architecture)**.

  4. The usage of a specified architectural pattern (MVC, MVP, MVVM, etc.).  
    - The Jokestarter application is designed with an MVC architecture.
      - Further details on the mapping of the architecture to the application can be found in the Wiki/**[Application Architecture](https://github.com/nathanieldcooke/jokestarter/wiki/Application-Architecture)**.

  5. Integration of a third party RESTful API.  
    - The Jokestarter application uses the Stripe API to process payments.
      - **Note:** The current state of the app uses a test key, further details on how to make payments can be found [below](#cont). 

  6. Usage of at least 5 UI components from the `material-ui/@core library`.  

  - Modal `@mui/material/Modal`

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/modal.png" alt="drawing" width="200"/>

  - <type>Icon `@mui/icons-material/GitHub`

    ```
      - Bookmark 
      - Dislike Thumb
      - Github
      - Folder
      - LinkedIn
    ```

  - Pagination `@mui/material`

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/pageination.png" alt="drawing" width="200"/>

  - LinearProgress `@mui/material/LinearProgress`

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/LinearProgress.png" alt="drawing" width="200"/>

  - Snackbar `@mui/material/Snackbar` and MuiALert `@mui/material/Alert`

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/material/snack-bar.png" alt="drawing" width="200"/>

  - Button `@material-ui/core/Button`

    ```- LOG IN
        - DEMO
        - SIGN UP
        - BACK THIS PROJECT
        - BOOKMARK
        - CONTINUE
    ```

  7. An example of a reusable component that you have created and used in the app.  
    - `ProjectTile` is one example of a custom component that is used throughout the application. 
      - The `ProjectTile.tsx` component can be see, being used by both the `Contributions.tsx` and `Projects.tsx` components.

## **Page Views**
___

  - ### **Projects**

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/projects-s.gif" alt="drawing" width="900"/>

  - ### **Profile**

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/profile.gif" alt="drawing" width="900"/>

  - ### **Bookmarks**

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/bookmark-s.gif" alt="drawing" width="900"/>

  - ### **Contributions** <a name="cont"></a>

    - **Note:** Test API key requirements to simulate making successful payment:
      - Card Number: 4242 4242 4242 4242
      - Expiration Date: any future date (i.e. 04/27)

    <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/contributions.gif" alt="drawing" width="900"/>

## **Installation & Getting Started**
___

  - On the terminal, run `git clone https://github.com/nathanieldcooke/jokestarter.git` to download the project [repo](https://github.com/nathanieldcooke/jokestarter).
    - This will create a new directory on your local machine named `jokestarter`.
  - Then create a user in the psql shell
    - in the terminal, run `psql`
    - in the terminal, run `CREATE USER <name_of_user> WITH CREATEDB PASSWORD '<password>'`
      - the name_of_user and password can be whatever you want, just be sure to take note of them for later steps. 
    - exit the psql shell `\q` 
  - `cd` into `jokestarter/dist/backend` and create a `.env` file based on the `.env.example` file.
    - `PORT=5000`
      - You can make the `PORT` anything that's available, generally `3000` and `5000` are popular options and `3000` is taken by the react app.
    - `DB_USERNAME=<name_of_user>`
      - this will be the name of the user you set-up in earlier `psql`
    - `DB_PASSWORD=<password>`
      - this will be the name of the user you set-up in earlier `psql`
    - `DB_DATABASE=<db_name>`
      - `<db_name>` can be set equal to whatever name you want for the applications database. 
    - `DB_HOST=<db_host>`
      - `<db_host>` is generally set to `localhost`
    - `JWT_SECRET=<string>`
      - the secret can be as simple a string as `password` for local demo purposes, production deployment should have a much stronger secret. [UUID](https://www.npmjs.com/package/uuid) is a great way to generate a strong secret. 
    - This will involve creating an account with the [Stripe API](https://stripe.com/docs), in order to generate the API key for payment processing.
  - `cd` into `dist/backend`, run:  
    - `npm install` 
    - `npx dotenv sequelize-cli db:create` 
    - `npx dotenv sequelize-cli db:migrate` 
    - `npx dotenv sequelize-cli db:seed:all`
    - `npm start`
      - This will install all backend dependencies, set-up the database, and start the backend server.
  - On a separate terminal, `cd` into `dist/frontend` run:  
    - `npm install`
    - `npm start`. 
      - This will install all frontend dependencies and start the frontend server.

## **Notable Design Decisions**
___

Going beyond what has been noted in the project [Wiki](https://github.com/nathanieldcooke/jokestarter/wiki), here are the few additional design decisions that were made:

  - Separation and Vertical Orientation of route helper functions.
    - As to keep the router files uncluttered with non-router specific code, the functions used to aggregate data for specific router actions has been abstracted away to the vertically organized file, `routeDataAggregators`, where the helper functions are exported.

      <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/aggreg.png" alt="drawing" width="900"/>

  - Generating and seeding a unique demo user upon clicking the `DEMO` button.
    - This gives future users the ability to experience the website uninhibited by prior user interactions.

      <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/demo-user-2.png" alt="drawing" width="900"/>

  - Minimalist router design.
    - After recognizing the components needed to achieve the functionality of the site, I aimed to simplify and consolidate routes using the wildcards of `:categoryName` and `:pageNumber` in the route path.

      <img src="https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/design/routes.png" alt="drawing" width="900"/>
 
