# Basic CRUD APIs

It's a basic CRUD (Create, Read,
Update, Delete) API(s) implimented using node/express that allows a user to manage books. 
Hence, API(s) includes endpoints for creating, reading, updating, and deleting
items.




## Tech Used:

 - Node
 - Express library
 - Mongodb


## API Reference

 ### Inserting a book:

```http
  POST {{serverUrl}}/api/books-service/book/insert
```
#### Request Body
```
{
    "author": "Manisha Rana",
    "title": "My Life",
    "summary": "A Book for life guidance."
}
```


 ### Get All Books:

```http
  GET {{serverUrl}}/api/books-service/book/list
```

#### Response Body
```
{
    "books": [
        {
            "bookId": "fcf1dceb-0d57-4db3-8ce1-d29b839d1fa9",
            "title": "My Life"
        },
        {
            "bookId": "ad301f54-6466-4ae3-9bd9-d73e270417bc",
            "title": "My Life II"
        },
        {
            "bookId": "ffd35768-4fe1-469c-aaf1-3a1f0e04b5e3",
            "title": "My Life III"
        }
    ]
}
```


 ### Get Book Info:

```http
  GET {{serverUrl}}/api/books-service/get/book/:bookId
```

| Parameter | Example Value     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `fcf1dceb-0d57-4db3-8ce1-d29b839d1fa9` | uuid to access book Uniquely |


#### Response Body
```
{
    "bookId": "fcf1dceb-0d57-4db3-8ce1-d29b839d1fa9",
    "author": "Manisha Rana",
    "title": "My Life",
    "summary": "Book for life guidance women."
}
```

 ### Update Book Info:

Only update specified field in requestBody, else remain unaffected.

```http
  PATCH {{serverUrl}}/api/books-service/update/book/:bookId
```

| Parameter | Example Value     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `fcf1dceb-0d57-4db3-8ce1-d29b839d1fa9` | uuid to access book Uniquely |


#### Request Body
```
{
    "author": "Manish Rana",
    "title": "My Life",
    "summary": "Book for life guidance women."
}
```

### Delete a Book:

```http
  DELETE {{serverUrl}}/api/books-service/delete/book/:bookId
```
| Parameter | Example Value     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `fcf1dceb-0d57-4db3-8ce1-d29b839d1fa9` | uuid to access book Uniquely |

#### Response Body
```
{
    "message": "Deleted book with bookId: c32949a9-5f59-4a7e-854a-fe596c549090"
}
```




# Directory structure
```
crude-express-server/
│
├── node_modules/           # Installed npm packages and dependencies
|
|
├── config/                 # Configuration files (e.g., database, environment variables)
│   ├── db.js               # Database handshake
│   ├── environment.js      # Environment variables setup
│
├── routes/                 # Express route definitions
│   ├── book.js             # book routes
│   
│
├── controllers/            # Controllers for handling request and response
│   ├── bookController.js   # Books-related controller
│
│
├── app.js                  # Express application setup
│
├── package.json            # NPM package file with project dependencies
│
├── package-lock.json       # Lock file for NPM packages
│
├── .env                    # Environment-specific configuration
│
├── README.md               # Project documentation

```

## Authors

- [@mannuR22](https://www.github.com/mannuR22)
