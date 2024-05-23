import prisma from '@/db/db';
import { VERIFY_EMAIL, emailVerificationExpire } from '@/utils/constrains';
import jwt from 'jsonwebtoken';
import { sendEmail } from './sendEmail';

export default async function sendVerificationEmail({ email }) {

  try {
    const expireTime = emailVerificationExpire();
    const token = jwt.sign({
      type: VERIFY_EMAIL,
      email: email,
    }, process.env.AUTH_SECRET, {
      expiresIn: Math.floor(new Date(expireTime).getTime() / 1000)
    })


    await prisma.VerificationToken.upsert({

      where: {
        identifier: email,
      },
      update: {
        token: token,
        expires: emailVerificationExpire(),
      },
      create: {
        identifier: email,
        token,
        expires: expireTime

      },
    })
    return sendEmail({
      to: email, url: `${process.env.SITE_URL}/verify?email=${email}&token=${token}`, from: 'noreply@lwskart.com'
    })
  } catch (error) {
    throw new Error(error)
  }

}
