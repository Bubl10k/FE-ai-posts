import Header from '../../layout/Header.tsx';
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/RHF/FormProvider.tsx';
import RHFTextField from '../../components/RHF/RHFTextField.tsx';
import {
  useUpdateUserMutation,
  useUploadUserAvatarMutation,
} from '../../api/extentedApi.ts';
import React, { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

type UpdateUserFormValues = {
  name: string;
  email: string;
  username: string;
  about: string;
};

const EditProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user } = useTypedSelector(state => state.auth);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.avatar as string | null,
  );

  const defaultValues = useMemo(
    () => ({
      name: user?.username || '',
      email: user?.email || '',
      username: user?.username || '',
      about: user?.about || '',
    }),
    [user?.username, user?.email, user?.about],
  );

  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    username: yup.string().required('Username is required'),
    about: yup.string().required('About is required'),
  });

  const methods = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const [uploadAvatar] = useUploadUserAvatarMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (!user) {
        toast.error('User not found');
        return;
      }

      await uploadAvatar({ userId: user!.id, formData: formData }).unwrap();
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to upload avatar: ${error?.message}`);
    }
  };

  const onSubmit = async (data: UpdateUserFormValues) => {
    try {
      if (!user) {
        toast.error('User not found');
        return;
      }

      const body = {
        id: user.id,
        email: data.email,
        username: data.username,
        about: data.about,
      };

      await updateUser(body).unwrap();
      toast.success('User updated successfully');
      navigate(ROUTES.profile(user.id));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to update user: ${error?.message}`);
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '2rem' }}>
        <Stack
          direction="column"
          gap="16px"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.01)',
            width: '40%',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            // textAlign: 'center',
            p: '2rem',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap="16px">
              <Typography variant="h1" fontSize="1.5rem" fontWeight={600}>
                User
              </Typography>
              <Stack gap="8px">
                <Typography variant="body1" fontWeight={400}>
                  Name
                </Typography>
                <RHFTextField
                  name="name"
                  placeholder="John Doe"
                  size="small"
                  sx={{ width: '100%' }}
                />
              </Stack>
              <Stack gap="8px">
                <Typography variant="body1" fontWeight={400}>
                  Email
                </Typography>
                <RHFTextField
                  name="email"
                  placeholder="john.doe@example.com"
                  size="small"
                  sx={{ width: '100%' }}
                />
              </Stack>
              <Stack gap="8px">
                <Typography variant="body1" fontWeight={400}>
                  Username
                </Typography>
                <RHFTextField
                  name="name"
                  placeholder="johndoe"
                  size="small"
                  sx={{ width: '100%' }}
                />
              </Stack>
              <Stack gap="8px">
                <Typography>Profile image</Typography>
                <Stack direction="row" gap="16px" alignItems="center">
                  {previewImage && (
                    <Avatar src={previewImage} sx={{ width: 64, height: 64 }} />
                  )}
                  <Box>
                    <Button variant="contained" component="label">
                      Upload Avatar
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Box>
                </Stack>
                <Stack gap="8px">
                  <Typography variant="body1" fontWeight={400}>
                    About
                  </Typography>
                  <RHFTextField
                    name="about"
                    placeholder="johndoe"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ pt: 3 }}>
              <Button type="submit" variant="contained">
                Save Profile
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
      </Box>
    </>
  );
};

export default EditProfilePage;
