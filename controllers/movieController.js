const {movies} = require("../models");

module.exports = {
    movieList : async (req, res) => {
        try {
            const movie = await movies.findAll();
            res.status(200).json({ movie });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    },
    movieDetail : async (req, res) => {
        const { id } = req.params;
        try {
            const movie = await movies.findOne({ where: { id } });
            if (!movie) {
                return res.status(404).json({ message: "Movie Not Found!" });
            }
            res.status(200).json({ movie });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
};