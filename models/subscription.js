// models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  keys: {
    type: Object,
    required: true,
  },
  expirationTime: {
    type: Date,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
