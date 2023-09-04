import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";
import User from "./models/User.js";
const app = express();
mongoose
  .connect(
    "mongodb+srv://shubhambdminfotech:BDMInfotech@cluster0.7ssinku.mongodb.net/Rider?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log("Error Occured", err);
  });
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(cors());
app.options("*", cors());
app.use(bodyparser.json());
app.get("/temp", (req, res) => {
  res.json({
    name: "shubham",
    email: "shubham@gmail.com",
  });
});
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: buildSchema(`
//     type User{
//         _id:ID!
// firstName:String!
// lastName:String!
// gender:String!
// email:String!
// phone:Float!
// profile:String!
// home:String!
// work:String!
// morePlaces:[String!]
// pastActivities:[String!]
// upcomingActivities:[String!]
// rated:Boolean!
//     }
//     input UserInput{
// firstName:String!
// lastName:String!
// gender:String!
// email:String!
// phone:Int!
// profile:String!
// home:String!
// work:String!
// morePlaces:[String!]
// pastActivities:[String!]
// upcomingActivities:[String!]
// rated:Boolean!
//     }
//     type RootQuery{
// users:[User!]!
//     }
//     type RootMutation{
//         createUser(userInput:UserInput)

//     }
//     schema{
//         query:RootQuery
//         mutation:RootMutation
//     }
//     `),
//     rootValue: {
//       users: () => {
//         return User.find()
//           .then((users) => {
//             return users;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       },
//       createUser: (args) => {
//         const user = new User({
//           //   _id: Math.random().toString(),
//           firstName: args.userInput.firstName,
//           lastName: args.userInput.lastName,
//           gender: args.userInput.gender,
//           email: args.userInput.email,
//           phone: Number(args.userInput.phone),
//           profile: args.userInput.profile,
//           home: args.userInput.home,
//           work: args.userInput.work,
//           morePlaces: args.userInput.morePlaces,
//           pastActivities: args.userInput.pastActivities,
//           upcomingActivities: args.userInput.upcomingActivities,
//           rated: args.userInput.rated,
//         });
//         return user
//           .save()
//           .then((result) => {
//             return result;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       },
//       graphiqp: true,
//     },
//   })
// );
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    
    type User{
        _id:ID!
        firstName:String!
        lastName:String!
        email:String!
        phone_number_country:String!
        phone_number_country_code:Int!
        phone_number:Float!
        gender:String!
        profile:String!
        home_address:String!
        work_address:String!
        more_address:[String!]
        past_activities:[String!]
        upcoming_activites:[String!]
        latitude_home_address:Float!
        longitude_home_address:Float!
        latitude_work_address:Float!
        longitude_work_address:Float!
        otp:Int!
        otp_expiry:String!
        verify_token:String!
        customer_type:[String!]
        rated:Boolean!
    }
    type Validate{
      phone_number:Float!
    }
    input UserInput{
      firstName:String!
      lastName:String!
      email:String!
      phone_number_country:String!
      phone_number_country_code:Int!
      phone_number:Float!
      gender:String!
      profile:String!
      home_address:String!
      work_address:String!
      more_address:[String!]
      past_activities:[String!]
      upcoming_activites:[String!]
      latitude_home_address:Float!
      longitude_home_address:Float!
      latitude_work_address:Float!
      longitude_work_address:Float!
      otp:Int!
      otp_expiry:String!
      verify_token:String!
      customer_type:[String!]
      rating:Boolean!
    }

    type RootQuery {
   
        users:[User!]!
        validate(num:Float!):Float!
    }
    type RootMutation {
      
        createUser(userInput:UserInput):User
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      users: () => {
        return User.find()
          .then((users) => users)
          .catch((err) => {
            throw err;
          });
      },
      validate: async (args) => {
        let value = args.num;
        let otp = null;
        try {
          const users = await User.find({ phone_number: value }, { otp: 1 });
          otp = users[0].otp;
        } catch (error) {
          console.log("User Not Found", error);
        }
        return parseFloat(otp);
      },

      //here what happened in this promises is first we are checking whether the user is already exits, if it already exists then we will thro an error which will take us to the catch block otherwise first we will bcrypt the code then we will create a user object and then we will save to the database and we will return that object because in resolver we have to always return something.
      createUser: (args) => {
        const user = new User({
          //   _id: Math.random().toString(),
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          email: args.userInput.email,
          phone_number_country: args.userInput.phone_number_country,
          phone_number_country_code: Number(
            args.userInput.phone_number_country_code
          ),
          phone_number: Number(args.userInput.phone_number),
          gender: args.userInput.gender,
          profile: args.userInput.profile,
          home_address: args.userInput.home_address,
          work_address: args.userInput.work_address,
          more_address: args.userInput.more_address,
          past_activities: args.userInput.past_activities,
          upcoming_activites: args.userInput.upcoming_activites,
          latitude_home_address: args.userInput.latitude_home_address,
          longitude_home_address: args.userInput.longitude_home_address,
          latitude_work_address: args.userInput.latitude_work_address,
          longitude_work_address: args.userInput.longitude_work_address,
          otp: Number(args.userInput.otp),
          otp_expiry: args.userInput.otp_expiry,
          verify_token: args.userInput.verify_token,
          customer_type: args.userInput.customer_type,
          rating: args.userInput.rating,
        });
        return user
          .save()
          .then((results) => {
            return results;
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("the port is running on port number 3000");
});

// Mutation Operation in GraphQL
// mutation{
//     createUser(userInput:{firstName:"Shubham",lastName:"Pawar",gender:"male",email:"shubham@gmail.com",phone:8928116000,profile:"https:aws.com",home:"Malad",work:"Kandivali",morePlaces:["Andheri","Churchgate"],pastActivities:["Great Escape","Water Kingdom"],upComingActivites:["Imagica","Suraj Water Part"],rated:true}){
//       firstName
//       lastName
//       phone
//       email
//     }
//   }

// mutation query to add the user data
// mutation {
//   createUser(userInput:{firstName:"Rahul",lastName:"Saroj",email:"ankit@gmail.com",phone_number_country:"India",phone_number_country_code:91,phone_number:8928116000,gender:"male",profile:"https:www.aws.com",home_address:"Malad Mumbai Maharashtra", work_address:"kandivali Mumbai Maharashtra",more_address:["Andheri Mumbai Maharashtra","Goregaon Mumbai Maharashtra"],past_activities:["Goa", "Great Escape"], upcoming_activites:["water kingdom","imagica"],latitude_home_address:121, longitude_home_address:135, latitude_work_address:211, longitude_work_address:321,otp:1234,otp_expiry:"123456",verify_token:"xpppsjsju122",customer_type:["android","ios"],rating:true}){
//     more_address
//   }
// }
