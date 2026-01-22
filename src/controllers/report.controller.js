const Report = require("../models/Report.model");

exports.createReport = async (req, res, next) => {
  try {
    const images = req.files?.map(f => f.path) || [];

    const report = await Report.create({
      ...req.body,
      reportImages: images,
      createdBy: req.user.id
    });

    res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    next(err);
  }
};
