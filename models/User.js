import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number_country: {
    type: String,
  },
  phone_number_country_code: {
    type: Number,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  profile: {
    type: String,
    default: "",
  },
  home_address: {
    type: String,
  },
  work_address: {
    type: String,
  },
  more_address: [
    {
      type: String,
    },
  ],
  //   savedLocations: [
  //     {
  //       home: String,
  //       work: String,
  //       morePlaces: [
  //         {
  //           type: String,
  //         },
  //       ],
  //     },
  //   ],
  past_activities: [
    {
      type: String,
    },
  ],
  upcoming_activites: [
    {
      type: String,
    },
  ],
  latitude_home_address: {
    type: Number,
  },
  longitude_home_address: {
    type: Number,
  },
  latitude_work_address: {
    type: Number,
  },
  longitude_work_address: {
    type: Number,
  },
  otp: {
    type: Number,
  },
  otp_expiry: {
    type: Number,
  },
  verify_token: {
    type: String,
  },
  customer_type: [{ type: String }],
  rating: {
    type: Boolean,
  },
});
export default mongoose.model("User", userSchema);
