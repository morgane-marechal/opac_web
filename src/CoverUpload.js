import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const CoverUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Génère un aperçu local
      onFileSelect(file); // Envoie le fichier au parent
    }
  };

  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="subtitle1">Couverture du livre</Typography>
      <Button variant="outlined" component="label">
        Choisir une image
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>

      {preview && (
        <Box sx={{ marginTop: 2 }}>
          <img
            src={preview}
            alt="Aperçu couverture"
            style={{ width: "150px", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CoverUpload;
