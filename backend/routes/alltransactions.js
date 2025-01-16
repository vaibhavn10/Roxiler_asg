const express = require("express");
const router = express.Router();
const dbSchema = require("../models/Data");

router.get("/initialize", async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const jsonData = await response.json();

    await dbSchema.insertMany(jsonData);
    dbSchema.createIndexes({ title: "text", description: "text" });

    res.status(200).json({ msg: "Database initialized with seed data." });
  } catch (error) {
    console.error({ error: error, msg: "Error while initializing." });
    res.json({ error: error, msg: "Error while initializing." });
  }
});

router.get("/alltransactions", async function (req, res) {
  const { page, limit, search, month } = req.query;
  let data = await dbSchema.find();
  if (search) {
    data = await dbSchema.find({ $text: { $search: search } });
    data = data.sort((a, b) => a.id - b.id);
  }

  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const monthNo = monthMap[month];
  if (month) {
    data = data.filter((item) => {
      const saleDate = new Date(item.dateOfSale);
      return saleDate.getMonth() === monthNo;
    });
  }

  if (!page && !limit) {
    return res.json(data);
  }
  data = data.slice((page - 1) * limit, page * limit);
  if (data.length == 0) {
    return res.json({
      msg: "No data found.",
      desc: "There is no data fetched or not present in the db.",
    });
  }
  res.json(data);
});

router.post("/stats", async function (req, res) {
  try {
    const { month } = req.body;
    if (!month) {
      return res.json({
        status: false,
        msg: "No month found.",
        desc: "There is no data fetched or not present in the db.",
      });
    }
    let data = await dbSchema.find();
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    const monthNo = monthMap[month];
    let response = { total_sale: 0, total_sold: 0, total_not_sold: 0 };
    if (month) {
      data = data.filter((item) => {
        const saleDate = new Date(item.dateOfSale);
        return saleDate.getMonth() === monthNo;
      });
    }
    response.total_sale = data.length;
    data.map((item) => {
      if (item?.sold) {
        response = { ...response, total_sold: response.total_sold + 1 };
      } else {
        response = { ...response, total_not_sold: response.total_not_sold + 1 };
      }
    });

    res.json(response);
  } catch (error) {
    return res.status(401).json({
      status: false,
      msg: error.message,
    });
  }
});

router.get("/barchart", async function (req, res) {
  const { month } = req.query;

  try {
    const monthNumber = new Date(`${month} 1, 2000`).getMonth(); // Convert month to a number (0-11)
    const query = {
      dateOfSale: {
        $gte: new Date(2000, monthNumber, 1),
        $lt: new Date(2000, monthNumber + 1, 1),
      },
    };

    // Define price ranges
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await ProductTransaction.countDocuments({
          ...query,
          price: { $gte: range.min, $lt: range.max },
        });
        return { range: range.range, count };
      })
    );

    res.status(200).json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching bar chart data." });
  }
});

// export default router;
module.exports = router;
