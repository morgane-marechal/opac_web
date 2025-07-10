# 📚 Application de Gestion de Bibliothèque

Une application web complète pour la gestion d'une bibliothèque, construite avec **React**, **Adonis.js** et **Material UI**.  
Elle permet l'enregistrement et la gestion des utilisateurs, l'ajout et l'emprunt de livres, ainsi que la gestion de profil.

---
.

## 🚀 Installation locale

## Prérequis
Node.js (v18+)
npm (v9+) ou yarn
PostgreSQL (v15+)
Git

## Installer le projet

Ce projet n'est que la partie front-end du SIGB !
git clone https://github.com/morgane-marechal/opac_web.git
cd opac_web

Installer les dépendances
npm install
# ou
yarn install

## ✨ Fonctionnalités

### 👤 Utilisateurs
- Inscription / Connexion
- Gestion du profil
- Emprunt de livres disponibles

### 🔒 Administrateurs
- Ajout de nouveaux livres
- Enregistrement de nouveaux utilisateurs
- Gestion des utilisateurs et des livres

---

## 🛠️ Technologies utilisées

| Frontend         | Backend       | Autres outils        |
|------------------|---------------|-----------------------|
| React            | AdonisJS      | PostgreSQL (DB)       |
| Material UI (MUI)| TypeScript    | React Hook Form + Yup|
| React Router DOM | REST API      | Docker (optionnel)   |

---

🔐 Authentification
Le backend utilise le système d'authentification d’Adonis.js (tokens).

Un middleware protège les routes privées.

Les utilisateurs peuvent être administrateurs ou simples lecteurs.

---

✅ Validation des formulaires
Validation côté frontend : Yup + React Hook Form

Validation côté backend : VineJS (AdonisJS)

---



👨‍💻 Auteur
Développé par Morgane Maréchal
Licence : MIT


