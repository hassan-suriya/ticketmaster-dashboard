# Ticketmaster Discovery API V2.0

The Ticketmaster Discovery API allows you to search for events, attractions, or venues.

## Overview

### Authentication
To run a successful API call, you will need to pass your API Key in the `apikey` query parameter. Your API Key should automatically appear in all URLs throughout this portal.

**Example:**
```
https://app.ticketmaster.com/discovery/v2/events.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6
```

Without a valid API Key, you will receive a 401 Status Code with the following response:

```json
{
    "fault": {
        "faultstring": "Invalid ApiKey",
        "detail": {
            "errorcode": "oauth.v2.InvalidApiKey"
        }
    }
}
```

### Root URL
```
https://app.ticketmaster.com/discovery/v2/
```

### Event Sources
The API provides access to content sourced from various platforms, including Ticketmaster, Universe, FrontGate Tickets, and Ticketmaster Resale (TMR). By default, the API returns events from all sources. To specify a specific source(s), use the `&source=` parameter. Multiple, comma-separated values are OK.

### Event Coverage
With over 230K+ events available in the API, coverage spans different countries, including United States, Canada, Mexico, Australia, New Zealand, United Kingdom, Ireland, other European countries, and more. More events and more countries are added on a continuous basis.

### Rate Limits
The default quota is 5000 API calls per day and a rate limitation of 5 requests per second.

**Deep Paging:** We only support retrieving the 1000th item. i.e. ( size * page < 1000)

### Examples
- Get a list of all events in the United States:
```
https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6
```

- Search for events sourced by Universe in the United States with keyword “devjam”:
```
https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6
```

- Search for music events in the Los Angeles area:
```
https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6
```

- Get a list of all events for Adele in Canada:
```
https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6
```

## API Endpoints

### Find Suggest
**Method:** GET  
**Summary:** Find Suggest  
**Description:** Find search suggestions and filter your suggestions by location, source, etc.  
**Endpoint:** `/discovery/v2/suggest`

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| keyword | Keyword to search on | String | | No |
| latlong | Filter events by latitude and longitude, this filter is deprecated and may be removed in a future release, please use geoPoint instead | String | | No |
| radius | Radius of the area in which we want to search for events | String | 100 | No |
| unit | Unit of the radius | String enum: ["miles", "km"] | miles | No |
| source | Filter entities by its primary source name OR publishing source name | String enum: ["ticketmaster", "universe", "frontgate", "tmr"] | | No |
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | en | No |
| includeTBA | True, to include events with date to be announced (TBA) | String enum: ["yes", "no", "only"] | no if date parameter sent, yes otherwise | No |
| includeTBD | True, to include events with a date to be defined (TBD) | String enum: ["yes", "no", "only"] | no if date parameter sent, yes otherwise | No |
| includeTest | Yes if you want to have entities flagged as test in the response. Only, if you only wanted test entities | String enum: ["yes", "no", "only"] | no | No |
| size | Size of every entity returned in the response | String | 5 | No |
| countryCode | Filter suggestions by country code | String | | No |
| segmentId | Filter suggestions by segment id | Array | | No |
| geoPoint | Filter events by geoHash | String | | No |
| resource | Which resources to include in the suggest response, defaults to all resources | Array | attractions,events,venues,products | No |
| preferredCountry | Popularity boost by country, default is us | String enum: ["us", "ca"] | us | No |
| startEndDateTime | Filter event where event start and end date overlap this range | Array | | No |
| localStartEndDateTime | Filter event where event local start and end date overlap this range | Array | | No |
| includeSpellcheck | Yes, to include spell check suggestions in the response | String enum: ["yes", "no"] | no | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `schema` (string) - A simple string response

