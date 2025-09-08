import React from 'react';
import EntityForm from './EntityForm';

const AuthorForm = ({ onSuccess }) => {
  return (
    <EntityForm
      title="éditeur"
      apiUrl="http://127.0.0.1:3333/addAuthor"
      onSuccess={onSuccess}    />
  );
};

export default AuthorForm;
