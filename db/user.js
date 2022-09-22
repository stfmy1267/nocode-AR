// sqlテスト
// import sqlite3 from 'sqlite3'

// const db = new sqlite3.Database("./db.sqlite");
// sqlite3.cached
// 	db.serialize(() => {
// 	db.each("SELECT * FROM users", (err,row) => {
// 		console.log(`${row.id} ${row.name}`);
// 	});
// 	db.all("select * from users", (err, rows) => {
// 		console.log(JSON.stringify(rows));
// 	});
// 	db.get("select count(*) from users", (err, count) => {
// 		console.log(count["count(*)"]);
//   });
// });

// db.close

export const User = [
	{
		email: "test@gmail.com",
		password:"tanaka893"
	},
]