### Attraction Search
**Method:** GET  
**Summary:** Attraction Search  
**Description:** Find attractions (artists, sports, packages, plays, and so on) and filter your search by name, and much more.  
**Endpoint:** `/discovery/v2/attractions`

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | Filter entities by its id | String | | No |
| keyword | Keyword to search on | String | | No |
| source | Filter entities by its primary source name OR publishing source name | String enum: ["ticketmaster", "universe", "frontgate", "tmr"] | | No |
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | en | No |
| includeTest | Yes if you want to have entities flagged as test in the response. Only, if you only wanted test entities | String enum: ["yes", "no", "only"] | no | No |
| size | Page size of the response | String | 20 | No |
| page | Page number | String | 0 | No |
| sort | Sorting order of the search result. Allowable Values: 'name,asc', 'name,desc', 'relevance,asc', 'relevance,desc', 'random' | String | relevance,desc | No |
| classificationName | Filter attractions by classification name: name of any segment, genre, sub-genre, type, sub-type | Array | | No |
| classificationId | Filter attractions by classification id: id of any segment, genre, sub-genre, type, sub-type | Array | | No |
| includeFamily | Filter by classification that are family-friendly | String enum: ["yes", "no", "only"] | yes | No |
| segmentId | Filter attractions by segmentId | Array | | No |
| genreId | Filter attractions by genreId | Array | | No |
| subGenreId | Filter attractions by subGenreId | Array | | No |
| typeId | Filter attractions by typeId | Array | | No |
| subTypeId | Filter attractions by subTypeId | Array | | No |
| preferredCountry | Popularity boost by country, default is us | String enum: ["us", "ca"] | us | No |
| includeSpellcheck | Yes, to include spell check suggestions in the response | String enum: ["yes", "no"] | no | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `page` (object) - Information about current page in data source

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/attractions.json?size=1&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Attraction Details
**Method:** GET  
**Summary:** Get Attraction Details  
**Description:** Get details for a specific attraction using the unique identifier for the attraction.  
**Endpoint:** `/discovery/v2/attractions/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the attraction | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `type` (string) - Type of the entity
  - `id` (string) - Unique id of the entity in the discovery API
  - `locale` (string) - Locale in which the content is returned
  - `name` (string) - Name of the entity
  - `description` (string) - Description of the entity
  - `additionalInfo` (string) - Additional information of the entity
  - `url` (string) - URL of a web site detail page of the entity
  - `images` (array) - Images of the entity
  - `classifications` (array) - Attraction's classifications
  - `externalLinks` (object) - List of external links
  - `test` (boolean) - Indicate if this is a test entity, by default test entities won't appear in discovery API
  - `aliases` (array) - List of aliases for entity
  - `localizedAliases` (object) - List of localized aliases for entity
  - `upcomingEvents` (object) - Number of upcoming events

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/attractions/K8vZ9175BhV.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Classification Search
**Method:** GET  
**Summary:** Classification Search  
**Description:** Find classifications and filter your search by name, and much more. Classifications help define the nature of attractions and events.  
**Endpoint:** `/discovery/v2/classifications`

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | Filter entities by its id | String | | No |
| keyword | Keyword to search on | String | | No |
| source | Filter entities by its primary source name OR publishing source name | String enum: ["ticketmaster", "universe", "frontgate", "tmr"] | | No |
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | en | No |
| includeTest | Yes if you want to have entities flagged as test in the response. Only, if you only wanted test entities | String enum: ["yes", "no", "only"] | no | No |
| size | Page size of the response | String | 20 | No |
| page | Page number | String | 0 | No |
| sort | Sorting order of the search result | String | name,asc | No |
| preferredCountry | Popularity boost by country, default is us | String enum: ["us", "ca"] | us | No |
| includeSpellcheck | Yes, to include spell check suggestions in the response | String enum: ["yes", "no"] | no | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `page` (object) - Information about current page in data source

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/classifications.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Classification Details
**Method:** GET  
**Summary:** Get Classification Details  
**Description:** Get details for a specific segment, genre, or sub-genre using its unique identifier.  
**Endpoint:** `/discovery/v2/classifications/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the segment, genre, or sub-genre | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String Annapolis, MD 21401 | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `segment` (object) - A Segment is a primary genre for an entity (Music, Sports, Arts, etc)
  - `primary` (boolean) - No description specified
  - `type` (object) - A Type represents a kind or group of people (Donation, Group, Individual, Merchandise, Event Style, etc)
  - `subType` (object) - Secondary Type to further categorize an entity (Band, Choir, Chorus, etc)
  - `family` (boolean) - True if this is a family classification

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Genre Details
**Method:** GET  
**Summary:** Get Genre Details  
**Description:** Get details for a specific genre using its unique identifier.  
**Endpoint:** `/discovery/v2/classifications/genres/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the genre | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `subGenres` (array) - List of Tertiary Genre linked to the Secondary Genre
  - `id` (string) - The ID of the classification's level
  - `name` (string) - The Name of the classification's level
  - `locale` (string) - Locale in which the content is returned

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vA71.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/classifications/genres/KnvZfZ7vA71.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Segment Details
**Method:** GET  
**Summary:** Get Segment Details  
**Description:** Get details for a specific segment using its unique identifier.  
**Endpoint:** `/discovery/v2/classifications/segments/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the segment | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container for genres
  - `id` (string) - The ID of the classification's level
  - `name` (string) - The Name of the classification's level
  - `locale` (string) - Locale in which the content is returned

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications/segments/KZazBEonSMnZfZ7vFta.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/classifications/segments/KZazBEonSMnZfZ7vFta.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Sub-Genre Details
**Method:** GET  
**Summary:** Get Sub-Genre Details  
**Description:** Get details for a specific sub-genre using its unique identifier.  
**Endpoint:** `/discovery/v2/classifications/subgenres/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the subgenre | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `id` (string) - The ID of the classification's level
  - `name` (string) - The Name of the classification's level
  - `locale` (string) - Locale in which the content is returned

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Event Search
**Method:** GET  
**Summary:** Event Search  
**Description:** Find events and filter your search by location, date, availability, and much more.  
**Endpoint:** `/discovery/v2/events`

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | Filter entities by its id | String | | No |
| keyword | Keyword to search on | String | | No |
| attractionId | Filter by attraction id | String | | No |
| venueId | Filter by venue id | String | | No |
| postalCode | Filter by postal code / zipcode | String | | No |
| latlong | Filter events by latitude and longitude, this filter is deprecated and may be removed in a future release, please use geoPoint instead | String | | No |
| radius | Radius of the area in which we want to search for events | String | | No |
| unit | Unit of the radius | String enum: ["miles", "km"] | miles | No |
| source | Filter entities by its primary source name OR publishing source name | String enum: ["ticketmaster", "universe", "frontgate", "tmr"] | | No |
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | en | No |
| marketId | Filter by market id | String | | No |
| startDateTime | Filter with a start date after this date | String | | No |
| endDateTime | Filter with a start date before this date | String | | No |
| includeTBA | Yes, to include with date to be announced (TBA) | String enum: ["yes", "no", "only"] | no if date parameter sent, yes otherwise | No |
| includeTBD | Yes, to include with a date to be defined (TBD) | String enum: ["yes", "no", "only"] | no if date parameter sent, yes otherwise | No |
| includeTest | Yes if you want to have entities flagged as test in the response. Only, if you only wanted test entities | String enum: ["yes", "no", "only"] | no | No |
| size | Page size of the response | String | 20 | No |
| page | Page number | String | 0 | No |
| sort | Sorting order of the search result. Allowable values: 'name,asc', 'name,desc', 'date,asc', 'date,desc', 'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 'venueName,asc', 'venueName,desc', 'random' | String | relevance,desc | No |
| onsaleStartDateTime | Filter with onsale start date after this date | String | | No |
| onsaleEndDateTime | Filter with onsale end date before this date | String | | No |
| city | Filter by city | Array | | No |
| countryCode | Filter by country code | String | | No |
| stateCode | Filter by state code | String | | No |
| classificationName | Filter by classification name: name of any segment, genre, sub-genre, type, sub-type. Negative filtering is supported by using the following format '-'. Be aware that negative filters may cause decreased performance | Array | | No |
| classificationId | Filter by classification id: id of any segment, genre, sub-genre, type, sub-type. Negative filtering is supported by using the following format '-'. Be aware that negative filters may cause decreased performance | Array | | No |
| dmaId | Filter by dma id | String | | No |
| localStartDateTime | Filter with event local start date time within this range | Array | | No |
| localStartEndDateTime | Filter event where event local start and end date overlap this range | Array | | No |
| startEndDateTime | Filter event where event start and end date overlap this range | Array | | No |
| publicVisibilityStartDateTime | Filter with events with public visibility starting | Array | | No |
| preSaleDateTime | Filter events with a presaleFilterTransformer start and end that intersects with this range | Array | | No |
| onsaleOnStartDate | Filter with onsale start date on this date | String | | No |
| onsaleOnAfterStartDate | Filter with onsale range within this date | String | | No |
| collectionId | Filter by collection id | Array | | No |
| segmentId | Filter by segment id | Array | | No |
| segmentName | Filter by segment name | Array | | No |
| includeFamily | Filter by classification that are family-friendly | String enum: ["yes", "no", "only"] | yes | No |
| promoterId | Filter by promoter id | String | | No |
| genreId | Filter by genreId | Array | | No |
| subGenreId | Filter by subGenreId | Array | | No |
| typeId | Filter by typeId | Array | | No |
| subTypeId | Filter by subTypeId | Array | | No |
| geoPoint | Filter events by geoHash | String | | No |
| preferredCountry | Popularity boost by country, default is us | String enum: ["us", "ca"] | us | No |
| includeSpellcheck | Yes, to include spell check suggestions in the response | String enum: ["yes", "no"] | no | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `page` (object) - Information about current page in data source

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/events.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6&size=1 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Event Details
**Method:** GET  
**Summary:** Get Event Details  
**Description:** Get details for a specific event using the unique identifier for the event. This includes the venue and location, the attraction(s), and the Ticketmaster Website URL for purchasing tickets for the event.  
**Endpoint:** `/discovery/v2/events/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the event | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `type` (string) - Type of the entity
  - `distance` (number) - Double
  - `units` (string) - No description specified
  - `location` (object) - No description specified
  - `id` (string) - Unique id of the entity in the discovery API
  - `locale` (string) - Locale in which the content is returned
  - `name` (string) - Name of the entity
  - `description` (string) - Description of the entity
  - `additionalInfo` (string) - Additional information of the entity
  - `url` (string) - URL of a web site detail page of the entity
  - `images` (array) - Images of the entity
  - `dates` (object) - Event's dates information
  - `sales` (object) - Event's sales dates information
  - `info` (string) - Any information related to the event
  - `pleaseNote` (string) - Any notes related to the event
  - `priceRanges` (array) - Price ranges of this event
  - `promoter` (object) - Event's promoter
  - `promoters` (array) - Event's promoters
  - `outlets` (array) - Related outlets information
  - `productType` (string) - Product type
  - `products` (array) - Related products information
  - `seatmap` (object) - Event's seatmap
  - `accessibility` (object) - Additional information for people who experience disabilities
  - `ticketLimit` (object) - Ticket limit
  - `classifications` (array) - Event's classifications
  - `place` (object) - Place has the information on where the event happens. It can be set if there is no venue
  - `externalLinks` (object) - List of external links
  - `test` (boolean) - Indicate if this is a test entity, by default test entities won't appear in discovery API
  - `aliases` (array) - List of aliases for entity
  - `localizedAliases` (object) - List of localized aliases for entity

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/events/G5diZfkn0B-bh.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Event Images
**Method:** GET  
**Summary:** Get Event Images  
**Description:** Get images for a specific event using the unique identifier for the event.  
**Endpoint:** `/discovery/v2/events/{id}/images`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the event | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `type` (string) - Type of the entity
  - `id` (string) - Unique id of the entity in the discovery API
  - `images` (array) - Images of the entity

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/events/0B004F0401BD55E5/images.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

