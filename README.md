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
5. Team page

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

## Database


## Routing




# Conclusion  

## Technology  
> HTML, CSS, JavaScript, Node.js, Postman (API research)

### API:  
> [Lord of the Rings](https://the-one-api.herokuapp.com/)  

### NPMs:  
> Axios, Bcrypt, EJS, EJS Layouts, Express, Flash, Helmet, Method Override, Morgan, Passport, Sequelize, Sessions  

## Resource  
- background image: [link](https://www.nathanprats.com/wp-content/uploads/2018/12/Lord-of-the-rings.jpg)

## Final Thoughts  
API does not contain picture of characters.  
Characters are not arranged in any particular order.  
Information was scattered across different scopes of the API which meant nested requests and loops.  