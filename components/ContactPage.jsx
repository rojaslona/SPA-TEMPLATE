/**
 * Página de Contacto - H&B SPA Jardín Balbuena
 * Formulario de contacto y información de ubicación
 */

function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
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
        
        // Simulación de envío de mensaje
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
        toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle me-2"></i>
                    ¡Mensaje enviado! Te contactaremos pronto.
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        setTimeout(() => document.body.removeChild(toast), 5000);

        // Limpiar formulario
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: 'geo-alt',
            title: 'Dirección',
            details: [
                'Jardín Balbuena, Venustiano Carranza',
                'Ciudad de México, 15900',
                'México'
            ]
        },
        {
            icon: 'telephone',
            title: 'Teléfono',
            details: [
                '+52 55 1234-5678',
                'WhatsApp: +52 55 1234-5678'
            ]
        },
        {
            icon: 'envelope',
            title: 'Email',
            details: [
                'info@hbspa.com.mx',
                'reservas@hbspa.com.mx'
            ]
        },
        {
            icon: 'clock',
            title: 'Horarios',
            details: [
                'Lunes a Sábado: 9:00 - 20:00',
                'Domingos: 10:00 - 18:00',
                'Días festivos: Cerrado'
            ]
        }
    ];

    const socialLinks = [
        { icon: 'facebook', name: 'Facebook', url: '#' },
        { icon: 'instagram', name: 'Instagram', url: '#' },
        { icon: 'whatsapp', name: 'WhatsApp', url: '#' },
        { icon: 'tiktok', name: 'TikTok', url: '#' }
    ];

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header de contacto
            React.createElement('section', { className: 'bg-gradient-primary py-5' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h1', { className: 'display-4 fw-bold text-white mb-3' },
                                'Contáctanos'
                            ),
                            React.createElement('p', { className: 'lead text-white mb-0' },
                                'Estamos aquí para ayudarte. Ponte en contacto con nosotros'
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        // Formulario de contacto
                        React.createElement('div', { className: 'col-lg-8 mb-5' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h4', { className: 'mb-0' },
                                        React.createElement('i', { className: 'bi bi-envelope-heart me-2' }),
                                        'Envíanos un Mensaje'
                                    )
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('form', { className: 'form-custom', onSubmit: handleSubmit },
                                        React.createElement('div', { className: 'row mb-3' },
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Nombre Completo'),
                                                React.createElement('input', {
                                                    type: 'text',
                                                    className: 'form-control',
                                                    name: 'name',
                                                    value: formData.name,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    placeholder: 'Tu nombre completo'
                                                })
                                            ),
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Teléfono'),
                                                React.createElement('input', {
                                                    type: 'tel',
                                                    className: 'form-control',
                                                    name: 'phone',
                                                    value: formData.phone,
                                                    onChange: handleInputChange,
                                                    placeholder: '+52 55 1234-5678'
                                                })
                                            )
                                        ),

                                        React.createElement('div', { className: 'row mb-3' },
                                            React.createElement('div', { className: 'col-md-6' },
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
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Asunto'),
                                                React.createElement('select', {
                                                    className: 'form-control',
                                                    name: 'subject',
                                                    value: formData.subject,
                                                    onChange: handleInputChange,
                                                    required: true
                                                },
                                                    React.createElement('option', { value: '' }, 'Selecciona un asunto'),
                                                    React.createElement('option', { value: 'reserva' }, 'Consulta de Reserva'),
                                                    React.createElement('option', { value: 'servicios' }, 'Información de Servicios'),
                                                    React.createElement('option', { value: 'productos' }, 'Consulta de Productos'),
                                                    React.createElement('option', { value: 'queja' }, 'Queja o Sugerencia'),
                                                    React.createElement('option', { value: 'otro' }, 'Otro')
                                                )
                                            )
                                        ),

                                        React.createElement('div', { className: 'mb-4' },
                                            React.createElement('label', { className: 'form-label' }, 'Mensaje'),
                                            React.createElement('textarea', {
                                                className: 'form-control',
                                                name: 'message',
                                                value: formData.message,
                                                onChange: handleInputChange,
                                                rows: 5,
                                                required: true,
                                                placeholder: 'Escribe tu mensaje aquí...'
                                            })
                                        ),

                                        React.createElement('button', {
                                            type: 'submit',
                                            className: 'btn btn-success-custom btn-lg'
                                        },
                                            React.createElement('i', { className: 'bi bi-send me-2' }),
                                            'Enviar Mensaje'
                                        )
                                    )
                                )
                            )
                        ),

                        // Información de contacto
                        React.createElement('div', { className: 'col-lg-4' },
                            React.createElement('div', { className: 'card card-custom mb-4' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h5', { className: 'mb-0' }, 'Información de Contacto')
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    contactInfo.map((info, index) =>
                                        React.createElement('div', { key: index, className: 'mb-4' },
                                            React.createElement('div', { className: 'd-flex align-items-start' },
                                                React.createElement('i', { 
                                                    className: `bi bi-${info.icon} me-3 mt-1`,
                                                    style: { color: 'var(--teal-green)', fontSize: '1.2rem' }
                                                }),
                                                React.createElement('div', null,
                                                    React.createElement('h6', { className: 'fw-bold mb-1' }, info.title),
                                                    info.details.map((detail, idx) =>
                                                        React.createElement('p', { 
                                                            key: idx, 
                                                            className: 'text-muted small mb-1' 
                                                        }, detail)
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),

                            // Redes sociales
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h5', { className: 'mb-0' }, 'Síguenos')
                                ),
                                React.createElement('div', { className: 'card-body text-center' },
                                    React.createElement('p', { className: 'text-muted mb-3' },
                                        'Mantente al día con nuestras promociones y consejos de belleza'
                                    ),
                                    React.createElement('div', { className: 'd-flex justify-content-center gap-3' },
                                        socialLinks.map((social, index) =>
                                            React.createElement('a', {
                                                key: index,
                                                href: social.url,
                                                className: 'btn btn-outline-primary',
                                                style: { width: '50px', height: '50px' },
                                                title: social.name
                                            },
                                                React.createElement('i', { 
                                                    className: `bi bi-${social.icon}`,
                                                    style: { fontSize: '1.5rem' }
                                                })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Mapa (simulado)
            React.createElement('section', { className: 'py-5 bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-12' },
                            React.createElement('h2', { className: 'section-title' }, 'Nuestra Ubicación'),
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-body p-0' },
                                    // Simulación de mapa
                                    React.createElement('div', { 
                                        className: 'bg-gradient-secondary d-flex align-items-center justify-content-center',
                                        style: { height: '400px' }
                                    },
                                        React.createElement('div', { className: 'text-center text-white' },
                                            React.createElement('i', { 
                                                className: 'bi bi-geo-alt',
                                                style: { fontSize: '4rem' }
                                            }),
                                            React.createElement('h4', { className: 'mt-3' }, 'H&B SPA Jardín Balbuena'),
                                            React.createElement('p', { className: 'mb-3' }, 'Jardín Balbuena, Venustiano Carranza'),
                                            React.createElement('p', { className: 'small' },
                                                'Integración con Google Maps disponible'
                                            ),
                                            React.createElement('button', {
                                                className: 'btn btn-light mt-3'
                                            },
                                                React.createElement('i', { className: 'bi bi-navigation me-2' }),
                                                'Ver Directions'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // FAQ Section
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Preguntas Frecuentes'),
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto' },
                            React.createElement('div', { className: 'accordion', id: 'faqAccordion' },
                                [
                                    {
                                        question: '¿Necesito hacer cita previa?',
                                        answer: 'Sí, recomendamos hacer cita previa para garantizar disponibilidad. Puedes reservar a través de nuestra página web, WhatsApp o por teléfono.'
                                    },
                                    {
                                        question: '¿Qué métodos de pago aceptan?',
                                        answer: 'Aceptamos efectivo, tarjetas de débito y crédito (Visa, Mastercard), transferencias bancarias y pagos digitales como PayPal.'
                                    },
                                    {
                                        question: '¿Puedo cancelar o reagendar mi cita?',
                                        answer: 'Sí, puedes cancelar o reagendar tu cita hasta 24 horas antes sin costo adicional. Cancelaciones con menos tiempo pueden tener penalización.'
                                    },
                                    {
                                        question: '¿Ofrecen paquetes o membresías?',
                                        answer: 'Sí, tenemos diversos paquetes de tratamientos y membresías mensuales con descuentos especiales. Consulta nuestras promociones vigentes.'
                                    },
                                    {
                                        question: '¿Los productos que usan son seguros?',
                                        answer: 'Todos nuestros productos son de marcas reconocidas, dermatológicamente probados y seguros. Utilizamos ingredientes naturales cuando es posible.'
                                    }
                                ].map((faq, index) =>
                                    React.createElement('div', { key: index, className: 'accordion-item mb-3' },
                                        React.createElement('h2', { className: 'accordion-header' },
                                            React.createElement('button', {
                                                className: 'accordion-button collapsed',
                                                type: 'button',
                                                'data-bs-toggle': 'collapse',
                                                'data-bs-target': `#faq${index}`,
                                                'aria-expanded': 'false'
                                            }, faq.question)
                                        ),
                                        React.createElement('div', {
                                            id: `faq${index}`,
                                            className: 'accordion-collapse collapse',
                                            'data-bs-parent': '#faqAccordion'
                                        },
                                            React.createElement('div', { className: 'accordion-body' },
                                                faq.answer
                                            )
                                        )
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