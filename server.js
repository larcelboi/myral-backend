import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Myral backend is running");
});

const row = (label, value) => `
  <tr>
    <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:220px;">
      ${label}
    </td>
    <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
      ${value || "-"}
    </td>
  </tr>
`;

app.post("/permisTravail", async (req, res) => {
  try {
    const { name, email, message, typeDemande } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demande Permis de Travail & EIMT - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demande Permis de Travail & EIMT - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
             <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Type de demande</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${typeDemande}" style="color:#5b1717;text-decoration:none;">${typeDemande}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/permisCanada", async (req, res) => {
  try {
    const { name, email, message, progVise } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demande Permis d'Études au Canada - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demande Permis d'Études au Canada - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
             <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Programme visé</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${progVise}" style="color:#5b1717;text-decoration:none;">${progVise}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/citoyenneteCanada", async (req, res) => {
  try {
    const { name, email, message, date_devenuRp, hors_Canada } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demnande Citoyenneté Canadienne - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demnande Citoyenneté Canadienne - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Date devenu Rp</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${date_devenuRp}" style="color:#5b1717;text-decoration:none;">${date_devenuRp}</a>
              </td>
            </tr>
             <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Voyager hors du Canada</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${hors_Canada}" style="color:#5b1717;text-decoration:none;">${hors_Canada}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/quebecForm", async (req, res) => {
  try {
    const { name, email, message, niveauFrancais } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demande (PCP) - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demande (PCP) - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Niveau de français</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${niveauFrancais}" style="color:#5b1717;text-decoration:none;">${niveauFrancais}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/parrainage", async (req, res) => {
  try {
    const { name, email, message, type } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demande (PCP) - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demande (PCP) - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Type</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${type}" style="color:#5b1717;text-decoration:none;">${type}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/entreExpress", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle Demande de Consultation - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle Demande de Consultation - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: email,
      subject: "Nouvelle demande  - Myral Immigration",
      html: `
    <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:650px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        
        <div style="background:#5b1717;color:white;padding:22px 28px;">
          <h1 style="margin:0;font-size:22px;">Nouvelle demande  - Myral Immigration</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
            Myral Immigration
          </p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:15px;color:#555;margin-top:0;">
            Un nouveau message a été envoyé depuis le formulaire de contact.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:160px;">Nom complet</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Email</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">
                <a href="mailto:${email}" style="color:#5b1717;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Téléphone</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Type de demande</td>
              <td style="padding:12px;border-bottom:1px solid #eee;color:#555;">${service}</td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Message</h2>
            <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
          Email envoyé automatiquement depuis le site Myral Immigration.
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.post("/evaluation", async (req, res) => {
  try {
    const data = req.body;

    await sgMail.send({
      to: "info@myralimmigration.ca",
      from: "info@myralimmigration.ca",
      replyTo: data.email,
      subject: "Nouvelle évaluation de profil - Myral Immigration",
      html: `
        <div style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
          <div style="max-width:700px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
            
            <div style="background:#5b1717;color:white;padding:24px 30px;">
              <h1 style="margin:0;font-size:22px;">Nouvelle évaluation de profil</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#f3dede;">
                Formulaire d’évaluation - Myral Immigration
              </p>
            </div>

            <div style="padding:28px;">
              <p style="font-size:15px;color:#555;margin-top:0;">
                Une nouvelle évaluation de profil a été soumise depuis le site web.
              </p>

              <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                ${row("Titre", data.titre)}
                ${row("Prénom", data.prenom)}
                ${row("Nom de famille", data.nom)}
                ${row("Email", data.email)}
                ${row("Nationalité", data.nationalite)}
                ${row("Pays de résidence", data.paysResidence)}
                ${row("Téléphone", data.telephone)}
                ${row("Situation matrimoniale", data.situation)}
                ${row("Date de naissance", data.dateNaissance)}
                ${row("Niveau d’études", data.niveauEtudes)}
                ${row("Domaine d’étude", data.domaineEtude)}
                ${row("Date du diplôme", data.dateDiplome)}
                ${row("Expérience", data.experience)}
                ${row("Domaine d’emploi", data.domaineEmploi)}
                ${row("Niveau français", data.niveauFr)}
                ${row("Niveau anglais", data.niveauEn)}
                ${row("Déjà visité le Canada", data.visiteCanada)}
                ${row("Famille au Canada", data.familleCanada)}
                ${row("Offre d’emploi", data.offreEmploi)}
                ${row("Comment nous a connu", data.commentConnu)}
                ${row("Consentement", data.consent ? "Oui" : "Non")}
              </table>

              <div style="margin-top:24px;">
                <h2 style="font-size:17px;color:#5b1717;margin-bottom:10px;">Motivation</h2>
                <div style="background:#fafafa;border-left:4px solid #5b1717;padding:16px;border-radius:8px;color:#444;line-height:1.6;">
                  ${(data.motivation || "").replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>

            <div style="background:#f7f7f7;padding:16px 28px;color:#777;font-size:12px;text-align:center;">
              Email envoyé automatiquement depuis le formulaire d’évaluation Myral Immigration.
            </div>

          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("SendGrid error:", error.response?.body);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});
