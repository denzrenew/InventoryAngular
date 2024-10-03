import { Validators } from "@angular/forms";

const ticketForm = {
  subject: ["", [ Validators.required, Validators.max(100), Validators.min(3) ]],
  content: ["", [ Validators.required, Validators.max(300), Validators.min(5) ]],
}

export default ticketForm;
