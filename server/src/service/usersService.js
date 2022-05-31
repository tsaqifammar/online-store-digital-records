const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");
const DBPool = require("../utils/DBPool");
const cacheService = require('./cacheService');




class usersService {
	constructor() {
		this._token = new cacheService();
		this._pool = DBPool.get();
	}

	async registerUser({ username, password, nama, role }) {
		const id = `user-${nanoid(16)}`;
		const hashedPassword = await bcrypt.hash(password, 10);

		const query = {
			text: "INSERT INTO akun VALUES($1, $2, $3, $4, $5) RETURNING *",
			values: [id, username, hashedPassword, nama, role]
		};

		const result = await this._pool.query(query);

		const [data] = result.rows;
		delete data.password;

		return data;
	}

	async deleteUser({ id }) {
		const query = {
			text: "DELETE FROM akun WHERE id_akun=$1 RETURNING id_akun",
			values: [id]
		};

		const result = await this._pool.query(query);
		if (!result.rows.length) {
			throw new ErrorResponse("ID tidak ditemukan", 404);
		}
	}

	async loginUser({ username, password }) {
		if (!username || !password) {
			throw new ErrorResponse("Username atau password kosong", 400);
		}

		const query = {
			text: "SELECT * from akun  where username=$1",
			values: [username]
		};
		const result = await this._pool.query(query);

		if (result.rows < 1) {
			throw new ErrorResponse("Username tidak ditemukan", 404);
		}

		const [data] = result.rows;
		const isMatch = await bcrypt.compare(password, data.password);
		delete data.password;

		if (!isMatch) {
			throw new ErrorResponse("Invalid credential", 401);
		}

		data.token = await jwt.sign({ id_akun: data.id_akun }, process.env.JWT_SECRET_KEY);
		await this._token.set(data.token, "true", 20*60 );

		return data;
	}

	async logoutUser({ authorization }) {
		this._token.delete(authorization.split(" ")[1]);
	}

	async getUsers() {
		const query = {
			text: "SELECT id_akun,username,nama,role from akun "
		};
		const result = await this._pool.query(query);

		return result.rows;
	}
}

module.exports = usersService;