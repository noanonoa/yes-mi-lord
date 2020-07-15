# Yes Mi Lord
A **Lord of the Rings** fanpage that allows users to browse all characters from the epic trilogy and build a team.  The design is meant for fans to explore their favorite characters and build their own team for the mission to destroy The One Ring. Users are able to comment on their choices and share their story.

link here: https://yes-mi-lord.herokuapp.com/


# Planning

## User Story
As a user, I want to be able to:  
- *login the app and see all characters from LotR trilogy*  
- *click on each character and see related details (quotes, name, race, gender, realm, and more)*  
- *add characters to my team*  
- *comment on my favorite characters*  
- *see a collection of other users' comments*  

## MVP
1. User Login
2. Characters Main Page
3. Characters Show Page
4. Comments Page
5. Team Page
6. Team Show Page

## Wireframes
![](/public/wireframe-01.png)  
![](/public/wireframe-02.png)  


# Execution

## API
Through this API, I am able to access characters' information from the epic trilogy such as their name, race, gender, height, hair, birth, death, quotes, and wiki url links for further details.  The idea is to get a better feel of each character from a profile before adding them to the team.
```
axios.get('https://the-one-api.herokuapp.com/v1/character', token)
.then(results => {
    let movieCharacters = results.data.docs;
    res.render('characters', { movieCharacters })
})
```


## Models  
These are the three models needed for creating database and their associations.
### user  
```
email: string
name: string
password: string

associations:  
- hasMany team
```
### team  
```
comment: string
name: string
userId: integer

associations:  
- hasMany teammate
- belongsTo user
```
### teammate  
```
name: string
charId: string
teamId: integer

associations:
- belongsTo team
```

## Routing
### GET
```
/profile - shows profile page
/comments - shows all comments from db.team

/auth/register - show registration form on front page
/auth/login - show login screen
/auth/logout - redirect to front page

/characters - show list of Lord of the Rings characters from API
/characters/:id - show a page for character's details from API

/team - shows all teams from db.team
/team/:name - shows all db.teammate of specific db.team
```
### POST
```
auth/register - submit form to create db.user
auth/login - submit form to find db.user

/team - creates a db.team
/team/addTeammate - creates a db.teammate
```
### PUT
```
/team/comment/:id - updates comment for db.team
/team/remove/comment/:id - updates comment to 'null' for db.team
```
### DELETE
```
/team/:id - deletes a team from db.team
/team/teammate/:id - deletes a teammate from db.teammate
```


# Conclusion  

## Technologies  
> HTML, CSS, JavaScript, Node.js, Postman (API research)

### API:  
> [Lord of the Rings - The one API](https://the-one-api.herokuapp.com/)  

### NPMs:  
> Axios, Bcrypt, EJS, EJS Layouts, Express, Flash, Helmet, Method Override, Morgan, Passport, Sequelize, Sessions  

## Resources  
- background image: [link](https://www.nathanprats.com/wp-content/uploads/2018/12/Lord-of-the-rings.jpg)

## Final Thoughts  
API does not contain picture of characters.  This was a huge bummer to me but it is a good opportunity for data scraping.  
Characters were not collectively arranged in alphabetical order which meant I had to find a way to reorder.  
Information was scattered across different scopes of the API which meant nested requests and loops.  Overall, I had a lot of fun styling vanilla CSS and routing for my API and database.  This project was great for learning full-stack development from scratch.