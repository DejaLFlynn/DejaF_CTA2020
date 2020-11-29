const db = require("../../db/index");



const addLike = async (req, res) => {
    try {
        let addedLike = await db.one("INSERT INTO likes (user_id, post_id, likes) VALUES ($1, $2, $3) RETURNING *", req.body);
        res.status(200).json({
            status: "Success",
            message: "New like created",
            payload: addedLike
        })
    } catch (err) {
        res.status(404).json({
            status: err,
            message: "Could not add like",
            payload: null
        })
    }
}

const explorerLikes = async (req, res) => {
    try {
        let topPosts = await db.any("SELECT picture, COUNT(likes.picture_id) AS total_likes FROM pictures JOIN likes ON likes.picture_id = pictures.id GROUP BY picture ORDER BY total_likes DESC LIMIT 10");
        res.status(200).json({
            status: "Success",
            message: "Retrieved top 10 liked Posts",
            payload: topPosts
        })
    } catch (err) {
        res.status(404).json({
            status: err,
            message: "Couldn't find top Posts",
            payload: null
        })
    }
}
const getById = async (req, res, next) => {
	try {
		const postId = req.params.post_id;
		console.log("POST ID", postId);
		let posts = await db.any(
			"SELECT * FROM likes WHERE post_id =$1 ORDER BY id DESC",
			postId
		);
		res.status(200).json({
			status: "ok",
			message: "Retrieve all friends likes",
			payload: posts,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "error",
			payload: "Couldn't retrieve all the likes",
		});
		next();
	}
};




module.exports = { addLike, explorerLikes, getById };
