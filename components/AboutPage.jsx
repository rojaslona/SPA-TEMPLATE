/**
 * Página Nosotros - H&B SPA Jardín Balbuena
 * Misión, visión, valores y filosofía del spa
 */

function AboutPage() {
    const { navigateTo } = useAppContext();

    const team = [
        {
            name: 'María Elena Rodríguez',
            position: 'Directora y Fundadora',
            experience: '15 años de experiencia',
            specialties: ['Gestión Spa', 'Tratamientos Faciales', 'Atención al Cliente'],
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face'
        },
        {
            name: 'Carmen Delgado',
            position: 'Especialista en Tratamientos Faciales',
            experience: '10 años de experiencia',
            specialties: ['HydraFacial', 'Anti-edad', 'Limpieza Profunda'],
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=400&fit=crop&crop=face'
        },
        {
            name: 'Ana Patricia Morales',
            position: 'Masajista Certificada',
            experience: '8 años de experiencia',
            specialties: ['Masaje Relajante', 'Tratamientos Corporales', 'Aromaterapia'],
            image: 'https://images.unsplash.com/photo-1594824735244-19e4d4e60cb4?w=300&h=400&fit=crop&crop=face'
        },
        {
            name: 'Gabriela Vázquez',
            position: 'Estilista Profesional',
            experience: '12 años de experiencia',
            specialties: ['Tratamientos Capilares', 'Corte y Peinado', 'Colorimetría'],
            image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=400&fit=crop&crop=face'
        }
    ];

    const values = [
        {
            icon: 'heart',
            title: 'Pasión por la Belleza',
            description: 'Cada tratamiento es una obra de arte dedicada a resaltar tu belleza natural.'
        },
        {
            icon: 'shield-check',
            title: 'Calidad Garantizada',
            description: 'Utilizamos solo productos premium y técnicas certificadas internacionalmente.'
        },
        {
            icon: 'people',
            title: 'Atención Personalizada',
            description: 'Cada cliente es único y merece un tratamiento diseñado especialmente para ella.'
        },
        {
            icon: 'leaf',
            title: 'Ingredientes Naturales',
            description: 'Priorizamos productos naturales y sustentables para cuidar tu piel y el planeta.'
        },
        {
            icon: 'clock',
            title: 'Puntualidad',
            description: 'Respetamos tu tiempo y garantizamos que cada cita sea una experiencia puntual.'
        },
        {
            icon: 'star',
            title: 'Excelencia Continua',
            description: 'Nos mantenemos actualizadas con las últimas tendencias y tecnologías en belleza.'
        }
    ];

    const milestones = [
        { year: '2018', event: 'Fundación de H&B SPA Jardín Balbuena' },
        { year: '2019', event: 'Incorporación de tratamientos HydraFacial' },
        { year: '2020', event: 'Certificación en protocolos de bioseguridad COVID-19' },
        { year: '2021', event: 'Expansión de servicios corporales y masajes' },
        { year: '2022', event: 'Reconocimiento "Mejor SPA Local" por la comunidad' },
        { year: '2023', event: 'Lanzamiento de línea de productos propios' },
        { year: '2024', event: 'Renovación completa de instalaciones' }
    ];

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Hero section
            React.createElement('section', { className: 'hero-section' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row align-items-center' },
                        React.createElement('div', { className: 'col-lg-6 hero-content' },
                            React.createElement('h1', { className: 'display-4 fw-bold mb-4' },
                                'Conoce ',
                                React.createElement('span', { className: 'text-gradient' }, 'Nuestra Historia')
                            ),
                            React.createElement('p', { className: 'lead mb-4' },
                                'Desde 2018, nos hemos dedicado a crear experiencias únicas de belleza y bienestar en el corazón de Jardín Balbuena.'
                            ),
                            React.createElement('button', {
                                className: 'btn btn-primary-custom btn-lg',
                                onClick: () => navigateTo('reservas')
                            },
                                React.createElement('i', { className: 'bi bi-calendar-heart me-2' }),
                                'Vive la Experiencia'
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-6' },
                            React.createElement('div', { className: 'text-center' },
                                React.createElement('i', { 
                                    className: 'bi bi-flower2 animate-pulse',
                                    style: { fontSize: '12rem', color: 'var(--mauve)' }
                                })
                            )
                        )
                    )
                )
            ),

            // Misión, Visión y Filosofía
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-4 mb-4' },
                            React.createElement('div', { className: 'card card-custom h-100 text-center' },
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('div', { className: 'mb-4' },
                                        React.createElement('i', { 
                                            className: 'bi bi-bullseye',
                                            style: { fontSize: '4rem', color: 'var(--teal-green)' }
                                        })
                                    ),
                                    React.createElement('h3', { className: 'text-success mb-3' }, 'Nuestra Misión'),
                                    React.createElement('p', { className: 'text-muted' },
                                        'Proporcionar tratamientos de belleza y bienestar de la más alta calidad, creando momentos de relajación y renovación que permitan a nuestras clientas sentirse hermosas, seguras y plenas.'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-4 mb-4' },
                            React.createElement('div', { className: 'card card-custom h-100 text-center' },
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('div', { className: 'mb-4' },
                                        React.createElement('i', { 
                                            className: 'bi bi-eye',
                                            style: { fontSize: '4rem', color: 'var(--mauve)' }
                                        })
                                    ),
                                    React.createElement('h3', { className: 'text-primary mb-3' }, 'Nuestra Visión'),
                                    React.createElement('p', { className: 'text-muted' },
                                        'Ser el spa de referencia en Jardín Balbuena y Ciudad de México, reconocido por la excelencia en nuestros servicios, la calidez humana y la innovación constante en tratamientos de belleza.'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-4 mb-4' },
                            React.createElement('div', { className: 'card card-custom h-100 text-center' },
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('div', { className: 'mb-4' },
                                        React.createElement('i', { 
                                            className: 'bi bi-flower1',
                                            style: { fontSize: '4rem', color: 'var(--light-pink)' }
                                        })
                                    ),
                                    React.createElement('h3', { className: 'text-info mb-3' }, 'Nuestra Filosofía'),
                                    React.createElement('p', { className: 'text-muted' },
                                        'Creemos que la belleza exterior es el reflejo del bienestar interior. Cada tratamiento es una oportunidad para conectar contigo misma, relajarte y renovar tu energía en un ambiente de paz y armonía.'
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Nuestros Valores
            React.createElement('section', { className: 'section-padding bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Nuestros Valores'),
                    React.createElement('div', { className: 'row' },
                        values.map((value, index) =>
                            React.createElement('div', { key: index, className: 'col-lg-4 col-md-6 mb-4' },
                                React.createElement('div', { className: 'card card-custom h-100' },
                                    React.createElement('div', { className: 'card-body text-center' },
                                        React.createElement('div', { className: 'mb-3' },
                                            React.createElement('i', { 
                                                className: `bi bi-${value.icon}`,
                                                style: { fontSize: '2.5rem', color: 'var(--teal-green)' }
                                            })
                                        ),
                                        React.createElement('h5', { className: 'card-title text-success' }, value.title),
                                        React.createElement('p', { className: 'card-text text-muted' }, value.description)
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Nuestro Equipo
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Nuestro Equipo Profesional'),
                    React.createElement('p', { className: 'text-center text-muted mb-5 lead' },
                        'Profesionales certificadas y apasionadas por la belleza y el bienestar'
                    ),
                    React.createElement('div', { className: 'row' },
                        team.map((member, index) =>
                            React.createElement('div', { key: index, className: 'col-lg-6 mb-4' },
                                React.createElement('div', { className: 'card card-custom h-100' },
                                    React.createElement('div', { className: 'row g-0' },
                                        React.createElement('div', { className: 'col-md-4' },
                                            React.createElement('img', {
                                                src: member.image,
                                                className: 'img-fluid rounded-start h-100',
                                                alt: member.name,
                                                style: { objectFit: 'cover' }
                                            })
                                        ),
                                        React.createElement('div', { className: 'col-md-8' },
                                            React.createElement('div', { className: 'card-body' },
                                                React.createElement('h5', { className: 'card-title text-success' }, member.name),
                                                React.createElement('p', { className: 'card-text fw-bold text-primary' }, member.position),
                                                React.createElement('p', { className: 'card-text text-muted small' }, member.experience),
                                                React.createElement('div', { className: 'mt-2' },
                                                    React.createElement('h6', { className: 'small fw-bold' }, 'Especialidades:'),
                                                    React.createElement('div', { className: 'd-flex flex-wrap gap-1' },
                                                        member.specialties.map((specialty, idx) =>
                                                            React.createElement('span', {
                                                                key: idx,
                                                                className: 'badge bg-light text-dark'
                                                            }, specialty)
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
                )
            ),

            // Línea de tiempo
            React.createElement('section', { className: 'section-padding bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Nuestra Trayectoria'),
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto' },
                            React.createElement('div', { className: 'timeline' },
                                milestones.map((milestone, index) =>
                                    React.createElement('div', { 
                                        key: index, 
                                        className: `d-flex align-items-center mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`
                                    },
                                        React.createElement('div', { className: 'flex-shrink-0' },
                                            React.createElement('div', { 
                                                className: 'rounded-circle bg-success text-white d-flex align-items-center justify-content-center',
                                                style: { width: '60px', height: '60px', fontSize: '1.2rem', fontWeight: 'bold' }
                                            }, milestone.year)
                                        ),
                                        React.createElement('div', { 
                                            className: `flex-grow-1 ${index % 2 === 0 ? 'ms-3' : 'me-3 text-end'}`
                                        },
                                            React.createElement('div', { className: 'card card-custom' },
                                                React.createElement('div', { className: 'card-body' },
                                                    React.createElement('p', { className: 'mb-0' }, milestone.event)
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

            // Call to action
            React.createElement('section', { className: 'section-padding bg-gradient-secondary' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h2', { className: 'text-white mb-4' }, '¿Lista para ser parte de nuestra historia?'),
                            React.createElement('p', { className: 'lead text-white mb-4' },
                                'Te invitamos a vivir una experiencia única de belleza y bienestar en nuestro spa'
                            ),
                            React.createElement('div', { className: 'd-flex gap-3 justify-content-center flex-wrap' },
                                React.createElement('button', {
                                    className: 'btn btn-light btn-lg',
                                    onClick: () => navigateTo('reservas')
                                },
                                    React.createElement('i', { className: 'bi bi-calendar-check me-2' }),
                                    'Reservar Cita'
                                ),
                                React.createElement('button', {
                                    className: 'btn btn-outline-light btn-lg',
                                    onClick: () => navigateTo('contacto')
                                },
                                    React.createElement('i', { className: 'bi bi-chat-dots me-2' }),
                                    'Contáctanos'
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}