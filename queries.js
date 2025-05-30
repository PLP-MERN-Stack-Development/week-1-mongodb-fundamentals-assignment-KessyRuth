// Basic CRUD Operations
db.books.find({ genre: 'Dystopian' })

db.books.find({ published_year: { $gt: 1932 } })

db.books.find({ author: "Jane Austen" })

db.books.updateOne({_id: ObjectId("683912821e3ed4563913c52f")}, {$set: {price: 7.88}})

db.books.deleteOne({ title: 'Pride and Prejudice' })

// Advanced Queries
db.books.find({ in_stock: true, published_year: {$gt: 2010} })

db.books.find({genre: "Fantasy"}, {title: 1, author: 1, price: 1})

db.books.find().sort({price: 1})

db.books.find().sort({price: -1})

let page = 2;
let limit = 5;
let skip = (page - 1) * limit;

db.books.find().skip(skip).limit(limit).pretty();

// Aggregation Pipeline
db.books.aggregate({ $group: {_id: "$genre", avgPrice: {$avg: "$price"}}})

db.books.aggregate([
    { 
      $group: { 
        _id: "$author", 
        totalBooks: { $sum: 1 } 
      } 
    },
    { 
      $sort: { totalBooks: -1 } 
    },
    { 
      $limit: 1 
    }
  ])

  db.books.aggregate([
    {
      $project: {
        decade: {
          $multiply: [
            { $floor: { $divide: ["$published_year", 10] } },
            10
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",
        bookCount: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } // Sort decades in ascending order
    }
  ])
   
// Indexing
db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: 1 });

db.books.find({ title: "Harper Lee" }).explain("executionStats");
