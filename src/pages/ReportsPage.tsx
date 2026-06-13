import { Alert, Box, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getAllReports } from '../api/reportsApi';
import { ReportParamsPanel } from '../components/reports/ReportParamsPanel';
import { ReportSelectorCard } from '../components/reports/ReportSelectorCard';
import type { ReportDefinition } from '../types/report';

export function ReportsPage() {
  const [reports, setReports] = useState<ReportDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportDefinition | null>(
    null
  );

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllReports();
      setReports(data);
    } catch {
      setError('Не удалось загрузить список отчётов.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  return (
    <Stack spacing={2}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <ReportSelectorCard
        reports={reports}
        loading={loading}
        value={selectedReport}
        onChange={setSelectedReport}
      />

      {selectedReport && (
        <Box>
          <ReportParamsPanel report={selectedReport} />
        </Box>
      )}
    </Stack>
  );
}
