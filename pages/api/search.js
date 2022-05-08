import data from "./db.json"

export default (req, res) => {
  const results = req.query.q
    ? data.filter((post) =>
        post.name.toLowerCase().includes(req.query.q.toLowerCase())
      )
    : []

  res.status(200).json(results)
}
