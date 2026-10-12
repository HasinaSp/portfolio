const whatsappNumber = "261341300895";

const whatsappMessage =
  "Bonjour Hasina, je vous contacte depuis votre portfolio pour discuter d'un projet.";

export const contact = {
  whatsapp: {
    number: whatsappNumber,
    url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },

  email: {
    address: "speyerhasina@gmail.com",
    url: "mailto:speyerhasina@gmail.com",
    subject: "Demande de collaboration",
  },

  linkedin: {
    url: "https://www.linkedin.com/in/hasina-andriamahandry-26027a214/",
    label: "LinkedIn",
  },
};