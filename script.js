
const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-view]");
const pageTitle = document.getElementById("page-title");
const toast = document.getElementById("toast");

const titles = {
  accueil: "Tableau de bord",
  inscription: "Inscription",
  connexion: "Connexion",
  emploi: "Emploi du temps",
  annonces: "Annonces",
  documents: "Documents",
  profil: "Mon profil"
};

let student = null;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function navigate(viewName) {
  const target = document.getElementById(viewName);
  if (!target) return;

  views.forEach(view => view.classList.remove("active"));
  target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === viewName
    );
  });

  pageTitle.textContent = titles[viewName] || "ESTIM CONNECT";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    navigate(button.dataset.view);
  });
});

// Inscription de démonstration
document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = new FormData(this);
  const password = data.get("password");
  const confirm = data.get("confirm");

  if (password !== confirm) {
    showToast("Les deux mots de passe ne correspondent pas.");
    return;
  }

  student = {
    nom: data.get("nom"),
    prenom: data.get("prenom"),
    email: data.get("email"),
    matricule: data.get("matricule") || "Non renseigné",
    filiere: data.get("filiere"),
    niveau: data.get("niveau")
  };

  // Aucun mot de passe n'est enregistré.
  updateProfile();
  this.reset();

  showToast("Inscription de démonstration réussie !");
  navigate("profil");
});

// Connexion de démonstration
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = new FormData(this);
  const email = data.get("email");

  if (student && student.email === email) {
    updateProfile();
    showToast("Bienvenue dans votre espace étudiant !");
    navigate("accueil");
  } else {
    showToast("Aucun compte de démonstration trouvé avec cet e-mail. Essayez d'abord l'inscription.");
  }

  this.reset();
});

// Actualiser les informations du profil
function updateProfile() {
  if (!student) return;

  document.getElementById("profile-name").textContent =
    student.prenom + " " + student.nom;

  document.getElementById("profile-email").textContent =
    student.email;

  document.getElementById("profile-filiere").textContent =
    student.filiere;

  document.getElementById("profile-niveau").textContent =
    student.niveau;

  document.getElementById("profile-matricule").textContent =
    student.matricule;

  document.getElementById("profile-avatar").textContent =
    student.prenom.charAt(0).toUpperCase();
}

// Fermer la session de démonstration
document.getElementById("logout-btn").addEventListener("click", () => {
  student = null;

  document.getElementById("profile-name").textContent = "Étudiant ESTIM";
  document.getElementById("profile-email").textContent = "Aucune session ouverte";
  document.getElementById("profile-filiere").textContent = "Non renseignée";
  document.getElementById("profile-niveau").textContent = "Non renseigné";
  document.getElementById("profile-matricule").textContent = "Non renseigné";
  document.getElementById("profile-avatar").textContent = "É";

  showToast("Session de démonstration fermée.");
  navigate("accueil");
});

// Bouton de notifications
document.getElementById("notification-btn").addEventListener("click", () => {
  showToast("Vous n'avez aucune nouvelle notification.");
});
    
