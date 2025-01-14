import React, { useState } from "react";
import { TextField, Box, Chip, Button } from "@mui/material";

// Интерфейс для пропсов компонента
interface FileUploadFieldProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const handleDeleteFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <Box display={"grid"} gap={0.2}>
      <TextField
        label="Выберите изображения"
        type="file"
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            multiple: true,
            accept: "image/*",
          },
        }}
        sx={{
          fontSize: "14px",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#625bff",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#625bff",
          },
        }}
        onChange={(e: any) => {
          // Вызовем переданный обработчик onFileChange
          onFileChange(e);

          // Добавим файлы к состоянию
          if (!e.target.files) return;
          const files = Array.from(e.target.files);
          const imageFiles = files.filter((file: any) =>
            file.type.startsWith("image/")
          );
          setSelectedFiles((prev) => [...prev, ...imageFiles]);
        }}
      />
      {selectedFiles.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2px",
            marginTop: "2px",
          }}
        >
          {selectedFiles.map((file) => (
            <Chip
              key={file.name}
              label={file.name}
              onDelete={() => handleDeleteFile(file.name)}
              sx={{
                backgroundColor: "#635bff5c",
                "& .MuiChip-label": {
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
                "& .MuiChip-deleteIcon": {
                  color: "#424242a7",
                  fontSize: "13px",
                },
                height: "24px",
                padding: "0",
                color: "#625bff",
                fontWeight: "500",
                borderRadius: "6px",
                fontSize: "11px",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUploadField;
