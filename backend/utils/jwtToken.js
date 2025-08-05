export const genrateToken = (user, message, statusCode, res) => {
  const token = user.generatejsonwebtoken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res.status(statusCode).cookie(cookieName, token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPRIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
     secure: true,
    sameSite: 'None',
  }).json({
    success:true,
    message,
    user,
    token

  });
};
