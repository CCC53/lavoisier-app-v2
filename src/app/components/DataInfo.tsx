import dynamic from 'next/dynamic';

const Paper = dynamic(() => import('@mui/material/Paper'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

const Info = dynamic(() => import('@mui/icons-material/Info'), { ssr: false });

export default function DataInfo({ message }: { message: string }) {
    return (
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 650 }, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', px: 2,
                py: 2,
                mx: 'auto',
            }}>
                <Typography sx={{
                    fontSize: { xs: '1.2rem', sm: '1.6rem' },
                    fontWeight: 700,
                    color: 'primary.main',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    { message }
                </Typography>
                <Info sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} color='primary' />
            </Box>
        </Paper>
    )
}