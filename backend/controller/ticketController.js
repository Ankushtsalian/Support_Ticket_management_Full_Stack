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

//@desc     GET  user ticket
//@route  GET  /api/tickets/:id
//@access   private
//single ticket

const getTicket = asyncHandler(async (req, res) => {
  //Get user using id and JWT
  const user = await User.findById(req.user.id);

  //Check if user exist
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //if exist find single userId using params :id in Ticket
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  console.log("ticket.user.toString : " + ticket.user.toString());
  console.log(" req.user.id : " + req.user.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not found");
  }

  res.status(200).json(ticket);
});

//@desc     create new  tickets
//@route    /api/tickets
//@access   private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);

  //Check if user exist
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket, getTicket };