### Venue Search
**Method:** GET  
**Summary:** Venue Search  
**Description:** Find venues and filter your search by name, and much more.  
**Endpoint:** `/discovery/v2/venues`

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | Filter entities by its id | String | | No |
| keyword | Keyword to search on | String | | No |
| latlong | Filter events by latitude and longitude, this filter is deprecated and may be removed in a future release, please use geoPoint instead | String | | No |
| radius | Radius of the area in which we want to search for events | String | | No |
| unit | Unit of the radius | String enum: ["miles", "km"] | miles | No |
| source | Filter entities by its primary source name OR publishing source name | String enum: ["ticketmaster", "universe", "frontgate", "tmr"] | | No |
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | en | No |
| includeTest | Yes if you want to have entities flagged as test in the response. Only, if you only wanted test entities | String enum: ["yes", "no", "only"] | no | No |
| size | Page size of the response | String | 20 | No |
| page | Page number | String | 0 | No |
| sort | Sorting order of the search result. Allowable Values: 'name,asc', 'name,desc', 'relevance,asc', 'relevance,desc', 'distance,asc', 'distance,desc', 'random' | String | relevance,desc | No |
| countryCode | Filter venues by country code | String | | No |
| stateCode | Filter venues by state / province code | String | | No |
| geoPoint | Filter events by geoHash | String | | No |
| preferredCountry | Popularity boost by country, default is us | String enum: ["us", "ca"] | us | No |
| includeSpellcheck | Yes, to include spell check suggestions in the response | String enum: ["yes", "no"] | no | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `_embedded` (object) - Container
  - `page` (object) - Information about current page in data source

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/venues.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6&keyword=UCV HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: http://app.ticketmaster.com
Connection: Keep-Alive
```

### Get Venue Details
**Method:** GET  
**Summary:** Get Venue Details  
**Description:** Get details for a specific venue using the unique identifier for the venue.  
**Endpoint:** `/discovery/v2/venues/{id}`

#### URL Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| id | ID of the venue | String | | Yes |

#### Query Parameters
| Parameter | Description | Type | Default Value | Required |
|-----------|-------------|------|---------------|----------|
| locale | The locale in ISO code format. Multiple comma-separated values can be provided. When omitting the country part of the code (e.g. only 'en' or 'fr') then the first matching locale is used. When using a '*' it matches all locales. '*' can only be used at the end (e.g. 'en-us,en,*') | String | * | No |
| domain | Filter entities based on domains they are available on | Array | | No |

#### Response Structure
- **200**: Successful operation
  - `_links` (object) - Links to data sets
  - `type` (string) - Type of the entity
  - `distance` (number) - Double
  - `units` (string) - No description specified
  - `id` (string) - Unique id of the entity in the discovery API
  - `locale` (string) - Locale in which the content is returned
  - `name` (string) - Name of the entity
  - `description` (string) - Description of the entity
  - `address` (object) - Address of the venue
  - `city` (object) - City of the venue
  - `additionalInfo` (string) - Additional information of the entity
  - `state` (object) - State / Province of the venue
  - `country` (object) - Country of the venue
  - `url` (string) - URL of a web site detail page of the entity
  - `postalCode` (string) - Postal code / zipcode of the venue
  - `location` (object) - Location of the venue
  - `timezone` (string) - Timezone of the venue
  - `currency` (string) - Default currency of ticket prices for events in this venue
  - `markets` (array) - Markets of the venue
  - `images` (array) - Images of the entity
  - `dma` (array) - The list of associated DMAs (Designated Market Areas) of the venue
  - `social` (object) - Social networks data
  - `boxOfficeInfo` (object) - Box office information for the venue
  - `parkingDetail` (string) - Venue parking info
  - `accessibleSeatingDetail` (string) - Venue accessible seating detail
  - `generalInfo` (object) - General information on the venue
  - `externalLinks` (object) - List of external links
  - `test` (boolean) - Indicate if this is a test entity, by default test entities won't appear in discovery API
  - `aliases` (array) - List of aliases for entity
  - `localizedAliases` (object) - List of localized aliases for entity
  - `upcomingEvents` (object) - Number of upcoming events
  - `ada` (object) - ADA information

#### JavaScript Example
```javascript
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6",
  async: true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
