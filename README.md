# WDI-Project-2-Grace
Grace is a Gratitude Journal, done as part of Project 2 under General Assembly Singapore's Wed Development Immersive. The project will involve languages such as HTML, CSS, Javascript, and packages such as Node, Express, and PostgresSQL. 

Problem: People want to be happier.
Solution: They can keep a gratitude journal.
Spec: 
    • The spec provides a usable interface for the user to create entries in a online gratitude journal 
    • The user can read past entries, to reflect on past experiences. 
    • The user can edit, or delete past entries, if there are issues with past entries. 
    • The user can also create images in entries, when text is insufficient for the entry.
    • The user can choose from different templates for each entry, so as to prompt the user to make entries easier to start. - What does the table look like​? What do the columns have in common for each template?

    (I am grateful for _______ because it _______________ .). 
    (Obstacle 1 _________ and I am grateful as  ____________)
    I am grateful to ________ as s/he _____________
    The best part of my day is _________ as ___________________

    random prompts: https://www.developgoodhabits.com/gratitude-journal-prompts/

    • The user can also customize a template for each entry (under settings in profile).
    • The user can also set email reminders according to certain days or times to make entries, to ensure that the user continues the habit.
    • The user can have the option of sharing past specific past entries with specific people, which furthers the act of being grateful.
    • A calendar can also be generated in the spec for the user to see if he is meeting goals of weekly or daily entries, and to allow for a friendlier way of accessing past entries.

npm init --y
npm i express react react-dom pg express-react-views method-override cookie-parser js-sha256

Technical Requirements
Have at least 2 models (more if they make sense) -- ideally a user model and one that represents the main functional idea for your app
Have complete RESTful routes for at least one of your resources with GET, POST, PUT, and DELETE
Utilize a data store (most likely Postgres) to create a database and interact with your data
Extras
Include sign up/log in functionality, with hashed passwords & an authorization flow
Incorporate a CSS Framework like Bootstrap to style your site.
Include API endpoints in your application. That means, have some /api/ name-spaced routes that return JSON data.
Incorporate an External API. Examples include Yelp, Tumblr, Facebook, and others on Mashape.
Allow Image Upload. Using the Multer package and a service like Cloudinary.
