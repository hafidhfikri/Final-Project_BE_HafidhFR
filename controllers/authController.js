const bcrypt = require("bcryptjs");
const {users} = require("../models");
const jwtGen = require("../utils/jwtGenerator");

module.exports = {
    register : async (req, res) => {
        const { name, username, email, password, address, phone_number } = req.body;

        try {
            const user = await users.findOne({ where: { email } });
            if (user) {
                return res.status(401).json({ message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await users.create({
                name,
                username,
                email,
                password: hashedPassword,
                address,
                phone_number
            });

            res.status(201).json({
                 message: "Success Creating New User", 
                 user: {
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
					role: newUser.role,
					address: newUser.address,
					phone_number: newUser.phone_number,
				}
                });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    },
    login : async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await users.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "Email Not Found!" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid Password!" });
            }

            const token = jwtGen(user.id);

            res.status(200).json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
};