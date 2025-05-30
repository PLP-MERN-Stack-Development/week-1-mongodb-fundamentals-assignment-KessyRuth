# 📚 MongoDB CRUD & Aggregation Script

This project demonstrates basic and advanced **CRUD operations**, **aggregation**, **indexing**, and **query performance analysis** using MongoDB.

---

## 📁 Prerequisites

Make sure you have the following installed:

- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0+)
- MongoDB Shell (`mongo`) or a GUI like [MongoDB Compass](https://www.mongodb.com/products/compass)
- A `books` collection with relevant documents

---

## 🗂 Collection Structure (Sample Document)

Each book document should follow this structure:

```json
{
  "_id": ObjectId("..."),
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "published_year": 2000,
  "price": 10.99,
  "in_stock": true
}

🚀 Running the Scripts
🔧 Step 1: Start MongoDB
Make sure your MongoDB server is running:


🔧 Step 2: Open Mongo Shell

Then select your database:

use your_database_name

📚 Basic CRUD Operations

// Find books in the Dystopian genre
db.books.find({ genre: 'Dystopian' })

// Find books published after 1932
db.books.find({ published_year: { $gt: 1932 } })

// Find all books by Jane Austen
db.books.find({ author: "Jane Austen" })

// Update the price of a specific book
db.books.updateOne(
  { _id: ObjectId("683912821e3ed4563913c52f") },
  { $set: { price: 7.88 } }
)

// Delete a book by title
db.books.deleteOne({ title: 'Pride and Prejudice' })

📊 Advanced Queries

// Find in-stock books published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Find Fantasy books with specific fields
db.books.find({ genre: "Fantasy" }, { title: 1, author: 1, price: 1 })

// Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// Sort books by price (descending)
db.books.find().sort({ price: -1 })

// Pagination: page 2, 5 books per page
let page = 2;
let limit = 5;
let skip = (page - 1) * limit;
db.books.find().skip(skip).limit(limit).pretty();

🧮 Aggregation Pipeline

// Get average price grouped by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

⚡ Indexing & Query Performance

// Create index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Explain query plan for a title search
db.books.find({ title: "Things Fall Apart" }).explain("executionStats")
📌 Notes
Ensure you have meaningful data in your books collection before running queries.

Replace the ObjectId with one that exists in your data when running the updateOne query.
