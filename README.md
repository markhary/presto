# presto
Presto backend API coding challenge

## Task

Utilizing your language of choice, design a RESTful web service API call that will return a list of menu items for a specific restaurant.

### Specifics

For this API call, the front end will target path 
`/restaurant/:restaurantId/item`.

```python
public Observable<Response> execute(Request request) {
URL url = new URL("https://api.presto.com/restaurant/1/item");
HttpURLConnection con = url.openConnection();
}
```

The expected response will be parsed directly from JSON to a list of Item objects.

```python
execute(request).subscribe(response -> {
Type listType = new TypeToken<List<Item>>(){}.getType();
List<Item> items = new Gson().fromJson(response, listType); });
```

### Requirements

This challenge is centered around the concept of communicating throughout the stack from the backend, so each part of that communication stack is required:

1. Handle the request from the front end
2. Connect to and query from a Postgres database instance
3. Send the response to the front end

The data model structure is up to you, it’s assumed that the frontend will mimic your object layout for seamless parsing. The only requirement is that the Item object must contain a list of modifiers (ex. Side item, Topping, Sauce). Hint - modifiers can also have modifiers (think dressing choices for side salad).

Scalability is paramount. The code you build should not end up being a bottleneck down the road (will this have to be rebuilt when it’s being hit 100x as frequently?).

## Design

### Architecture

- **Framework**: I am using JavaScript, simply because I am very familiar with it.  This naturally means I will use Node and Express.
- **API Design**: [Swagger Editor](http://editor.swagger.io) to generate the [API contract](https://swagger.io/blog/api-development/why-you-should-create-an-api-definition/) and swagger-codegen to generate the node server using express.
- **Scalability**: [Node](https://nodejs.org/en/) is commonly used for designing production ready [scalable and concurrent](https://en.wikipedia.org/wiki/Node.js#Platform_architecture) backend systems.  If you are writing a backend using javascript (I am), then node is your huckleberry.
- **Database Connectivity**: Using [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/), which is the most popular (by download statistics) SQL ORM software package:
	+ [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/) The Sequelize library is an ORM (Object-Relational-Mapper) which provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa.
	+ [List](https://www.npmjs.com/search?q=ORM&ranking=popularity) of most popular ORM packages according to [npmjs](https://www.npmjs.com)
	+ [Comparison](https://www.npmtrends.com/mongoose-vs-sequelize) of mongoose vs sequalize over last 6 months
- **Security**: Implementing this using HTTP because doing it with an SSL certificate is not an option.  In practice, I would only publish an API using HTTPS.  Specifically, I'd use [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html) and the [AWS API Gateway](https://aws.amazon.com/api-gateway/), or your cloud partner equivalent.

### Trade Offs

- I chose not to use python and django because I am unfamiliar with them and preferred to complete this challenge with tools I am proficient with.
- Using [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/) over [Mongoose](https://mongoosejs.com) because challenge calls for it.  Trade-off here is lilliputian battle of [SQL vs NoSQL](https://www.thegeekstuff.com/2014/01/sql-vs-nosql-db/).
- Using HTTP over HTTPS.  Never use HTTP, only use exclusively HTTPS, except when doing coding challenges, because of the SSL certificate requirement.

## Usage

## License

Licensed under the [Unlicense](LICENSE).
