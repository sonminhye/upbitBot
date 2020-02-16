const mongoose = require('mongoose');

// Define schemes
const tickerSchema = new mongoose.Schema({
    market: {type: String, required:true},
    close_price : {type:Number, required:true}
});

tickerSchema.statics.create = function(payload){
    const ticker = new this(payload);
    return ticker.save();
};

tickerSchema.statics.findAll = function() {
    return this.find({});
};

// Find One by market
tickerSchema.statics.findOneByTodoid = function (market) {
  return this.findOne({ market });
};

// Update by market
tickerSchema.statics.updateByTodoid = function (todoid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ market }, payload, { new: true });
};

// Delete by market
tickerSchema.statics.deleteByTodoid = function (market) {
  return this.remove({ market });
};


module.exports = mongoose.model('Ticker', todoSchema);
