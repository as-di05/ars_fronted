import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box, Chip } from "@mui/material";

interface MultiSelectProps {
  items: { id: number; label: string }[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ items }) => {
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [itemsObj, setItemsObj] = useState<{ [key: number]: any }>({});

  const handleDocumentChange = (event: any) => {
    const value = event.target.value as number[];
    setSelectedDocuments(value);
  };

  const handleDeleteFilter = (id: number) => {
    setSelectedDocuments((prev) => prev.filter((doc) => doc !== id));
  };

  useEffect(() => {
    if (items?.length) {
      const obj: { [key: number]: any } = {};
      for (const element of items) {
        obj[element.id] = element;
      }
      setItemsObj(obj);
    }
  }, [items]);

  return (
    <Box display={"grid"} gap={0.1}>
      <TextField
        label="Типы документов"
        select
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={selectedDocuments}
        onChange={handleDocumentChange}
        SelectProps={{
          multiple: true,
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
      >
        {items?.map((item, index) => (
          <MenuItem
            key={`${item.id}-${index}`}
            value={item.id}
            sx={{ fontSize: "14px" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      {selectedDocuments.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
            marginTop: "2px",
          }}
        >
          {selectedDocuments.map((docId) => (
            <Chip
              key={docId}
              label={itemsObj[docId]?.label || "Unknown"}
              onDelete={() => handleDeleteFilter(docId)}
              sx={{
                backgroundColor: "#635bff5c",
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

export default MultiSelect;
