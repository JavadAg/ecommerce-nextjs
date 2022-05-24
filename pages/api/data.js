import data from "../../db.json"

export default function handler(req, res) {
  if (Object.keys(req.query).length !== 0) {
    const queryData = data.products.filter((item) => item.id == req.query.id)
    res.status(200).json(queryData)
  } else {
    res.status(200).json(data)
  }
}
