//UTILISATEUR

export function getToken() {
  return localStorage.getItem("token");
}

export function estConnecte() {
  return !!localStorage.getItem("token");
}

export function deconnecte() {
  localStorage.removeItem("token");
}


// ADMIN
export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

export function estAdminConnecte() {
  return !!localStorage.getItem("adminToken");
}

export function deconnecteAdmin() {
  localStorage.removeItem("adminToken");
}