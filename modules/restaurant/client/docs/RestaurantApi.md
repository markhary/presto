# PrestoApi.RestaurantApi

All URIs are relative to *http://localhost/restaurant*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getItemsById**](RestaurantApi.md#getItemsById) | **GET** /restaurant/{restaurantID}/item | Retrive list of menu items available at restaurant


<a name="getItemsById"></a>
# **getItemsById**
> [Item] getItemsById(restaurantID)

Retrive list of menu items available at restaurant

Returns a list of menu items

### Example
```javascript
var PrestoApi = require('presto_api');

var apiInstance = new PrestoApi.RestaurantApi();

var restaurantID = 789; // Number | ID of restaurant to retrieve


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getItemsById(restaurantID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **restaurantID** | **Number**| ID of restaurant to retrieve | 

### Return type

[**[Item]**](Item.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

