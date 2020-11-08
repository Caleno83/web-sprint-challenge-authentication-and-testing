const db = require("../database/dbConfig")

// add a user to register
async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}


//find user
function findBy(filter) {
	return db("users")
		// .select("id", "username", "password")
		.where(filter)
}

//find specifci user
function findById(id) {
	return db("users")
		// .select("id", "username", "password")
		.where({ id })
		.first()
}



module.exports = {
    add,
    findBy,
	findById,
}
