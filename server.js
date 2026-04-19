import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // 🔥 IMPORTANT for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/contact", async (req, res) => {
  try {
    console.log("ROUTE HIT");
    console.log("REQ BODY:", req.body);

    const { formType } = req.body;

    if (formType === "contact") {
    const { name, email, phone, service, message } = req.body;


     if (!name || !email || !phone || !message){
        return res.status(400).json({
          error: "Name, email, and message are required.",
        });
      }

      const info = await transporter.sendMail({
        from: `"Website Contact" <info@myralimmigration.ca>`,
        to: process.env.CONTACT_TO,
        replyTo: email,
        subject: `New contact form${service ? ` - ${service}` : ""}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone || "N/A"}
          Service: ${service || "N/A"}

          Message:
          ${message}
        `,
        html: `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color: #1e3a5f; color: white; padding: 20px;">
        <h2 style="margin: 0;">📩 Nouveau message reçu</h2>
        <p style="margin: 5px 0 0;">De: ${name}</p>
      </div>

      <!-- Content -->
      <div style="padding: 20px;">
        
        <table style="width: 100%; border-collapse: collapse;">
          
          <tr>
            <td style="padding: 8px 0;"><strong>Nom:</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Email:</strong></td>
            <td>
              <a href="mailto:${email}" style="color: #1e3a5f; text-decoration: none;">
                ${email}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Téléphone:</strong></td>
            <td>${phone || "N/A"}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Service:</strong></td>
            <td>${service || "N/A"}</td>
          </tr>

        </table>

        <!-- Message Box -->
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <div style="margin-top: 10px; padding: 15px; background-color: #f0f4f8; border-radius: 6px; line-height: 1.5;">
            ${String(message).replace(/\n/g, "<br>")}
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">Message envoyé depuis votre site web</p>
      </div>

    </div>

  </div>
`,
      });

      console.log("CONTACT MAIL SENT:", info.response);
      return res.status(200).json({ message: "Contact email sent successfully" });
    }

    if (formType === "profile-evaluation") {
      const {
        titre,
        prenom,
        nom,
        email,
        nationalite,
        paysResidence,
        telephone,
        situation,
        dateNaissance,
        niveauEtudes,
        domaineEtude,
        dateDiplome,
        experience,
        domaineEmploi,
        niveauFr,
        niveauEn,
        visiteCanada,
        familleCanada,
        offreEmploi,
        commentConnu,
        motivation,
        consent,
      } = req.body;

      if (
        !titre ||
        !prenom ||
        !nom ||
        !email ||
        !nationalite ||
        !paysResidence ||
        !telephone ||
        !situation ||
        !dateNaissance ||
        !niveauEtudes ||
        !experience ||
        !niveauFr ||
        !niveauEn ||
        !visiteCanada ||
        !familleCanada ||
        !offreEmploi ||
        consent !== true
        
      ) {
        return res.status(400).json({
          error: "Missing required profile evaluation fields.",
        });
      }
      console.log({ telephone });

      const info = await transporter.sendMail({
        from: `"Profile Evaluation" <info@myralimmigration.ca>`,
        to: process.env.CONTACT_TO,
        replyTo: email,
        subject: `Nouvelle évaluation de profil - ${prenom} ${nom}`,
        text: `
          Titre: ${titre}
          Prénom: ${prenom}
          Nom: ${nom}
          Email: ${email}
          Nationalité: ${nationalite}
          Pays de résidence: ${paysResidence}
          Téléphone: ${telephone}
          Situation matrimoniale: ${situation}
          Date de naissance: ${dateNaissance}
          Niveau d'études: ${niveauEtudes}
          Domaine d'étude: ${domaineEtude || "N/A"}
          Date diplôme: ${dateDiplome || "N/A"}
          Expérience: ${experience}
          Domaine d'emploi: ${domaineEmploi || "N/A"}
          Niveau français: ${niveauFr}
          Niveau anglais: ${niveauEn}
          Visite Canada: ${visiteCanada}
          Famille au Canada: ${familleCanada}
          Offre d'emploi: ${offreEmploi}
          Comment connu: ${commentConnu || "N/A"}
          Motivation: ${motivation || "N/A"}
          Consentement: ${consent ? "Oui" : "Non"}
        `,
   html: `
<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">

  <div style="max-width: 700px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- HEADER -->
    <div style="background-color: #1e3a5f; color: white; padding: 20px;">
      <h2 style="margin: 0;">📄 Nouvelle évaluation de profil</h2>
      <p style="margin: 5px 0 0;">${prenom} ${nom}</p>
    </div>

    <!-- CONTENT -->
    <div style="padding: 20px;">

      <!-- PERSONAL INFO -->
      <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Informations personnelles</h3>
      <table style="width: 100%; margin-top: 10px;">
        <tr><td><strong>Titre:</strong></td><td>${titre}</td></tr>
        <tr><td><strong>Prénom:</strong></td><td>${prenom}</td></tr>
        <tr><td><strong>Nom:</strong></td><td>${nom}</td></tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td><a href="mailto:${email}" style="color:#1e3a5f;">${email}</a></td>
        </tr>
        <tr><td><strong>Téléphone:</strong></td><td>${telephone}</td></tr>
        <tr><td><strong>Nationalité:</strong></td><td>${nationalite}</td></tr>
        <tr><td><strong>Pays de résidence:</strong></td><td>${paysResidence}</td></tr>
        <tr><td><strong>Date de naissance:</strong></td><td>${dateNaissance}</td></tr>
        <tr><td><strong>Situation:</strong></td><td>${situation}</td></tr>
      </table>

      <!-- EDUCATION -->
      <h3 style="margin-top: 25px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Études</h3>
      <table style="width: 100%; margin-top: 10px;">
        <tr><td><strong>Niveau:</strong></td><td>${niveauEtudes}</td></tr>
        <tr><td><strong>Domaine:</strong></td><td>${domaineEtude || "N/A"}</td></tr>
        <tr><td><strong>Date diplôme:</strong></td><td>${dateDiplome || "N/A"}</td></tr>
      </table>

      <!-- EXPERIENCE -->
      <h3 style="margin-top: 25px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Expérience & Langues</h3>
      <table style="width: 100%; margin-top: 10px;">
        <tr><td><strong>Expérience:</strong></td><td>${experience}</td></tr>
        <tr><td><strong>Domaine emploi:</strong></td><td>${domaineEmploi || "N/A"}</td></tr>
        <tr><td><strong>Français:</strong></td><td>${niveauFr}</td></tr>
        <tr><td><strong>Anglais:</strong></td><td>${niveauEn}</td></tr>
      </table>

      <!-- CANADA -->
      <h3 style="margin-top: 25px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Situation Canada</h3>
      <table style="width: 100%; margin-top: 10px;">
        <tr><td><strong>Visite Canada:</strong></td><td>${visiteCanada}</td></tr>
        <tr><td><strong>Famille au Canada:</strong></td><td>${familleCanada}</td></tr>
        <tr><td><strong>Offre d'emploi:</strong></td><td>${offreEmploi}</td></tr>
      </table>

      <!-- OTHER -->
      <h3 style="margin-top: 25px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Autres informations</h3>
      <table style="width: 100%; margin-top: 10px;">
        <tr><td><strong>Comment connu:</strong></td><td>${commentConnu || "N/A"}</td></tr>
        <tr><td><strong>Consentement:</strong></td><td>${consent ? "Oui" : "Non"}</td></tr>
      </table>

      <!-- MOTIVATION -->
      <div style="margin-top: 25px;">
        <strong>Motivation:</strong>
        <div style="margin-top: 10px; padding: 15px; background-color: #f0f4f8; border-radius: 6px;">
          ${String(motivation || "").replace(/\n/g, "<br>") || "N/A"}
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">Formulaire envoyé depuis votre site web</p>
    </div>

  </div>
</div>
`,
      });

      console.log("PROFILE MAIL SENT:", info.response);
      return res.status(200).json({ message: "Profile email sent successfully" });
    }

    return res.status(400).json({
      error: "Invalid form type.",
    });
  } catch (error) {
    console.error("SEND ERROR:", error);
    res.status(500).json({
      error: error?.message || "Error sending message",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});