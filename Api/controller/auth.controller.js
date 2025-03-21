import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js"

export const register = async (req, res) => {
  try {
    console.log("Données reçues :", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("Nouvel utilisateur créé :", newUser);
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    console.error("Erreur dans le backend :", err);
    if (err.code === "P2002") {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};



export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // CHECK IF THE USER EXISTS
  
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
  
      // CHECK IF THE PASSWORD IS CORRECT
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid Credentials!" });
  
      // GENERATE COOKIE TOKEN AND SEND TO THE USER
      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
      const age = 1000 * 60 * 60 * 24 * 7;
      // generate token:
      const token = jwt.sign(
        {
          id: user.id,
          isAdmin: false,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );
  
      const { password: userPassword, ...userInfo } = user;
  
      res
        .cookie("token", token, {
          httpOnly: true,
          // secure:true,
          maxAge: age,
        })
        .status(200)
        .json(userInfo);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to login!" });
    }
  };

  export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };
  