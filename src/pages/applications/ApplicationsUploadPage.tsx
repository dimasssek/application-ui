import {
  Alert,
  Box,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  ApplicationUploadApiError,
  uploadApplicationFile,
} from '../../api/applicationsApi';
import { FileUploadDropzone } from '../../components/database/FileUploadDropzone';
import {
  APPLICATION_SECTIONS,
  APPLICATIONS_HUB_TITLE,
} from '../../navigation/applicationSections';
import { ROUTES } from '../../navigation/routes';
import { partitionTxtFiles } from '../../utils/fileValidation';

const section = APPLICATION_SECTIONS.find((item) => item.id === 'upload')!;

export function ApplicationsUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    setFormatError(null);
    setUploadError(null);
    setSuccessMessage(null);

    const { accepted, rejected } = partitionTxtFiles(files);

    if (rejected.length > 0) {
      const names = rejected.map((file) => `«${file.name}»`).join(', ');
      setFormatError(
        rejected.length === 1
          ? `Файл ${names} обработать не получится. Допустим только формат .txt.`
          : `Файлы ${names} обработать не получится. Допустим только формат .txt.`
      );
    }

    if (accepted.length === 0) {
      return;
    }

    setUploading(true);
    try {
      await Promise.all(accepted.map((file) => uploadApplicationFile(file)));
      setSuccessMessage(
        accepted.length === 1
          ? 'Файл успешно загружен.'
          : 'Все файлы успешно загружены.'
      );
    } catch (error) {
      if (error instanceof ApplicationUploadApiError) {
        setUploadError(error.message);
      } else {
        setUploadError('Не удалось загрузить файлы. Повторите попытку позже.');
      }
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography variant="body2" sx={{ mb: 2 }}>
        <Link component={RouterLink} to={ROUTES.applications} underline="hover">
          {APPLICATIONS_HUB_TITLE}
        </Link>
        {' » '}
        {section.title}
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        {section.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {section.description}
      </Typography>

      <FileUploadDropzone
        disabled={uploading}
        onFilesSelected={handleFilesSelected}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 2 }}
      >
        Загрузка заявлений
      </Typography>

      {uploading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            Загрузка файлов…
          </Typography>
        </Box>
      )}

      {formatError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {formatError}
        </Alert>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {uploadError}
        </Alert>
      )}

      {successMessage && !uploading && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {successMessage}
        </Alert>
      )}
    </Paper>
  );
}
