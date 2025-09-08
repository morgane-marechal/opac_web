import React from 'react';
import EntityForm from './EntityForm';

const EditorForm = ({ onSuccess }) => {
  return (
    <EntityForm
      title="éditeur"
      apiUrl="http://127.0.0.1:3333/addEditor"
      onSuccess={onSuccess}    />
  );
};

export default EditorForm;
