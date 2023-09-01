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
        gender:String!
        email:String!
        phone:Float!
        profile:String!
        home:String!
        work:String!
        morePlaces:[String!]
        pastActivities:[String!]
        upComingActivites:[String!]
        rated:Boolean!
    }
    input UserInput{
        firstName:String!
        lastName:String!
        gender:String!
        email:String!
        phone:Float!
        profile:String!
        home:String!
        work:String!
        morePlaces:[String!]
        pastActivities:[String!]
        upComingActivites:[String!]
        rated:Boolean!
    }

    type RootQuery {
   
        users:[User!]!
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
          .then((users) =>
            users.map((user) => {
              return user;
            })
          )
          .catch((err) => {
            throw err;
          });
      },

      //here what happened in this promises is first we are checking whether the user is already exits, if it already exists then we will thro an error which will take us to the catch block otherwise first we will bcrypt the code then we will create a user object and then we will save to the database and we will return that object because in resolver we have to always return something.
      createUser: (args) => {
        const user = new User({
          //   _id: Math.random().toString(),
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          gender: args.userInput.gender,
          email: args.userInput.email,
          phone: Number(args.userInput.phone),
          profile: args.userInput.profile,
          home: args.userInput.home,
          work: args.userInput.work,
          morePlaces: args.userInput.morePlaces,
          pastActivities: args.userInput.pastActivities,
          upComingActivites: args.userInput.upComingActivites,
          rated: args.userInput.rated,
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
