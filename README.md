### test_db ── An Imaginary Journey

![alt ](img/melontaTauta-667x1024.jpg)

### Prologue

### I. Introduction
If you opt to use [NodeJS](https://nodejs.org/en) related technique and [Relational database](https://www.oracle.com/in/database/what-is-a-relational-database/), [prisma](https://www.prisma.io/) seems an obviously choice, if it were not the only choice... 

But [ORM](https://www.freecodecamp.org/news/what-is-an-orm-the-meaning-of-object-relational-mapping-database-tools/) may not be good for: 
1. Loose database schema 
2. Fast schema evolving 
3. System with complex query 
4. Flexible table joining 

In case of 1 and 2, I recommend [MongoDB](https://www.mongodb.com/) and [mongoose](https://mongoosejs.com/), which is a mature [ODM](https://www.dctacademy.com/blog/what-is-object-document-mapper-odm) solely for MongoDB. 

In case of 3 and 4, I recommend not to use ODM at all. Use [MySQL 2](https://www.npmjs.com/package/mysql2), [pg](https://www.npmjs.com/package/pg), [oracledb](https://www.npmjs.com/package/oracledb), [mssql](https://www.npmjs.com/package/mssql) and [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) packages respectively. 


### II. Summary 


### III. Reference
1. [Comparing Prisma and Mongoose for MongoDB: A Comprehensive Analysis
](https://levelup.gitconnected.com/comparing-prisma-and-mongoose-for-mongodb-a-comprehensive-analysis-531c656fc118
)
2. [Employees Sample Database](https://dev.mysql.com/doc/employee/en/)
3. [Prisma cheat sheet](https://github.com/emanuelefavero/prisma)
4. [Laragon](https://laragon.org/index.html)
5. [Mellonta Tauta](https://poemuseum.org/mellonta-tauta/)


### Epilogue 


### EOF (2023/09/18)