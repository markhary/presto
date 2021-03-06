# presto
Presto backend API coding challenge

## Table of Contents

* [Task](#task)
   + [Specifics](#specifics)
   + [Requirements](#requirements)
* [Design](#design)
   + [Architecture](#architecture)
   + [Trade Offs](#trade-offs)
* [Postgres](#postgres)
    + [Configuration](#configuration)
    + [Starting Fresh with Postgres](#starting-fresh-with-postgres)
    + [Starting Fresh with Sequelize](#starting-fresh-with-sequelize)
    + [Seeding database](#seeding-database)
* [Server](#server)
   + [Running the server](#running-the-server)
* [Client](#client)
* [Database Schema](#database-schema)
* [Future Work](#future-work)
* [License](#license)
* [Acknowledgements](#acknowledgements)

## Task

Utilizing your language of choice, design a RESTful web service API call that will return a list of menu items for a specific restaurant.

### Specifics

For this API call, the front end will target path 
`/restaurant/:restaurantId/item`.

```java
public Observable<Response> execute(Request request) {
URL url = new URL("https://api.presto.com/restaurant/1/item");
HttpURLConnection con = url.openConnection();
}
```

The expected response will be parsed directly from JSON to a list of Item objects.

```java
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

- **Framework**: I am using JavaScript and Node, simply because I am very familiar with them.
- **API Design**: [Swagger Editor](http://editor.swagger.io) to generate the [API contract](https://swagger.io/blog/api-development/why-you-should-create-an-api-definition/) and swagger-codegen to generate the node server using express.
- **Scalability**: [Node](https://nodejs.org/en/) is commonly used for designing production ready [scalable and concurrent](https://en.wikipedia.org/wiki/Node.js#Platform_architecture) backend systems.  If you are writing a backend using javascript (I am), then node is your huckleberry.
- **Database**: Postgres, because it was specified in the challenge.
- **Database Connectivity**: Using [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/), which is the most popular (by download statistics) SQL ORM software package for node:
	+ [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/) The Sequelize library is an ORM (Object-Relational-Mapper) which provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa.
	+ [List](https://www.npmjs.com/search?q=ORM&ranking=popularity) of most popular ORM packages according to [npmjs](https://www.npmjs.com)
	+ [Comparison](https://www.npmtrends.com/mongoose-vs-sequelize) of mongoose vs sequalize over last 6 months
- **Security**: There is none, due to the nature of the challenge.
- **Queries**: Will use a Common Table Expression (CTE) query through sequelize to keep this scalable.  Node will ensure this remains scalable through asyncronous promises (meaning it will not block other requests while the DB handles this query for as long as it takes).  [Queries](modules/restaurant/server/scripts/database/recursive-query.sql) from the postgres command line using the sample data are recorded here.

### Trade Offs

- I chose not to use python and django because I am unfamiliar with them and preferred to complete this challenge with tools I am proficient with.
- Using [Sequelize](https://sequelize.readthedocs.io/en/1.7.0/) over [Mongoose](https://mongoosejs.com) because challenge calls for it.  Trade-off here is lilliputian battle of [SQL vs NoSQL](https://www.thegeekstuff.com/2014/01/sql-vs-nosql-db/).
- No security, never do this, ever. period.
- I stuck with the naming convention used in the coding challenge, but I am not certain that matches the [database schema](#database-schema) well. 
- I used three tables to split up the data.  It makes the query more complicated (needing Joins), but I think it is more extensible.

## Postgres

### Configuration

Configure the connection to your postgres server by modifying `modules/restaurant/server/config/database.json`.  The defaults are:

```
  "development": {
    "username": "presto",
    "password": "presto",
    "database": "presto",
    "host": "192.168.56.102",
    "port": "5432",
    "dialect": "postgres"
  },
```

### Starting Fresh with Postgres

- Create a `presto` user and `presto` database, or `sh modules/restaurant/server/scripts/database/postgres.sh`

```
postgres@localhost:~$ createuser --echo --pwprompt --createdb --no-createrole --no-superuser presto
postgres@localhost:~$ createdb presto
```
### Starting Fresh with Sequelize

This will create new models, this should be unnecessary as files are tracked in git.

```
cd modules/restaurant/server/scripts/database
sh ./sequelize-initialize-environment.sh
sh ./sequelize-create-models.sh
```
### Seeding database

This will drop the current database and re-seed it from a known state

```
cd modules/restaurant/server/scripts/database
sh ./sequelize-seed-database.sh
```

## Server
The server stub was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project.

### Running the server
To run the server for the first time, run:

```
cd modules/restaurant/server
npm start
```

To run just the server, run:

```
node index.js
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.

## Client

Read the Client instructions [here](modules/restaurant/client/README.md).  Here is a shortcut:

```
cd modules/restaurant/client
npm install
```

and to test:

```
npm test
```

## Database Schema

I am using three tables to track ***Restaurants***, ***Items***, and ***Menus***:

- **Restaurant** - List of available restaurants, restaurantID in API.
- **Items** - Items available at a restaurant, associated with a Restaurant.
- **Menu** - Table holding relationship of items to each other.  An item where Modifies is NULL is a *top-level* item.  This table allows for a hierarchical relationship.  Care must be taken (and code introduced) to prevent [cyclic dependencies](#future-work).  Ultimately this relationship table defines the response to the API challenge.
 
***Restaurant Table***

RestaurantID | Name
-------------|--------
(pk) int     | string 

***Item Table - Associated with Restaurant Table***

ItemID   | RestaurantID      | Name     | Description
---------|-------------------|----------|------------
(pk) int | (fk) RestaurantID | string   | string

***Menu Table***

MenuID   | itemID      | RestaurantID      | Modifies    | Description   
---------|-------------|-------------------|-------------|------------
(pk) int | (fk) ItemID | (fk) RestaurantID | (fk) itemID | string 

## Future Work
These are things I would do if I had more time:

* Use UUIDs instead of incrementing ints for primary keys
* Default string lengths (255) used for all fields, would make them reasonable
* Cannot stress implement proper security enough - https, SSL connection to DB, secure DB, API keys, API authentication, etc.
* Complete CRUD API.  Use that to seed database for test environment (database provisioning/migration still done with `npm install`).
* Performance tests:
  - Multiple restaurants
  - X simultaneous clients
  - Y items (with modifiers)
     - random item generator
     - connection reliability (intermittent connections)
     - low bandwidth connectivity (e.g. 1 Mbps down, 0.04 Mbps up)
  - Resource graphcs under load testing
     - Memory, CPU usage 
     - Perf statistics
     - SQL call duration
     - gprof
     - O(N) estimation
* Move database documentation from [here](#database-schema) to a schema definition file to avoid decoupling
* Protection against [cyclic graphs](https://www.postgresql.org/docs/9.1/queries-with.html), e.g.:

***Menu Table: Check for cyclic association in table***

(Note - Example only, not Schema accurate)

ItemID | Modifies| Note   | Problem
-------|---------|--------|-------------
1      | NULL    | Top level item |
2      | 1       | Green Salad as side to burger |
3      | 2       | Blue Cheese Dressing for salad |
4      | 3       | Extra blue cheese | ***Cyclic association*** |
3      | 4       | Blue Cheese Dressing for blue cheese | ***Cyclic association*** |
4      | 4       | Blue Cheese for blue cheese | ***Cyclic association*** |

* Refactor CTE code to use native sequelize functionality, there seem to be some other modules that do this better.
* Refactor tree building code in API to be a generic graph structure builder, this would be a more reusable component.  I implemented a graph search algorithm, should optimize if more time.

## License

Licensed under the [Unlicense](LICENSE).

## Acknowledgements

* Table of contents generated with [markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
