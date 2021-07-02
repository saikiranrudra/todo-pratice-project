import * as Yup from "yup";

export interface FormType {
  title: string,
  subTitle: string,
  reminderDate: Date | undefined,
  description: string,
  type: "important" | "not-important" | "very-important",
  isCompleted?: boolean
}

export const inititalValues: FormType = {
  title: "",
  subTitle: "",
  reminderDate: new Date(),
  description: "",
  type: "important",
  isCompleted: false
}
export const validatonSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subTitle: Yup.string().default("No Title"),
  reminderDate: Yup.date(),
  description: Yup.string().default("No description"),
  type: Yup.string().oneOf(["important", "not-important", "very-important"]).default("important"),
  isCompleted: Yup.boolean()
})