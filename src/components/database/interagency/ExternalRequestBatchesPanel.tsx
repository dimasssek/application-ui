import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { BatchRequestTo } from '../../../types/externalRequest';
import {
  lookupLabel,
  REQUEST_OUTCOME_LABELS,
  REQUEST_STATUS_LABELS,
  REQUEST_TYPE_LABELS,
} from '../../../types/client/enums';

type ExternalRequestBatchesPanelProps = {
  batches: BatchRequestTo[];
};

export function ExternalRequestBatchesPanel({
  batches,
}: ExternalRequestBatchesPanelProps) {
  if (batches.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Пачки запросов отсутствуют.
      </Typography>
    );
  }

  return (
    <>
      {batches.map((batch, index) => (
        <Accordion key={batch.id} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Пачка {index + 1}: {batch.messageCount} запрос(ов), создана{' '}
              {new Date(batch.createdDate).toLocaleString('ru-RU')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ФИО</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Результат</TableCell>
                    <TableCell>Ошибка</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(batch.requests ?? []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body2" color="text.secondary">
                          Запросы не загружены
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    (batch.requests ?? []).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {[request.lastName, request.firstName, request.patronymic]
                            .filter(Boolean)
                            .join(' ')}
                        </TableCell>
                        <TableCell>
                          {lookupLabel(REQUEST_TYPE_LABELS, request.type)}
                        </TableCell>
                        <TableCell>
                          {lookupLabel(REQUEST_STATUS_LABELS, request.status)}
                        </TableCell>
                        <TableCell>
                          {lookupLabel(
                            REQUEST_OUTCOME_LABELS,
                            request.outcome ?? ''
                          )}
                        </TableCell>
                        <TableCell>{request.errorMessage ?? ''}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
