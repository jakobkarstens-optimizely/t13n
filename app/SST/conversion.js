
module.exports = {
	check: function(req, res) {
		return res.status(200).send({message: "hello"});
	}
}