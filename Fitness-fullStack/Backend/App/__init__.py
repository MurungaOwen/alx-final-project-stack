from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
import http.client


app = Flask(__name__)
CORS(app) 

app.config.from_mapping(
     SECRET_KEY="Secret_key ",
 
 ) 
# Connect to MongoDB
mongo = MongoClient("mongodb://localhost:27017/")
db = mongo.HealthFitness
users_collection = db['users']
Categories=db.Categories
Fitness_Program=db.Fitness_program



from App import routes



