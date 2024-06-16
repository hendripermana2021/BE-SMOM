import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = {
      userId: decoded.id,
      name_guru: decoded.name_guru,
      sex: decoded.sex,
      email: decoded.email, // Fix here: change decoded.gender to decoded.email
      role_id: decoded.role_id,
      image: decoded.image,
    };

    req.siswa = {
      userId: decoded.id,
      name_siswa: decoded.name_siswa,
      sex: decoded.sex,
      email: decoded.email,
      id_class: decoded.id_class,
      image: decoded.image,
      role_id: decoded.role_id,
    };

    req.id = decoded.userId;
    req.name_guru = decoded.name_guru;
    req.name_siswa = decoded.name_siswa;
    req.sex = decoded.sex;
    req.email = decoded.email;
    req.role_id = decoded.role_id;
    req.image = decoded.image;

    next();
  });
};
