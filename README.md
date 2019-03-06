# WDI-Project-2-Grace
Grace is a Gratitude Journal, done as part of Project 2 under General Assembly Singapore's Wed Development Immersive. The project involves languages such as HTML, CSS, Javascript, and packages such as Node, Express, and PostgresSQL.

# About
Problem: People want to be happier.
Solution: They can keep a gratitude journal. Positive psychology journals have shown that gratitude journaling helps people to maintain a more positive mindset by helping them draw their attention to the happier things in life.

# Deliverables
- The spec provides a usable interface for the user to create entries in a online gratitude journal.
- The user can read past entries, to reflect on past experiences. 
- The user can edit, or delete past entries, if there are issues with past entries. 
- The user can also create images in entries, when text is insufficient for the entry.
- The user can choose from different templates for each entry, so as to prompt the user to make entries easier to start. 
- The user can also customize a template for each entry (under settings in profile).
- Application is deployed online [here](http://grace-journal.herokuapp.com/)

# Instructions
- 'Register' to create an account.
- Under 'Entries', you can post a new entry, which uses basic provided prompts, or post new random entries, which gives you a topic by random.
- I you wish to make your own prompts, you can choose to 'Customise Entries'.
- You may 'Post Photo', if that helps you to cpature your feelings better.

# Technical Specifications
- App code is structured like MVC
- 2 models - a user model and the 'hournaling' model
- contollers have complete RESTful routes with GET, POST, PUT, and DELETE
- App utilizes a data store (Postgres) to create a database and interact with data
- sign up/log in functionality, with hashed passwords & an authorization flow
- App incorporates a CSS Framework (Boostrap).
- App allows Image Upload, using the Multer package and Cloudinary.
