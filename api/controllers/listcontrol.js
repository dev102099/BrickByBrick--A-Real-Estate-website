const handleError = require("../middleware/error");
const { Listing } = require("../models/listing.model");

const handleListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    // listing.save()

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const handleUpdateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(handleError(404, "Listing not found."));
  }
  if (req.user.id !== listing.userRef) {
    return next(handleError(401, "Unauthorized update."));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(handleError(404, "Not Found."));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const handleDelList = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(handleError(404, "Listing not found."));
  }
  if (req.user.id !== listing.userRef) {
    return next(handleError(401, "Please delete your own listings."));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted.");
  } catch (error) {
    next(error);
  }
};

const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    const sort = req.query.sort || "createdAt ";
    const order = req.query.order || "desc";
    const searchTerm = req.query.searchTerm || "";
    const listings = await Listing.find({
      name: {
        $regex: searchTerm,
        $options: "i",
      },
      type,
      offer,
      parking,
      furnished,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleListing,
  handleDelList,
  handleUpdateListing,
  getListing,
  getListings,
};
