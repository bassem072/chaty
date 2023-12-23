export default function validate(values) {
      const errors = {};

      if (!values.name) {
        errors.name = "errors.name.required";
      } else if (values.name.length < 3) {
        errors.name = "errors.name.short";
      }

      if (!values.email) {
        errors.email = "errors.email.required";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "errors.email.invalid";
      }

      if (!values.password) {
        errors.password = "errors.password.required";
      } else if (values.password.length < 8) {
        errors.password = "errors.password.short";
      }

      if (!values.repeatPassword) {
        errors.repeatPassword = "errors.repeatPassword.required";
      } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = "errors.repeatPassword.notMatch";
      }

      const str = values.year + "-" + (+values.month + 1) + "-" + values.day;
      
      const date = new Date(str);

      console.log(
        str,
        new Date(str),
        date.getDate()
      );

      if (date.getDate() !== Number(values.day)) {
        errors.date = "errors.date.invalid";
      }

      if (values.gender === null) {
        errors.gender = "errors.gender.required";
      }

      return errors;
    }