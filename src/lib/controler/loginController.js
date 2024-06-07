import prisma from "@/db/db";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const expireTimes = {
  accessToken_jwt: "1h",
  expires_in: 60 * 60 * 1000, //1hour in ms,
  refreshExpireTime: (remember) => (remember ? "1d" : "90d"),
};

export default async function loginController({ email, password, remember }) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        image: true,
        name: true,
      },
    });
    if (foundUser && !foundUser.emailVerified) {
      await sendVerificationEmail({
        email: foundUser.email,
        userId: foundUser.id,
      });

      return { error: "accessDenied" };
    }
    if (foundUser && (await bcrypt.compare(password, foundUser?.password))) {
      const { password, emailVerified, ...result } = foundUser;

      const payload = { email: result.email, userId: result.id };
      return {
        user: { ...result, provider: "credentials" },
        access_token: generateAccessToken(payload),
        refresh_token: generateRefreshToken(payload, remember),
        expires_at: Date.now() + expireTimes.expires_in,
      };
    }

    return null;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}

export async function refreshToken(tokens) {
  try {
    const refreshTokenData = jwt.verify(
      tokens?.refresh_token,
      process.env.AUTH_REFRESH_SECRET,
    );
    const payload = {
      email: refreshTokenData.email,
      userId: refreshTokenData.userId,
    };

    const access_token = generateAccessToken(payload);

    return {
      ...tokens,
      access_token,
      expires_at: Date.now() + expireTimes.expires_in,
    };
  } catch (e) {
    throw new Error("Invalid refresh token");
  }
}

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.AUTH_ACCESS_SECRET, {
    expiresIn: expireTimes.accessToken_jwt,
  });
}
function generateRefreshToken(payload, remember) {
  return jwt.sign(payload, process.env.AUTH_REFRESH_SECRET, {
    expiresIn: expireTimes.refreshExpireTime(remember),
  });
}
