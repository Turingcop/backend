# MongoDb document API

### Installation
1. Clone this repo and run npm install to install necessary dependencies.
2. Create a .env file containing your atlas username and password like so:
ATLAS_USERNAME="..."
ATLAS_PASSWORD="..."
3. Make sure to configure db/database.js to correctly connect to your database and collection
4. Start the API by running "npm run start", or "npm run watch" to watch for changes during development

### Routes
The following routes are available:

GET /docs will return all documents in the database collection

POST /docs will create a new document from the request body

PUT /docs will update an existing documents title and body in the collection, filtered by ObjectId 
