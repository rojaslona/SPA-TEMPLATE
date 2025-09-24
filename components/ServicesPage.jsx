/**
 * Página de Servicios - H&B SPA Jardín Balbuena
 * Catálogo completo de servicios de belleza y bienestar
 */

function ServicesPage() {
    const { navigateTo } = useAppContext();

    const serviceCategories = [
        {
            id: 'facial',
            name: 'Tratamientos Faciales',
            icon: 'droplet',
            color: 'var(--light-pink)',
            services: [
                {
                    id: 1,
                    name: 'Limpieza Facial Profunda',
                    duration: '60 min',
                    price: 600,
                    description: 'Limpieza profunda con extracción de puntos negros y mascarilla purificante.',
                    benefits: ['Elimina impurezas', 'Reduce poros', 'Piel luminosa', 'Hidratación profunda'],
                    process: ['Desmaquillado', 'Exfoliación', 'Vaporización', 'Extracción', 'Mascarilla', 'Hidratación']
                },
                {
                    id: 2,
                    name: 'Facial Anti-edad',
                    duration: '90 min',
                    price: 1200,
                    description: 'Tratamiento especializado para combatir los signos de envejecimiento.',
                    benefits: ['Reduce arrugas', 'Mejora elasticidad', 'Estimula colágeno', 'Efecto lifting'],
                    process: ['Análisis de piel', 'Limpieza', 'Peeling enzimático', 'Masaje facial', 'Mascarilla', 'Suero']
                },
                {
                    id: 3,
                    name: 'HydraFacial Premium',
                    duration: '75 min',
                    price: 1500,
                    description: 'Tratamiento revolucionario que combina limpieza, exfoliación e hidratación.',
                    benefits: ['Hidratación inmediata', 'Piel sedosa', 'Reduce líneas finas', 'Brillo natural'],
                    process: ['Limpieza', 'Exfoliación', 'Extracción suave', 'Hidratación', 'Protección']
                }
            ]
        },
        {
            id: 'corporal',
            name: 'Tratamientos Corporales',
            icon: 'heart',
            color: 'var(--mauve)',
            services: [
                {
                    id: 4,
                    name: 'Masaje Relajante',
                    duration: '60 min',
                    price: 800,
                    description: 'Masaje con aceites esenciales para relajar cuerpo y mente.',
                    benefits: ['Reduce estrés', 'Mejora circulación', 'Alivia tensión', 'Relajación profunda'],
                    process: ['Consulta', 'Preparación', 'Masaje sueco', 'Aromaterapia', 'Hidratación']
                },
                {
                    id: 5,
                    name: 'Exfoliación Corporal',
                    duration: '45 min',
                    price: 650,
                    description: 'Renovación completa de la piel con sales marinas y aceites nutritivos.',
                    benefits: ['Piel suave', 'Elimina células muertas', 'Estimula renovación', 'Hidratación'],
                    process: ['Preparación', 'Exfoliación', 'Enjuague', 'Masaje', 'Hidratación']
                },
                {
                    id: 6,
                    name: 'Envoltura Detox',
                    duration: '90 min',
                    price: 1100,
                    description: 'Tratamiento desintoxicante con arcillas y algas marinas.',
                    benefits: ['Desintoxica', 'Reduce medidas', 'Mejora textura', 'Reafirma piel'],
                    process: ['Exfoliación', 'Aplicación de arcilla', 'Envoltura', 'Masaje', 'Hidratación']
                }
            ]
        },
        {
            id: 'cabello',
            name: 'Cuidado Capilar',
            icon: 'scissors',
            color: 'var(--teal-green)',
            services: [
                {
                    id: 7,
                    name: 'Tratamiento Reconstructor',
                    duration: '90 min',
                    price: 900,
                    description: 'Reconstrucción profunda para cabello dañado con keratina y proteínas.',
                    benefits: ['Repara fibra capilar', 'Fortalece', 'Brillo intenso', 'Reduce quiebre'],
                    process: ['Diagnóstico', 'Lavado', 'Aplicación', 'Calor', 'Sellado', 'Peinado']
                },
                {
                    id: 8,
                    name: 'Hidratación Intensiva',
                    duration: '60 min',
                    price: 700,
                    description: 'Mascarilla nutritiva con aceites naturales para cabello seco.',
                    benefits: ['Hidrata profundamente', 'Suaviza', 'Controla frizz', 'Facilita peinado'],
                    process: ['Lavado', 'Diagnóstico', 'Mascarilla', 'Masaje', 'Enjuague', 'Acabado']
                }
            ]
        },
        {
            id: 'especiales',
            name: 'Servicios Especiales',
            icon: 'star',
            color: 'var(--lime-green)',
            services: [
                {
                    id: 9,
                    name: 'Día de Spa Completo',
                    duration: '4 horas',
                    price: 2500,
                    oldPrice: 3000,
                    description: 'Experiencia completa de relajación y belleza.',
                    benefits: ['Relajación total', 'Renovación completa', 'Experiencia única', 'Cuidado integral'],
                    process: ['Recepción', 'Facial', 'Masaje', 'Corporal', 'Cabello', 'Lunch saludable']
                },
                {
                    id: 10,
                    name: 'Paquete Novias',
                    duration: '3 horas',
                    price: 2200,
                    description: 'Preparación especial para el día más importante.',
                    benefits: ['Look perfecto', 'Piel radiante', 'Cabello impecable', 'Maquillaje duradero'],
                    process: ['Consulta', 'Facial express', 'Peinado', 'Maquillaje', 'Retoques finales']
                }
            ]
        }
    ];

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header de servicios
            React.createElement('section', { className: 'bg-gradient-success py-5' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h1', { className: 'display-4 fw-bold text-white mb-3' },
                                'Nuestros Servicios'
                            ),
                            React.createElement('p', { className: 'lead text-white mb-4' },
                                'Experimenta la excelencia en tratamientos de belleza y bienestar con nuestros profesionales certificados'
                            ),
                            React.createElement('button', {
                                className: 'btn btn-light btn-lg',
                                onClick: () => navigateTo('reservas')
                            },
                                React.createElement('i', { className: 'bi bi-calendar-check me-2' }),
                                'Reservar Cita'
                            )
                        )
                    )
                )
            ),

            // Categorías de servicios
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    serviceCategories.map(category =>
                        React.createElement('div', { key: category.id, className: 'mb-5' },
                            React.createElement('div', { className: 'row mb-4' },
                                React.createElement('div', { className: 'col-12' },
                                    React.createElement('div', { 
                                        className: 'd-flex align-items-center mb-4',
                                        style: { borderLeft: `4px solid ${category.color}`, paddingLeft: '20px' }
                                    },
                                        React.createElement('i', { 
                                            className: `bi bi-${category.icon} me-3`,
                                            style: { fontSize: '2rem', color: category.color }
                                        }),
                                        React.createElement('h2', { className: 'section-title mb-0 text-start' },
                                            category.name
                                        )
                                    )
                                )
                            ),
                            
                            React.createElement('div', { className: 'row' },
                                category.services.map(service =>
                                    React.createElement('div', { key: service.id, className: 'col-lg-6 mb-4' },
                                        React.createElement('div', { className: 'card card-custom h-100' },
                                            React.createElement('div', { className: 'card-body' },
                                                React.createElement('div', { className: 'd-flex justify-content-between align-items-start mb-3' },
                                                    React.createElement('h5', { className: 'card-title' }, service.name),
                                                    React.createElement('div', { className: 'text-end' },
                                                        React.createElement('div', { className: 'product-price' }, `$${service.price}`),
                                                        service.oldPrice && React.createElement('div', { className: 'product-old-price' }, `$${service.oldPrice}`),
                                                        React.createElement('small', { className: 'text-muted d-block' }, service.duration)
                                                    )
                                                ),
                                                
                                                React.createElement('p', { className: 'card-text text-muted mb-3' },
                                                    service.description
                                                ),
                                                
                                                // Beneficios
                                                React.createElement('div', { className: 'mb-3' },
                                                    React.createElement('h6', { className: 'text-success mb-2' }, 'Beneficios:'),
                                                    React.createElement('div', { className: 'row' },
                                                        service.benefits.map((benefit, index) =>
                                                            React.createElement('div', { key: index, className: 'col-6' },
                                                                React.createElement('small', { className: 'text-muted d-block mb-1' },
                                                                    React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-1' }),
                                                                    benefit
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                                
                                                // Proceso
                                                React.createElement('div', { className: 'mb-4' },
                                                    React.createElement('h6', { className: 'text-primary mb-2' }, 'Proceso:'),
                                                    React.createElement('div', { className: 'd-flex flex-wrap gap-1' },
                                                        service.process.map((step, index) =>
                                                            React.createElement('span', {
                                                                key: index,
                                                                className: 'badge bg-light text-dark border'
                                                            }, `${index + 1}. ${step}`)
                                                        )
                                                    )
                                                ),
                                                
                                                React.createElement('div', { className: 'mt-auto' },
                                                    React.createElement('button', {
                                                        className: 'btn btn-primary-custom w-100',
                                                        onClick: () => navigateTo('reservas')
                                                    },
                                                        React.createElement('i', { className: 'bi bi-calendar-plus me-2' }),
                                                        'Reservar Este Servicio'
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
            ),

            // Sección de promociones
            React.createElement('section', { className: 'section-padding bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-12 text-center' },
                            React.createElement('h2', { className: 'section-title' }, 'Promociones Especiales'),
                            React.createElement('div', { className: 'row mt-4' },
                                React.createElement('div', { className: 'col-md-4 mb-4' },
                                    React.createElement('div', { className: 'card card-gradient h-100' },
                                        React.createElement('div', { className: 'card-body text-center' },
                                            React.createElement('i', { 
                                                className: 'bi bi-people-fill',
                                                style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                            }),
                                            React.createElement('h5', { className: 'mt-3 mb-2' }, 'Paquete Amigas'),
                                            React.createElement('p', { className: 'small mb-3' },
                                                'Ven con una amiga y ambas obtienen 15% de descuento'
                                            ),
                                            React.createElement('span', { className: 'badge bg-success' }, '15% OFF')
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'col-md-4 mb-4' },
                                    React.createElement('div', { className: 'card card-gradient h-100' },
                                        React.createElement('div', { className: 'card-body text-center' },
                                            React.createElement('i', { 
                                                className: 'bi bi-calendar-month',
                                                style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                            }),
                                            React.createElement('h5', { className: 'mt-3 mb-2' }, 'Membresía Mensual'),
                                            React.createElement('p', { className: 'small mb-3' },
                                                'Acceso a todos los servicios con descuento especial'
                                            ),
                                            React.createElement('span', { className: 'badge bg-success' }, 'Desde $1,500/mes')
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'col-md-4 mb-4' },
                                    React.createElement('div', { className: 'card card-gradient h-100' },
                                        React.createElement('div', { className: 'card-body text-center' },
                                            React.createElement('i', { 
                                                className: 'bi bi-gift',
                                                style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                            }),
                                            React.createElement('h5', { className: 'mt-3 mb-2' }, 'Primera Visita'),
                                            React.createElement('p', { className: 'small mb-3' },
                                                'Disfruta de 20% de descuento en tu primer tratamiento'
                                            ),
                                            React.createElement('span', { className: 'badge bg-success' }, '20% OFF')
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Call to action
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h2', { className: 'mb-4' }, '¿Lista para tu transformación?'),
                            React.createElement('p', { className: 'lead text-muted mb-4' },
                                'Nuestros expertos están listos para brindarte la mejor experiencia de belleza y bienestar'
                            ),
                            React.createElement('div', { className: 'd-flex gap-3 justify-content-center flex-wrap' },
                                React.createElement('button', {
                                    className: 'btn btn-success-custom btn-lg',
                                    onClick: () => navigateTo('reservas')
                                },
                                    React.createElement('i', { className: 'bi bi-calendar-check me-2' }),
                                    'Reservar Ahora'
                                ),
                                React.createElement('button', {
                                    className: 'btn btn-outline-primary btn-lg',
                                    onClick: () => navigateTo('contacto')
                                },
                                    React.createElement('i', { className: 'bi bi-chat-dots me-2' }),
                                    'Consultar'
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}