const JWT = require('jsonwebtoken')
// export default async (req,res,next) => {
module.exports = async (req,res,next) => {
  // JWTを持っているか確認 ->リクエストヘッダの中のx-auth-tokenを確認
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(!token) {
    return res.status(400).json(
      {
        message:"権限がありません",
      }
    );
  } else {
    try {
      req.user = JWT.verify(token,"SECRET_KEY")
      next();
    } catch {
      return res.status(400).json(
        {
          message: "トークンが一致しません"
        },
      )
    }
  }
}
