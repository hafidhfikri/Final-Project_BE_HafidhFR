const {movies, bookmarks, users} = require("../models");
var jwt = require("jsonwebtoken");

module.exports = {
    addBookmark : async (req,res) =>{
        const { idMovie } = req.params;
		const { accesstoken } = req.headers;
		const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
        const { name } = decoded.user;

        try {
            const findMovie = await movies.findByPk(idMovie);

            if (!findMovie) {
                return res.status(404).json({ error: "Not found", message: "Movie Not Found!" });
            }
            
            const findUser = await users.findByPk(name);

            if (!findUser) {
                return res.status(404).json({ error: "Not found", message: "User Not Found!" });
            }

            const newBookmark = await bookmarks.create({
                movieId : idMovie,
                userId: name
            });

            const response = {
                message: "Success Adding Bookmark",
                id: newBookmark.dataValues.id,
                userId: name,
                movieId : idMovie,
                movieTitle : findMovie.dataValues.title
            };

            res.status(201).json({ response });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Bookmark - Server error" });
        }
    },
    showBookmark : async (req,res) =>{
        const { accesstoken } = req.headers;
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
		const { name } = decoded.user;
        try {
            const bookmark = await bookmarks.findAll({
                where: { userId: name},
                include: [{ model: movies }]
            });
            res.status(200).json({ bookmark });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
};