const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@desc     GET  user tickets
//@route  GET  /api/tickets
//@access   private

const getTickets = asyncHandler(async (req, res) => {
  //Get user using id and JWT
  const user = await User.findById(req.user.id);

  //Check if user exist
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //if exist find userId in Ticket
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

//@desc     create new  tickets
//@route    /api/tickets
//@access   private

const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createTickets" });
});

module.exports = { getTickets, createTicket };
