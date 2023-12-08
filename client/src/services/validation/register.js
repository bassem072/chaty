export default function validate(values) {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 3) {
        errors.name = "Name must be at least 3 characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      if (!values.repeatPassword) {
        errors.repeatPassword = "Required";
      } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = "Two passwords does not match";
      }
      
      const date = new Date(
        values.year + "-" + (+values.month + 1) + "-" + values.day
      );

      if (date.getDate() !== Number(values.day)) {
        errors.date = "Invalid Date";
      }

      if (values.gender === null) {
        errors.gender = "Required";
      }

      return errors;
    }