```

#### Example Request/Response
```
GET /discovery/v2/venues/KovZpZAFnIEA.json?apikey=3LIQqAGUtZG3xcYUHXMrvVQ3CXb9GWO6 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
```

## Supported Country Codes
These are the ISO Alpha-2 Code country values:

- US (United States Of America)
- AD (Andorra)
- AI (Anguilla)
- AR (Argentina)
- AU (Australia)
- AT (Austria)
- AZ (Azerbaijan)
- BS (Bahamas)
- BH (Bahrain)
- BB (Barbados)
- BE (Belgium)
- BM (Bermuda)
- BR (Brazil)
- BG (Bulgaria)
- CA (Canada)
- CL (Chile)
- CN (China)
- CO (Colombia)
- CR (Costa Rica)
- HR (Croatia)
- CY (Cyprus)
- CZ (Czech Republic)
- DK (Denmark)
- DO (Dominican Republic)
- EC (Ecuador)
- EE (Estonia)
- FO (Faroe Islands)
- FI (Finland)
- FR (France)
- GE (Georgia)
- DE (Germany)
- GH (Ghana)
- GI (Gibraltar)
- GB (Great Britain)
- GR (Greece)
- HK (Hong Kong)
- HU (Hungary)
- IS (Iceland)
- IN (India)
- IE (Ireland)
- IL (Israel)
- IT (Italy)
- JM (Jamaica)
- JP (Japan)
- KR (Korea, Republic of)
- LV (Latvia)
- LB (Lebanon)
- LT (Lithuania)
- LU (Luxembourg)
- MY (Malaysia)
- MT (Malta)
- MX (Mexico)
- MC (Monaco)
- ME (Montenegro)
- MA (Morocco)
- NL (Netherlands)
- AN (Netherlands Antilles)
- NZ (New Zealand)
- ND (Northern Ireland)
- NO (Norway)
- PE (Peru)
- PL (Poland)
- PT (Portugal)
- RO (Romania)
- RU (Russian Federation)
- LC (Saint Lucia)
- SA (Saudi Arabia)
- RS (Serbia)
- SG (Singapore)
- SK (Slovakia)
- SI (Slovenia)
- ZA (South Africa)
- ES (Spain)
- SE (Sweden)
- CH (Switzerland)
- TW (Taiwan)
- TH (Thailand)
- TT (Trinidad and Tobago)
- TR (Turkey)
- UA (Ukraine)
- AE (United Arab Emirates)
- UY (Uruguay)
- VE (Venezuela)

## Supported Markets
Markets can be used to filter events by larger regional demographic groupings. Each market is typically comprised of several DMAs.

### USA
| ID | Market |
|----|--------|
| 1 | Birmingham & More |
| 2 | Charlotte |
| 3 | Chicagoland & Northern IL |
| 4 | Cincinnati & Dayton |
| 5 | Dallas - Fort Worth & More |
| 6 | Denver & More |
| 7 | Detroit, Toledo & More |
| 8 | El Paso & New Mexico |
| 9 | Grand Rapids & More |
| 10 | Greater Atlanta Area |
| 11 | Greater Boston Area |
| 12 | Cleveland, Youngstown & More |
| 13 | Greater Columbus Area |
| 14 | Greater Las Vegas Area |
| 15 | Greater Miami Area |
| 16 | Minneapolis/St. Paul & More |
| 17 | Greater Orlando Area |
| 18 | Greater Philadelphia Area |
| 19 | Greater Pittsburgh Area |
| 20 | Greater San Diego Area |
| 21 | Greater Tampa Area |
| 22 | Houston & More |
| 23 | Indianapolis & More |
| 24 | Iowa |
| 25 | Jacksonville & More |
| 26 | Kansas City & More |
| 27 | Greater Los Angeles Area |
| 28 | Louisville & Lexington |
| 29 | Memphis, Little Rock & More |
| 30 | Milwaukee & WI |
| 31 | Nashville, Knoxville & More |
| 33 | New England |
| 34 | New Orleans & More |
| 35 | New York/Tri-State Area |
| 36 | Phoenix & Tucson |
| 37 | Portland & More |
| 38 | Raleigh & Durham |
| 39 | Saint Louis & More |
| 40 | San Antonio & Austin |
| 41 | N. California/N. Nevada |
| 42 | Greater Seattle Area |
| 43 | North & South Dakota |
| 44 | Upstate New York |
| 45 | Utah & Montana |
| 46 | Virginia |
| 47 | Washington, DC and Maryland |
| 48 | West Virginia |
| 49 | Hawaii |
| 50 | Alaska |
| 52 | Nebraska |
| 53 | Springfield |
| 54 | Central Illinois |
| 55 | Northern New Jersey |
| 121 | South Carolina |
| 122 | South Texas |
| 123 | Beaumont |
| 124 | Connecticut |
| 125 | Oklahoma |

### Canada
| ID | Market |
|----|--------|
| 102 | Toronto, Hamilton & Area |
| 103 | Ottawa & Eastern Ontario |
| 106 | Manitoba |
| 107 | Edmonton & Northern Alberta |
| 108 | Calgary & Southern Alberta |
| 110 | B.C. Interior |
| 111 | Vancouver & Area |
| 112 | Saskatchewan |
| 120 | Montréal & Area |

### Europe
| ID | Market |
|----|--------|
| 202 | London (UK) |
| 203 | South (UK) |
| 204 | Midlands and Central (UK) |
| 205 | Wales and North West (UK) |
| 206 | North and North East (UK) |
| 207 | Scotland |
| 208 | Ireland |
| 209 | Northern Ireland |
| 210 | Germany |
| 211 | Netherlands |
| 500 | Sweden |
| 501 | Spain |
| 502 | Barcelona (Spain) |
| 503 | Madrid (Spain) |
| 600 | Turkey |

### Australia and New Zealand
| ID | Market |
|----|--------|
| 302 | New South Wales/Australian Capital Territory |
| 303 | Queensland |
| 304 | Western Australia |
| 305 | Victoria/Tasmania |
| 306 | Western Australia |
| 351 | North Island |
| 352 | South Island |

### Mexico
| ID | Market |
|----|--------|
| 402 | Mexico City and Metropolitan Area |
| 403 | Monterrey |
| 404 | Guadalajara |

## Supported Sources
- ticketmaster
- tmr (ticketmaster resale platform)
- universe
- frontgate

## Supported Locales
We support all languages, without any fallback.

## Supported Designated Market Area (DMA)
Designated Market Area (DMA) can be used to segment and target events to a specific audience. Each DMA groups several zipcodes into a specific market segmentation based on population demographics.

| DMA ID | DMA Name |
|--------|----------|
| 200 | All of US |
| 212 | Abilene - Sweetwater |
| 213 | Albany - Schenectady - Troy |
| 214 | Albany, GA |
| 215 | Albuquerque - Santa Fe |
| 216 | Alexandria, LA |
| 217 | Alpena |
| 218 | Amarillo |
| 219 | Anchorage |
| 220 | Atlanta |
| 221 | Augusta |
| 222 | Austin |
| 223 | Bakersfield |
| 224 | Baltimore |
| 225 | Bangor |
| 226 | Baton Rouge |
| 227 | Beaumont - Port Arthur |
| 228 | Bend, OR |
| 229 | Billings |
| 230 | Biloxi - Gulfport |
| 231 | Binghamton |
| 232 | Birmingham (Anniston and Tuscaloosa) |
| 233 | Bluefield - Beckley - Oak Hill |
| 234 | Boise |
| 235 | Boston (Manchester) |
| 236 | Bowling Green |
| 237 | Buffalo |
| 238 | Burlington - Plattsburgh |
| 239 | Butte - Bozeman |
| 240 | Casper - Riverton |
| 241 | Cedar Rapids - Waterloo & Dubuque |
| 242 | Champaign & Springfield - Decatur |
| 243 | Charleston, SC |
| 244 | Charleston-Huntington |
| 245 | Charlotte |
| 246 | Charlottesville |
| 247 | Chattanooga |
| 248 | Cheyenne - Scottsbluff |
| 249 | Chicago |
| 250 | Chico - Redding |
| 251 | Cincinnati |
| 252 | Clarksburg - Weston |
| 253 | Cleveland |
| 254 | Colorado Springs - Pueblo |
| 255 | Columbia - Jefferson City |
| 256 | Columbia, SC |
| 257 | Columbus - Tupelo - West Point |
| 258 | Columbus, GA |
| 259 | Columbus, OH |
| 260 | Corpus Christi |
| 261 | Dallas - Fort Worth |
| 262 | Davenport - Rock Island - Moline |
| 263 | Dayton |
| 264 | Denver |
| 265 | Des Moines - Ames |
| 266 | Detroit |
| 267 | Dothan |
| 268 | Duluth - Superior |
| 269 | El Paso |
| 270 | Elmira |
| 271 | Erie |
| 272 | Eugene |
| 273 | Eureka |
| 274 | Evansville |
| 275 | Fairbanks |
| 276 | Fargo - Valley City |
| 277 | Flint - Saginaw - Bay City |
| 278 | Florence - Myrtle Beach |
| 279 | Fort Myers - Naples |
| 280 | Fort Smith - Fayetteville - Springdale - Rogers |
| 281 | Fort Wayne |
| 282 | Fresno - Visalia |
| 283 | Gainesville |
| 284 | Glendive |
| 285 | Grand Junction - Montrose |
| 286 | Grand Rapids - Kalamazoo - Battle Creek |
| 287 | Great Falls |
| 288 | Green Bay - Appleton |
| 289 | Greensboro - High Point - Winston-Salem |
| 290 | Greenville - New Bern - Washington |
| 291 | Greenville - Spartansburg - Asheville - Anderson |
| 292 | Greenwood - Greenville |
| 293 | Harlingen - Weslaco - Brownsville - McAllen |
| 294 | Harrisburg - Lancaster - Lebanon - York |
| 295 | Harrisonburg |
| 296 | Hartford & New Haven |
| 297 | Hattiesburg - Laurel |
| 298 | Helena |
| 299 | Honolulu |
| 300 | Houston |
| 301 | Huntsville - Decatur (Florence) |
| 302 | Idaho Falls - Pocatello |
| 303 | Indianapolis |
| 304 | Jackson, MS |
| 305 | Jackson, TN |
| 306 | Jacksonville |
| 307 | Johnstown - Altoona |
| 308 | Jonesboro |
| 309 | Joplin - Pittsburg |
| 310 | Juneau |
| 311 | Kansas City |
| 312 | Knoxville |
| 313 | La Crosse - Eau Claire |
| 314 | Lafayette, IN |
| 315 | Lafayette, LA |
| 316 | Lake Charles |
| 317 | Lansing |
| 318 | Laredo |
| 319 | Las Vegas |
| 320 | Lexington |
| 321 | Lima |
| 322 | Lincoln & Hastings - Kearney |
| 323 | Little Rock - Pine Bluff |
| 324 | Los Angeles |
| 325 | Louisville |
| 326 | Lubbock |
| 327 | Macon |
| 328 | Madison |
| 329 | Mankato |
| 330 | Marquette |
| 331 | Medford - Klamath Falls |
| 332 | Memphis |
| 333 | Meridian |
| 334 | Miami - Fort Lauderdale |
| 335 | Milwaukee |
| 336 | Minneapolis - Saint Paul |
| 337 | Minot - Bismarck - Dickinson |
| 338 | Missoula |
| 339 | Mobile - Pensacola (Fort Walton Beach) |
| 340 | Monroe - El Dorado |
| 341 | Monterey - Salinas |
| 342 | Montgomery (Selma) |
| 343 | Nashville |
| 344 | New Orleans |
| 345 | New York |
| 346 | Norfolk - Portsmouth - Newport News |
| 347 | North Platte |
| 348 | Odessa - Midland |
| 349 | Oklahoma City |
| 350 | Omaha |
| 351 | Orlando - Daytona Beach - Melbourne |
| 352 | Ottumwa - Kirksville |
| 353 | Paducah - Cape Girardeau - Harrisburg - Mt Vernon |
| 354 | Palm Springs |
| 355 | Panama City |
| 356 | Parkersburg |
| 357 | Peoria - Bloomington |
| 358 | Philadelphia |
| 359 | Phoenix |
| 360 | Pittsburgh |
| 361 | Portland - Auburn |
| 362 | Portland, OR |
| 363 | Presque Isle |
| 364 | Providence - New Bedford |
| 365 | Quincy - Hannibal - Keokuk |
| 366 | Raleigh - Durham (Fayetteville) |
| 367 | Rapid City |
| 368 | Reno |
| 369 | Richmond - Petersburg |
| 370 | Roanoke - Lynchburg |
| 371 | Rochester - Mason City - Austin |
| 372 | Rochester, NY |
| 373 | Rockford |
| 374 | Sacramento - Stockton - Modesto |
| 375 | Saint Joseph |
| 376 | Saint Louis |
| 377 | Salisbury |
| 378 | Salt Lake City |
| 379 | San Angelo |
| 380 | San Antonio |
| 381 | San Diego |
| 382 | San Francisco - Oakland - San Jose |
| 383 | Santa Barbara - Santa Maria - San Luis Obispo |
| 384 | Savannah |
| 385 | Seattle - Tacoma |
| 386 | Sherman - Ada |
| 387 | Shreveport |
| 388 | Sioux City |
| 389 | Sioux Falls (Mitchell) |
| 390 | South Bend - Elkhart |
| 391 | Spokane |
| 392 | Springfield - Holyoke |
| 393 | Springfield, MO |
| 394 | Syracuse |
| 395 | Tallahassee - Thomasville |
| 396 | Tampa - Saint Petersburg (Sarasota) |
| 397 | Terre Haute |
| 398 | Toledo |
| 399 | Topeka |
| 400 | Traverse City - Cadillac |
| 401 | Tri-Cities, TN-VA |
| 402 | Tucson (Sierra Vista) |
| 403 | Tulsa |
| 404 | Twin Falls |
| 405 | Tyler - Longview (Lufkin & Nacogdoches) |
| 406 | Utica |
| 407 | Victoria |
| 408 | Waco - Temple - Bryan |
| 409 | Washington DC (Hagerstown) |
| 410 | Watertown |
| 411 | Wausau - Rhinelander |
| 412 | West Palm Beach - Fort Pierce |
| 413 | Wheeling - Steubenville |
| 414 | Wichita - Hutchinson |
| 415 | Wichita Falls & Lawton |
| 416 | Wilkes Barre - Scranton |
| 417 | Wilmington |
| 418 | Yakima - Pasco - Richland - Kennewick |
| 419 | Youngstown |
| 420 | Yuma - El Centro |
| 421 | Zanesville |
| 422 | Northern New Jersey |
| 500 | All of Canada |
| 501 | Barrie-Orillia |
| 502 | Belleville-Peterborough |
| 503 | Owen Sound |
| 504 | Burnaby-New Westminster-Surrey |
| 505 | Calgary-Banff |
| 506 | Edmonton |
| 507 | Fraser Valley |
| 508 | Hamilton-Niagara |
| 509 | Kitchener-Waterloo |
| 510 | London-Sarnia |
| 511 | Mississauga-Oakville |
| 512 | Newfoundland |
| 513 | NWT |
| 514 | New Brunswick |
| 515 | Northern Ontario |
| 516 | Nova Scotia |
| 517 | Nunavit |
| 518 | Okanagan-Kootenays |
| 519 | Ottawa-Gatineau |
| 520 | PEI |
| 521 | Prince George-North |
| 522 | Montreal and Surrounding Area |
| 523 | Red Deer |
| 524 | Saskatchewan |
| 527 | Toronto |
| 528 | Vancouver |
| 529 | Sunshine Coast-Islands |
| 530 | Winnipeg-Brandon |
| 531 | Yukon |
| 601 | All of United Kingdom |
| 602 | London |
| 603 | South |
| 604 | Midlands and Central |
| 605 | Wales and North West |
| 606 | North and North East |
| 607 | Scotland |
| 608 | All of Ireland |
| 609 | Northern Ireland |
| 610 | Germany |
| 611 | Netherlands |
| 612 | Sweden |
| 613 | Turkey |
| 701 | All of Australia |
| 702 | New South Wales/Australian Capital Territory |
| 703 | Queensland |
| 704 | Western Australia |
| 705 | Victoria/Tasmania |
| 750 | All of New Zealand |
| 751 | North Island |
| 752 | South Island |
| 801 | All of Mexico |
| 802 | Mexico City and Metropolitan Area |
| 803 | Monterrey |
| 804 | Guadalajara |
| 901 | All of Spain |
| 902 | Barcelona |
| 903 | Madrid |