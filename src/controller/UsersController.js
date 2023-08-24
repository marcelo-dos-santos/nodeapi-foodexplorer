const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");
const AppError = require("../utils/AppError")
const {hash} = require("bcryptjs");


class UsersController {
    async create(request, response) {
        const { name, email, password, admin } = request.body;

        const database = await sqliteConnection()

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        if(checkUserExists) {
            throw new AppError("Este e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8)

        await database.run("INSERT INTO users (name, email, password, admin) VALUES(?, ?, ?, ?)", [name, email, hashedPassword, admin])

        const responseData = {
            message: "Usuário criado com sucesso!",
            user: {
                name,
                email,
            }
        };

        return response.status(201).json(responseData)
    }

    async delete(req, res) {
        const {user_id} = req.params;

        const checkUserExists = await knex("users").where({id: user_id}).first()
        if(!checkUserExists) {
            throw new AppError("Usuário não existente")
        } else {
            await knex("users").where({id: user_id}).delete()
        }

        res.json({message: "Usuário deletado com sucesso"})
    }
}

module.exports = UsersController;