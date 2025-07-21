import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  full_name: yup.string().required('Nom d’utilisateur requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requise'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
});

export const updateBookSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  isbn: yup.string(),
  dewey_indice: yup.string(),
  cover: yup.string(),
  pdf: yup.string(),
  editor: yup.string(),
});

export const registerBookSchema = yup.object().shape({
  title: yup.string().required("Le titre est requis"),
  description: yup.string().required("La description est requise"),
  isbn: yup.string().required("L'ISBN est requis'"),
  dewey_indice: yup.string(),
  cover: yup.string(),
  pdf: yup.string(),
  editor: yup.string().required("L'éditeur est requis"),
});