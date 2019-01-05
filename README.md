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

## Usage

## License

Licensed under the [Unlicense](LICENSE).
