// mongo-init.js
db = db.getSiblingDB("webfinal");

// 建集合（可選）
db.createCollection("users");
db.users.createIndex({ email: 1 }, { unique: true });

db.createCollection("meals");
db.meals.createIndex({ userId: 1 });
db.meals.createIndex({ eatenAt: -1 });
