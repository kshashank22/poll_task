import * as yup from "yup";

const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export const basicSchema = yup.object().shape({
  username: yup.string().trim().min(3).required("*UserName is Required"),
  password: yup
    .string()
    .trim()
    .min(6)
    .matches(passwordregex, {
      message: "Atleast 1 Caps and small letter,1 num value",
    })
    .required("*Password is Required"),
});

export const optionSchema = yup.object().shape({
  option:yup.string().trim().min(2).required()
})

export const titleSchema = yup.object().shape({
  title:yup.string().trim().min(2).required()
})


export const newPollSchema = yup.object().shape({
  newTitle:yup.string().trim().min(2).required(),
  options:yup.string().trim().min(2).required()
})
