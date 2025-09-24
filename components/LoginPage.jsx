/**
 * Página de Autenticación - H&B SPA Jardín Balbuena
 * Login y registro de usuarios
 */

function LoginPage() {
    const { loginUser, navigateTo } = useAppContext();
    const [isLogin, setIsLogin] = React.useState(true);
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isLogin && formData.password !== formData.confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }

        // Simulación de autenticación
        const userData = {
            id: Date.now(),
            name: isLogin ? 'Usuario Demo' : formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.email === 'admin@hbspa.com.mx' ? 'admin' : 'customer'
        };

        loginUser(userData);
        showNotification(
            isLogin ? '¡Bienvenida de vuelta!' : '¡Cuenta creada exitosamente!', 
            'success'
        );
        
        // Redirigir según el rol
        if (userData.role === 'admin') {
            navigateTo('admin');
        } else {
            navigateTo('inicio');
        }
    };

    const showNotification = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${type === 'success' ? 'bg-success' : 'bg-danger'} border-0 position-fixed`;
        toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                    ${message}
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        setTimeout(() => document.body.removeChild(toast), 3000);
    };

    const handleDemoLogin = (role) => {
        const demoUsers = {
            customer: {
                id: 1,
                name: 'María González',
                email: 'maria@email.com',
                phone: '+52 55 1234-5678',
                role: 'customer'
            },
            admin: {
                id: 2,
                name: 'Administrador',
                email: 'admin@hbspa.com.mx',
                phone: '+52 55 9876-5432',
                role: 'admin'
            }
        };

        loginUser(demoUsers[role]);
        showNotification(`Bienvenida como ${role === 'admin' ? 'Administrador' : 'Cliente'}`, 'success');
        navigateTo(role === 'admin' ? 'admin' : 'inicio');
    };

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row justify-content-center' },
                        React.createElement('div', { className: 'col-lg-6 col-md-8' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header text-center' },
                                    React.createElement('div', { className: 'mb-3' },
                                        React.createElement('i', { 
                                            className: 'bi bi-flower1',
                                            style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                        })
                                    ),
                                    React.createElement('h3', { className: 'text-gradient mb-0' },
                                        isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
                                    )
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    // Toggle entre Login y Registro
                                    React.createElement('div', { className: 'btn-group w-100 mb-4' },
                                        React.createElement('button', {
                                            type: 'button',
                                            className: `btn ${isLogin ? 'btn-primary-custom' : 'btn-outline-secondary'}`,
                                            onClick: () => setIsLogin(true)
                                        }, 'Iniciar Sesión'),
                                        React.createElement('button', {
                                            type: 'button',
                                            className: `btn ${!isLogin ? 'btn-primary-custom' : 'btn-outline-secondary'}`,
                                            onClick: () => setIsLogin(false)
                                        }, 'Registrarse')
                                    ),

                                    React.createElement('form', { className: 'form-custom', onSubmit: handleSubmit },
                                        // Campos para registro
                                        !isLogin && React.createElement('div', { className: 'mb-3' },
                                            React.createElement('label', { className: 'form-label' }, 'Nombre Completo'),
                                            React.createElement('input', {
                                                type: 'text',
                                                className: 'form-control',
                                                name: 'name',
                                                value: formData.name,
                                                onChange: handleInputChange,
                                                required: !isLogin,
                                                placeholder: 'Tu nombre completo'
                                            })
                                        ),

                                        !isLogin && React.createElement('div', { className: 'mb-3' },
                                            React.createElement('label', { className: 'form-label' }, 'Teléfono'),
                                            React.createElement('input', {
                                                type: 'tel',
                                                className: 'form-control',
                                                name: 'phone',
                                                value: formData.phone,
                                                onChange: handleInputChange,
                                                placeholder: '+52 55 1234-5678'
                                            })
                                        ),

                                        // Email
                                        React.createElement('div', { className: 'mb-3' },
                                            React.createElement('label', { className: 'form-label' }, 'Email'),
                                            React.createElement('input', {
                                                type: 'email',
                                                className: 'form-control',
                                                name: 'email',
                                                value: formData.email,
                                                onChange: handleInputChange,
                                                required: true,
                                                placeholder: 'tu@email.com'
                                            })
                                        ),

                                        // Contraseña
                                        React.createElement('div', { className: 'mb-3' },
                                            React.createElement('label', { className: 'form-label' }, 'Contraseña'),
                                            React.createElement('input', {
                                                type: 'password',
                                                className: 'form-control',
                                                name: 'password',
                                                value: formData.password,
                                                onChange: handleInputChange,
                                                required: true,
                                                placeholder: '••••••••'
                                            })
                                        ),

                                        // Confirmar contraseña (solo registro)
                                        !isLogin && React.createElement('div', { className: 'mb-4' },
                                            React.createElement('label', { className: 'form-label' }, 'Confirmar Contraseña'),
                                            React.createElement('input', {
                                                type: 'password',
                                                className: 'form-control',
                                                name: 'confirmPassword',
                                                value: formData.confirmPassword,
                                                onChange: handleInputChange,
                                                required: !isLogin,
                                                placeholder: '••••••••'
                                            })
                                        ),

                                        React.createElement('button', {
                                            type: 'submit',
                                            className: 'btn btn-success-custom w-100 mb-3'
                                        },
                                            React.createElement('i', { className: `bi bi-${isLogin ? 'box-arrow-in-right' : 'person-plus'} me-2` }),
                                            isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
                                        )
                                    ),

                                    // Separador
                                    React.createElement('div', { className: 'text-center my-4' },
                                        React.createElement('span', { className: 'text-muted' }, 'o')
                                    ),

                                    // Botones demo
                                    React.createElement('div', { className: 'text-center' },
                                        React.createElement('p', { className: 'text-muted small mb-3' }, 'Cuentas de demostración:'),
                                        React.createElement('div', { className: 'd-grid gap-2' },
                                            React.createElement('button', {
                                                type: 'button',
                                                className: 'btn btn-outline-primary',
                                                onClick: () => handleDemoLogin('customer')
                                            },
                                                React.createElement('i', { className: 'bi bi-person me-2' }),
                                                'Demo Cliente'
                                            ),
                                            React.createElement('button', {
                                                type: 'button',
                                                className: 'btn btn-outline-warning',
                                                onClick: () => handleDemoLogin('admin')
                                            },
                                                React.createElement('i', { className: 'bi bi-shield-check me-2' }),
                                                'Demo Administrador'
                                            )
                                        )
                                    ),

                                    isLogin && React.createElement('div', { className: 'text-center mt-4' },
                                        React.createElement('small', { className: 'text-muted' },
                                            '¿Olvidaste tu contraseña? ',
                                            React.createElement('a', { href: '#', className: 'text-decoration-none' }, 'Recuperar')
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Información de seguridad
            React.createElement('section', { className: 'py-5 bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-body text-center' },
                                    React.createElement('i', { 
                                        className: 'bi bi-shield-lock',
                                        style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                    }),
                                    React.createElement('h4', { className: 'mt-3 mb-3' }, 'Tu Información está Segura'),
                                    React.createElement('div', { className: 'row' },
                                        React.createElement('div', { className: 'col-md-4 mb-3' },
                                            React.createElement('i', { className: 'bi bi-lock-fill text-success mb-2 d-block fs-4' }),
                                            React.createElement('small', null, 'Cifrado SSL 256-bit')
                                        ),
                                        React.createElement('div', { className: 'col-md-4 mb-3' },
                                            React.createElement('i', { className: 'bi bi-eye-slash-fill text-primary mb-2 d-block fs-4' }),
                                            React.createElement('small', null, 'Datos Privados')
                                        ),
                                        React.createElement('div', { className: 'col-md-4 mb-3' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-info mb-2 d-block fs-4' }),
                                            React.createElement('small', null, 'GDPR Compliance')
                                        )
                                    ),
                                    React.createElement('p', { className: 'text-muted small mt-3 mb-0' },
                                        'Utilizamos los más altos estándares de seguridad para proteger tu información personal y de pago.'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}