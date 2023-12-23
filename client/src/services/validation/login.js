export default function validate(values) {
      const errors = {};

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

      return errors;
    }
