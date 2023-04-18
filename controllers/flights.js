import { Flight } from "../models/flight.js"

import { Meal } from "../models/meal.js"


function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
    flights: flights,
    title: 'All Flights'
  })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${movie._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Details',
      meals: meals,
    })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndRemove(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
    Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
    })
}

function createTicket(req, res) {
  console.log("This works");
  console.log(req.body);
  console.log(req.params);
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function addToMeal(req, res) {
  console.log("This works");
}


export {
  newFlight as new,
  index,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal,
}










