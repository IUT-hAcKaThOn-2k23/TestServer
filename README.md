
# Blog API

Basic APIs for a simple Blog site.




## API Documentation links

[UserFunctions](https://documenter.getpostman.com/view/17979225/UyxbppQ7)

[BlogSearching](https://documenter.getpostman.com/view/17979225/UyxbppQE)

[BlogPosting](https://documenter.getpostman.com/view/17979225/UyxbppQF)

[BlogManipulation](https://documenter.getpostman.com/view/17979225/UyxbppUY)

[Auth](https://documenter.getpostman.com/view/17979225/UyxbppUZ)

[Search](https://documenter.getpostman.com/view/17979225/UyxdLpec)

[Moderator](https://documenter.getpostman.com/view/17979225/UyxeqUy7)



## Installation

Clone the repo.

Make sue you have npm installed. Run the following command on the terminal with in the same directory

```bash
  npm install 
```
This would locate the *package-lock* file and install all the dependencies.

Now run the following command

```bash
  npm start 
```
The server will get fired on port 5001. The project uses nodemon. So after every time you change the code.
It automatically detects the change and restarts the server.
## Testing the APIs
There are 2 steps to test the APIs
### Importing  Postman collections
- Open a workspace in Postman.
- Press the import button on the top left corner.
- Then select all the files inside the  "BlogAPI_for_KERNEL\API_documentation" directory
- Now You will have the whole workspace set and start the server to send each request.
- You can always change the body of the API request in the *body* section. Choose *JSON* from the dropdown

### Using the Documentation Link
 - Go to " BlogAPI_for_KERNEL\API_documentation_weblink " or check the API Documentation links section above.
 - There you can find the documentation and a option in the top right corner to run it in postman
 - Follow the instructions there after booting up the server

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_CONNECTION` : Provide your connection string

`TOKEN` : Provide a secret token for the JWT encryption

`ADMINPASS`: use this to open the initial account for moderator.

`EMAIL`:The gmail that will be used to send verification mail

`PASSWORD`: The password of the gmail mentioned right above


## API Features

- Authentication using JWT token
- Posting a blog
- CRUD operation of blog
- Reviewing a blog
- Reacting on a blog
- Reporting a Reviewing
- Reacting on a review
- Searching blog by title
- Getting specific set of blog by various parameters like, getting the blog of a particualr author
- Retrieving Blog comments
- Deleting a review 
- Rating a user and a convinent rating method. 
- Moderator user role. Moderator can edit content of blogs
- OTP verification for moderator
- Email verification for moderator.
- A post will be deleted if three different moderators agree to delete it

