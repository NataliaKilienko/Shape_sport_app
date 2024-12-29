import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactPage: React.FC = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: false, email: false, message: false });
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, message } = formValues;
        const newErrors = {
            name: !name.trim(),
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
            message: !message.trim(),
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some((error) => error)) {
            setSuccessMessage(true);
            setFormValues({ name: '', email: '', message: '' });
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontWeight: 'bold',
                    color: '#FFA500',
                    textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9)',
                    animation: 'fadeInTitle 1.5s ease-in-out',
                    '@keyframes fadeInTitle': {
                        '0%': { opacity: 0, transform: 'translateY(-20px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                }}
            >
                Get In Touch
            </Typography>

            <Grid container spacing={6} sx={{ maxWidth: '1200px', marginBottom: '50px' }}>
                {[
                    {
                        icon: <Email />,
                        label: 'Email',
                        value: 'support@shape.com',
                    },
                    {
                        icon: <Phone />,
                        label: 'Phone',
                        value: '+123-456-7890',
                    },
                    {
                        icon: <LocationOn />,
                        label: 'Location',
                        value: '123 Shape Street, Fitness City, SH 45678',
                    },
                ].map(({ icon, label, value }, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                animation: 'scaleIn 1.2s ease-in-out',
                                '@keyframes scaleIn': {
                                    '0%': { opacity: 0, transform: 'scale(0.9)' },
                                    '100%': { opacity: 1, transform: 'scale(1)' },
                                },
                            }}
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: '#FFA500',
                                    color: '#1e1e2f',
                                    marginBottom: '10px',
                                    '&:hover': {
                                        backgroundColor: '#FF8C00',
                                    },
                                }}
                            >
                                {icon}
                            </IconButton>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                {label}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
                                {value}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: '800px',
                    width: '100%',
                    backgroundColor: '#262626',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeInForm 1.5s ease-in-out',
                    '@keyframes fadeInForm': {
                        '0%': { opacity: 0, transform: 'translateY(20px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                }}
            >
                <Grid container spacing={3}>
                    {[
                        { name: 'name', label: 'Your Name', value: formValues.name, error: errors.name },
                        { name: 'email', label: 'Your Email', value: formValues.email, error: errors.email },
                    ].map(({ name, label, value, error }, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <TextField
                                fullWidth
                                label={label}
                                name={name}
                                variant="outlined"
                                value={value}
                                error={error}
                                helperText={error ? `Please enter a valid ${label.toLowerCase()}` : ''}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: '#262626',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#FFA500' },
                                        '&:hover fieldset': { borderColor: '#FF8C00' },
                                        '&.Mui-focused fieldset': { borderColor: '#FFA500' },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#AAAAAA',
                                        '&.Mui-focused': { color: '#FFA500' },
                                    },
                                    input: { color: '#FFFFFF' },
                                }}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Your Message"
                            name="message"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formValues.message}
                            error={errors.message}
                            helperText={errors.message ? 'Please enter your message' : ''}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: '#262626',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#FFA500' },
                                    '&:hover fieldset': { borderColor: '#FF8C00' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFA500' },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#AAAAAA',
                                    '&.Mui-focused': { color: '#FFA500' },
                                },
                                input: { color: '#FFFFFF' },
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        marginTop: '20px',
                        padding: '12px 40px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        backgroundColor: '#FFA500',
                        color: '#1e1e2f',
                        boxShadow: '0px 6px 20px rgba(255, 140, 0, 0.5)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                            transform: 'scale(1.05)',
                            boxShadow: '0px 8px 25px rgba(255, 140, 0, 0.7)',
                        },
                    }}
                >
                    Send Message
                </Button>
            </Box>

            <Snackbar
                open={successMessage}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Message sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactPage;
