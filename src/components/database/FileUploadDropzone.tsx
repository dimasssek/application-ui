import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';

type FileUploadDropzoneProps = {
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
};

export function FileUploadDropzone({
  disabled = false,
  onFilesSelected,
}: FileUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    onFilesSelected(Array.from(fileList));
  };

  const preventDefaults = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box>
      <Box
        onDragEnter={(event) => {
          preventDefaults(event);
          if (!disabled) {
            setDragOver(true);
          }
        }}
        onDragOver={preventDefaults}
        onDragLeave={(event) => {
          preventDefaults(event);
          setDragOver(false);
        }}
        onDrop={(event) => {
          preventDefaults(event);
          setDragOver(false);
          if (!disabled) {
            handleFiles(event.dataTransfer.files);
          }
        }}
        sx={{
          border: '2px dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          borderRadius: 1,
          bgcolor: dragOver ? 'primary.light' : 'background.paper',
          py: 6,
          px: 3,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.2s, background-color 0.2s',
        }}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          Перетащите файлы сюда
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          или нажмите, чтобы выбрать на компьютере
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Допустимый формат: .txt
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Выбрать файлы
        </Button>
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        multiple
        hidden
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
    </Box>
  );
}
