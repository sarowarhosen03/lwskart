import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { generatePdf } from "@/utils/generatePdf";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createTransport } from "nodemailer";
import path from "path";
import { uploadFileByPath } from "../externel/storage";
const duaDate = 1000 * 60 * 60 * 24 * 7; // 7 days
export const placeOrder = async ({ customerInfo, items, totalPrice }) => {
  try {
    const session = await auth();

    if (session) {
      const {
        firstName,
        lastName,
        company,
        region,
        address,
        city,
        phone,
        email,
      } = customerInfo;
      const id = session.user.id;

      const dleteCartsitems = items.map((item) => {
        return prisma.CartItems.deleteMany({
          where: {
            id: item.id,
          },
        });
      });
      const updateProduct = items.map((item) => {
        return prisma.product.update({
          where: {
            id: item.productId,
          },
          data: {
            soldCount: { increment: item.itemCount },
          },
        });
      });
      const [newOrder, ...arg] = await prisma.$transaction([
        prisma.order.create({
          data: {
            customer: {
              connect: {
                id: id,
              },
            }, // Replace with actual customer ID
            shippingAddress: {
              city: city,
              region: region,
              address: address,
              phone: phone,
              email: email,
            },
            orderStatus: OrderStatus.PROCESSING,
            orderItems: {
              create: items.map((prductCart) => ({
                name: prductCart.product.name,
                productId: prductCart.productId,
                quantity: prductCart.itemCount,
                price: prductCart.product.discount_price,
              })),
            },
          },
        }),
        ...dleteCartsitems,
        ...updateProduct,
      ]);
      const dirPath = path.resolve(process.cwd(), "tmp");
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      const invoice = {
        number: newOrder.id, // String
        date: new Date(), // Date
        dueDate: new Date(Date.now() + duaDate),
        status: "Cash on delivery",
        currency: "$",
        path: `${path.resolve(dirPath, `${newOrder.id}.pdf`)}`,
      };
      const qr = {
        data: `${process.env.NEXT_PUBLIC_SITE_URL}/user/invoice/view?id=${newOrder.id}`,
        width: 100, // Default is 50.
      };
      console.log(qr);

      const productItems = items.map((productCart) => {
        return {
          name: productCart.product.name,
          quantity: productCart.itemCount,
          price: productCart.product.discount_price,
        };
      });
      const customer = {
        name: firstName + lastName,
        company: company || "N/A",
        address: `City: ${city}, Region: ${region}, Address-line: ${address}`,
        phone,
        email,
      };
      const pdfPath = await sendInvoiceEmail(
        { invoice, qr, items: productItems, customer },
        session.user.email,
      );
      await prisma.order.update({
        where: {
          id: newOrder.id,
        },
        data: {
          invoice: {
            payment: "CASH",
            paymentStatus: "Pending",
            total: totalPrice,
            pdfPath: pdfPath,
            dueDate: new Date(Date.now() + duaDate),
            orderDate: new Date(),
          },
        },
      });

      revalidatePath("/[lang]/user/invoice", "page");
      return {
        success: true,
        payload: {
          ...newOrder,
        },
        invoice: qr.data,
      };
    }
    return {
      error: "accessDenied",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

async function sendInvoiceEmail({ invoice, qr, items, customer }, email) {
  const pdf = await generatePdf({ invoice, qr, items, customer });

  const transport = createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const result = await transport.sendMail({
    to: `<${email || customer?.email}>`,
    from: `Order Confirmation <sells@$lwskart.com>`,
    subject: `Lwskart Order Confirmation`,
    text: `order confirmation form lwskart <a href="${qr.data}">See Details</a>`,
    html: generateEmailTemplae({ name: customer.name, url: qr.data }),
    attachments: [
      {
        filename: `invoic-${invoice.number}.pdf`,
        path: pdf, // stream this file
      },
    ],
  });
  const filePath = await uploadFileByPath(pdf);
  return filePath;
}

function generateEmailTemplae({ name, url }) {
  const companyName = "Lwskart";
  return `
  <div style="font-family: Arial, sans-serif;">
    <h1 style="color: #333;">Hi ${name},</h1>
    <p style="color: #666;">Thank you for shopping with us. Your order has been placed successfully.</p>
    <p style="color: #666;">Click the link below to See about your order details.</p>
    <a href="${url}" style="background-color: red; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block;">See Order Details</a>
    <p style="color: #666;">Thank you for shopping with us.</p>
    <p style="color: #666;">Regards,</p>
    <p style="color: #666;">${companyName}</p>
  </div>
  `;
}
