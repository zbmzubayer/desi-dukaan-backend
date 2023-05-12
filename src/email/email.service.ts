import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  sendOnSignup(email: string, name: string, uuid: string) {
    this.mailService.sendMail({
      to: email,
      subject: 'DesiDukaan Registration',
      text: `Hi, ${name}. Welcome to DesiDukaan.
      Please verify your email address by clicking on the link below.
      http://localhost:3333/customer/verify-email/?uid=${uuid}`,
    });
  }
  sendOnOrder(customer, order) {
    console.log(order);
    this.mailService.sendMail({
      to: customer.Email,
      subject: 'DesiDukaan Order Confirmation',
      text: `Hi, ${customer.Name}. Your order has been successfully placed.
      Order Code: ${order.Code}
      Order Amount: ${order.Amount} Taka
      Order Status: ${order.Status}
      Order Placed At: ${order.PlacedAt}
      Order Payment: ${order.payment.Type}
      `,
    });
  }
}
