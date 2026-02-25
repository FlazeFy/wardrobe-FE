import * as Yup from "yup"

export const feedbackSchema = Yup.object({
    feedback_rate: Yup.number().required("Feedback rate is required").min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),
    feedback_body: Yup.string().required("Feedback body is required").max(255),
})