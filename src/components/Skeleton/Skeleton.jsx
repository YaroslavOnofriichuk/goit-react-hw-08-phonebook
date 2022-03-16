import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const MySkeleton = ({ pathname }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: '600px',
        padding: '20px',
        margin: 'auto',
      }}
    >
      <Skeleton variant="rectangular" sx={{ height: '40px', width: '150px' }} />
      <Skeleton variant="rectangular" sx={{ height: '70px' }} />
      <Skeleton variant="rectangular" sx={{ height: '70px' }} />

      {pathname === '/register' && (
        <Skeleton variant="rectangular" sx={{ height: '70px' }} />
      )}

      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ height: '50px', width: '150px', mt: '10px' }}
        />
      </Stack>
      {pathname === '/contacts' && (
        <>
          <Skeleton
            variant="rectangular"
            sx={{ height: '40px', width: '150px' }}
          />
          <Skeleton variant="rectangular" sx={{ height: '70px' }} />
        </>
      )}
    </Stack>
  );
};
