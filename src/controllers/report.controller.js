const fs = require("fs");
const path = require("path");
const Report = require("../models/Report.model");

exports.createReport = async (req, res, next) => {
  try {
    const images =
      req.files?.map(file => {
        return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
      }) || [];

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

exports.getSingleReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    res.json({
      success: true,
      report
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    // 🧹 Delete images from uploads folder
    if (report.reportImages?.length) {
      report.reportImages.forEach(imageUrl => {
        const imagePath = imageUrl.split("/uploads/")[1];

        if (imagePath) {
          const fullPath = path.join(
            process.cwd(),
            "uploads",
            imagePath
          );

          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      });
    }

    await report.deleteOne();

    res.json({
      success: true,
      message: "Report deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};
