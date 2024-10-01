from pymongo import MongoClient
from datetime import datetime

uri = "mongodb+srv://renz:zrSx9TiiUz73eW8U@cluster0.i1zg8zf.mongodb.net/test_coords?retryWrites=true&w=majority"

client = MongoClient(uri)

db_name = 'test_coords'
collection_name = 'coords_data'

# check if the database exists
def database_exists(client, db_name):
    return db_name in client.list_database_names()

# check if the collection exists
def collection_exists(db, collection_name):
    return collection_name in db.list_collection_names()

if database_exists(client, db_name):
    print(f"Database '{db_name}' already exists.")
else:
    print(f"Database '{db_name}' does not exist. It will be created.")

db = client[db_name]

# Create the collection if it doesn't exist
if not collection_exists(db, collection_name):
    coords_collection = db[collection_name]
    coords_collection.create_index([('lat', 1)]) 
    coords_collection.create_index([('lng', 1)]) 
    print(f"Collection '{collection_name}' created successfully.")
else:
    coords_collection = db[collection_name]
    print(f"Collection '{collection_name}' already exists.")

# seeder 
def save_coords(notes: str, lat: float, lng: float):
    if not isinstance(lat, (float, int)) or not isinstance(lng, (float, int)):
        raise ValueError("Coordinates must be in decimal degrees format (DD).")
    
    current_time = datetime.now().isoformat()

    coords_doc = {
        "notes": notes,
        "lat": float(lat),  # Ensure latitude is in DD format
        "lng": float(lng),  # Ensure longitude is in DD format
        "created_at": current_time,  
        "updated_at": current_time  
    }

    coords_collection.insert_one(coords_doc)
    print("Coordinates saved successfully:", coords_doc)

try:
    save_coords("Sample coordinate entry", 14.5547, 121.0449)  
except Exception as e:
    print("Error:", e)
