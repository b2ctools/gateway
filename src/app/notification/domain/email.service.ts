import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    send(email: string, template: string) {
        console.log(`Sending email to ${email}.`)
        console.log(template)
    }
}