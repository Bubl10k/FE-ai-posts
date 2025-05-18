import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ROUTES } from '../../../routes/routes.ts';
import FormProvider from '../../../components/RHF/FormProvider.tsx';
import { useActions } from '../../../hooks/useActions.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '../../../components/RHF/RHFTextField.tsx';
import { useEffect, useState } from 'react';
import { localStorageService } from '../../../utils/localStorage.ts';
import {
  useGetCurrentUserQuery,
  useLoginMutation,
} from '../../../api/extentedApi.ts';
import { toast } from 'react-toastify';

type AuthFormInputs = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .test(
      'email-length',
      'Email local part cannot exceed 64 characters and domain part cannot exceed 255 characters',
      value => {
        if (!value) return true;

        const parts = value.split('@');
        if (parts.length !== 2) return false;

        const [localPart, domainPart] = parts;
        return localPart.length <= 64 && domainPart.length <= 255;
      },
    )
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters'),
});

const LoginPage = () => {
  const { setUser } = useActions();
  const navigate = useNavigate();
  const [skipGetUser, setSkipGetUser] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { data: currentUser } = useGetCurrentUserQuery(
    {},
    { skip: skipGetUser },
  );
  const [login] = useLoginMutation();

  const methods = useForm<AuthFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: AuthFormInputs) => {
    try {
      const response = await login(data).unwrap();
      if (response.access_token && response.refresh_token) {
        localStorageService.setAccessToken(response.access_token);
        localStorageService.setRefreshToken(response.refresh_token);
        setSkipGetUser(false);
      }
    } catch (e) {
      toast.error('Invalid email or password. Please try again.');
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorageService.setUser(currentUser);
      setUser(currentUser);
      navigate(ROUTES.root);
    }
  }, [currentUser, navigate, setUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Stack direction="column" gap={1} sx={{ textAlign: 'center' }}>
        <Typography
          color="textPrimary"
          sx={{ fontSize: '1.85rem', fontWeight: 'bold' }}
        >
          Join the Our community
        </Typography>
        <Typography color="textSecondary" variant="body1">
          DEV Community is a community of 3,115,982 amazing developers
        </Typography>
        <Divider sx={{ p: 2 }} />
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack spacing={2} sx={{ width: '500px' }}>
            <Box>
              <Typography sx={{ py: 1 }}>Email</Typography>
              <RHFTextField
                name="email"
                fullWidth
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box>
              <Typography sx={{ py: 1 }}>Password</Typography>
              <RHFTextField
                name="password"
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e: any) => e.preventDefault()}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={
                  <>
                    <Checkbox defaultChecked />
                  </>
                }
                label={<label htmlFor="user_remember_me">Remember me</label>}
              />
              <Link underline="hover">
                <Typography>Forgot password?</Typography>
              </Link>
            </Box>

            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ p: 1 }}
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Box>
            <Typography color="textSecondary" fontSize={14} fontStyle="italic">
              By signing in, you are agreeing to our privacy policy, terms of
              use and code of conduct.
            </Typography>
            <Divider />
            <Typography sx={{ textAlign: 'center' }}>
              New to Our Community?{' '}
              <Link href={ROUTES.signup} underline="hover">
                Create account.
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default LoginPage;
