import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {
    type: String, 
    match: /[A-F][1-9]\d?/},
  price: {
    type: Number, min: 0,
  }
})

const flightSchema = new Schema ({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']},
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    required: {
      min: 10,
      max: 9999
    }
  },
  departs: {
    type: Date,
    default: function() {
      let today = new Date()
      let oneYearFromToday = new Date(today.getTime())
      oneYearFromToday.setFullYear(today.getFullYear() + 1)
      return oneYearFromToday
    }
  },
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}