import {
  Checkbox,
  ListItemText,
  MenuItem,
  TextField,
} from '@mui/material';
import type { ReportOption } from './reportDictionaries';

type MultiSelectFieldProps = {
  options: ReportOption[];
  value: string[];
  onChange: (next: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};

/**
 * MUI Select в режиме `multiple` с чекбоксами и человекочитаемой
 * сводной строкой выбранных значений.
 */
export function MultiSelectField({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Выберите значения',
  error,
  helperText,
  disabled,
}: MultiSelectFieldProps) {
  const labelByCode = new Map(options.map((option) => [option.code, option.label]));

  return (
    <TextField
      select
      fullWidth
      size="small"
      value={value}
      onChange={(event) => {
        const raw = event.target.value as unknown;
        const next =
          typeof raw === 'string' ? raw.split(',') : (raw as string[]);
        onChange(next);
      }}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      disabled={disabled}
      InputLabelProps={{ shrink: true }}
      SelectProps={{
        multiple: true,
        displayEmpty: true,
        renderValue: (selected) => {
          const codes = selected as string[];
          if (!codes || codes.length === 0) {
            return <em style={{ color: '#9aa0a6' }}>{placeholder}</em>;
          }
          return codes
            .map((code) => labelByCode.get(code) ?? code)
            .join(', ');
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.code} value={option.code}>
          <Checkbox checked={value.includes(option.code)} />
          <ListItemText primary={option.label} />
        </MenuItem>
      ))}
    </TextField>
  );
}
