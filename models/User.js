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
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  home: {
    type: String,
  },
  work: {
    type: String,
  },
  morePlaces: [
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
  pastActivities: [
    {
      type: String,
    },
  ],
  upComingActivites: [
    {
      type: String,
    },
  ],
  rated: {
    type: Boolean,
  },
});
export default mongoose.model("User", userSchema);
