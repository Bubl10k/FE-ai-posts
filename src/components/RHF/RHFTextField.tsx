import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { Error } from '@mui/icons-material';


type IProps = {
  name: string;
  showErrorIcon?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({
  name,
  showErrorIcon = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={
            error ? (
              showErrorIcon ? (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '-14px',
                    gap: '8px',
                  }}
                >
                  <Error sx={{ fontSize: '20px' }} />
                  {error.message}
                </span>
              ) : (
                error.message
              )
            ) : null
          }
          slotProps={{
            formHelperText: {
              style: { whiteSpace: 'pre-wrap' },
            },
          }}
          {...other}
        />
      )}
    />
  );
}
