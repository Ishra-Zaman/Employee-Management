const express = require("express");
const router = express.Router();
const {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} = require("../controllers/designation");

router.route("/").get(getAllDesignations).post(createDesignation);
router
  .route("/:id")
  .get(getDesignationById)
  .put(updateDesignation)
  .delete(deleteDesignation);

module.exports = router;
