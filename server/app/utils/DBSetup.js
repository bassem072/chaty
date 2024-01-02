import mongoose from "mongoose";
import { faker, fakerAR } from "@faker-js/faker";
import dbConfig from "../configs/db.config.js";
import User from "../models/user.model.js";

const createUsers = () => {
  for (let i = 1; i <= 20; i++) {
    const user = new User({
      name: faker.person.fullName(),
      bio: faker.person.bio(),
      email: "user" + i + "@gmail.com",
      password: "user" + i + "2751959@",
      verified: true,
      gender: faker.person.sex(),
      birthdate: faker.date.birthdate(),
      role: "user",
    });

    user
      .save()
      .then((saved_user) => console.log("User Added: ", saved_user))
      .catch((error) => console.log("User Error: ", error));
  }
};

const dbSetup = () => {
  mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const count = await User.estimatedDocumentCount();
      if (count === 0) {
        const admin = new User({
          name: "Bassem Elsayed",
          bio: "Hello From My Black Box",
          email: "bassemelsayd072@gmail.com",
          password: "bassem2751959@",
          verified: true,
          gender: "male",
          birthdate: new Date("1997-05-22"),
          role: "admin",
        });
        admin
          .save()
          .then((saved_admin) => console.log("Admin Added: ", saved_admin))
          .catch((error) => console.log("Admin Error: ", error));

        createUsers();
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

export default dbSetup;
