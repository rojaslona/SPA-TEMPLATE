/**
 * Página de Reservas - H&B SPA Jardín Balbuena
 * Sistema completo de reservas de citas
 */

function ReservationsPage() {
    const [selectedService, setSelectedService] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState('');
    const [selectedTime, setSelectedTime] = React.useState('');
    const [customerInfo, setCustomerInfo] = React.useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    const services = [
        { id: 'limpieza-facial', name: 'Limpieza Facial Profunda', duration: '60 min', price: 600 },
        { id: 'masaje-relajante', name: 'Masaje Relajante', duration: '90 min', price: 800 },
        { id: 'facial-antiedad', name: 'Facial Anti-edad', duration: '90 min', price: 1200 },
        { id: 'hydrafacial', name: 'HydraFacial Premium', duration: '75 min', price: 1500 },
        { id: 'tratamiento-reconstructor', name: 'Tratamiento Reconstructor Capilar', duration: '90 min', price: 900 },
        { id: 'dia-spa', name: 'Día de Spa Completo', duration: '4 horas', price: 2500 }
    ];

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', 
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de envío de reserva
        const reservationData = {
            service: selectedService,
            date: selectedDate,
            time: selectedTime,
            customer: customerInfo
        };
        
        // Mostrar notificación de éxito
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
        toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle me-2"></i>
                    ¡Reserva confirmada! Te contactaremos pronto.
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        setTimeout(() => document.body.removeChild(toast), 5000);

        // Limpiar formulario
        setSelectedService('');
        setSelectedDate('');
        setSelectedTime('');
        setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
    };

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header de reservas
            React.createElement('section', { className: 'bg-gradient-primary py-5' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h1', { className: 'display-4 fw-bold text-white mb-3' },
                                'Reservar Cita'
                            ),
                            React.createElement('p', { className: 'lead text-white mb-0' },
                                'Programa tu momento de relajación y belleza con nosotros'
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        // Formulario de reserva
                        React.createElement('div', { className: 'col-lg-8' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h4', { className: 'mb-0' },
                                        React.createElement('i', { className: 'bi bi-calendar-plus me-2' }),
                                        'Información de la Reserva'
                                    )
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('form', { className: 'form-custom', onSubmit: handleSubmit },
                                        // Selección de servicio
                                        React.createElement('div', { className: 'mb-4' },
                                            React.createElement('label', { className: 'form-label' }, 'Selecciona tu Servicio'),
                                            React.createElement('select', {
                                                className: 'form-control',
                                                value: selectedService,
                                                onChange: (e) => setSelectedService(e.target.value),
                                                required: true
                                            },
                                                React.createElement('option', { value: '' }, 'Elige un servicio...'),
                                                services.map(service =>
                                                    React.createElement('option', { key: service.id, value: service.id },
                                                        `${service.name} - ${service.duration} - $${service.price}`
                                                    )
                                                )
                                            )
                                        ),

                                        // Fecha y hora
                                        React.createElement('div', { className: 'row mb-4' },
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Fecha Preferida'),
                                                React.createElement('input', {
                                                    type: 'date',
                                                    className: 'form-control',
                                                    value: selectedDate,
                                                    onChange: (e) => setSelectedDate(e.target.value),
                                                    min: new Date().toISOString().split('T')[0],
                                                    required: true
                                                })
                                            ),
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Hora Preferida'),
                                                React.createElement('select', {
                                                    className: 'form-control',
                                                    value: selectedTime,
                                                    onChange: (e) => setSelectedTime(e.target.value),
                                                    required: true
                                                },
                                                    React.createElement('option', { value: '' }, 'Selecciona hora...'),
                                                    timeSlots.map(time =>
                                                        React.createElement('option', { key: time, value: time }, time)
                                                    )
                                                )
                                            )
                                        ),

                                        // Información del cliente
                                        React.createElement('h5', { className: 'mb-3 text-success' }, 'Información Personal'),
                                        
                                        React.createElement('div', { className: 'row mb-3' },
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Nombre Completo'),
                                                React.createElement('input', {
                                                    type: 'text',
                                                    className: 'form-control',
                                                    value: customerInfo.name,
                                                    onChange: (e) => setCustomerInfo({...customerInfo, name: e.target.value}),
                                                    required: true,
                                                    placeholder: 'Tu nombre completo'
                                                })
                                            ),
                                            React.createElement('div', { className: 'col-md-6' },
                                                React.createElement('label', { className: 'form-label' }, 'Teléfono'),
                                                React.createElement('input', {
                                                    type: 'tel',
                                                    className: 'form-control',
                                                    value: customerInfo.phone,
                                                    onChange: (e) => setCustomerInfo({...customerInfo, phone: e.target.value}),
                                                    required: true,
                                                    placeholder: '+52 55 1234-5678'
                                                })
                                            )
                                        ),

                                        React.createElement('div', { className: 'mb-3' },
                                            React.createElement('label', { className: 'form-label' }, 'Email'),
                                            React.createElement('input', {
                                                type: 'email',
                                                className: 'form-control',
                                                value: customerInfo.email,
                                                onChange: (e) => setCustomerInfo({...customerInfo, email: e.target.value}),
                                                required: true,
                                                placeholder: 'tu@email.com'
                                            })
                                        ),

                                        React.createElement('div', { className: 'mb-4' },
                                            React.createElement('label', { className: 'form-label' }, 'Comentarios Adicionales'),
                                            React.createElement('textarea', {
                                                className: 'form-control',
                                                rows: 3,
                                                value: customerInfo.notes,
                                                onChange: (e) => setCustomerInfo({...customerInfo, notes: e.target.value}),
                                                placeholder: 'Alergias, preferencias especiales, etc.'
                                            })
                                        ),

                                        React.createElement('button', {
                                            type: 'submit',
                                            className: 'btn btn-success-custom btn-lg w-100'
                                        },
                                            React.createElement('i', { className: 'bi bi-calendar-check me-2' }),
                                            'Confirmar Reserva'
                                        )
                                    )
                                )
                            )
                        ),

                        // Información adicional
                        React.createElement('div', { className: 'col-lg-4' },
                            React.createElement('div', { className: 'card card-custom mb-4' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h5', { className: 'mb-0' }, 'Información Importante')
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('ul', { className: 'list-unstyled' },
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-clock text-info me-2' }),
                                            'Llega 15 min antes de tu cita'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-phone text-success me-2' }),
                                            'Confirmamos por WhatsApp'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-calendar-x text-warning me-2' }),
                                            'Cancelación 24h antes'
                                        ),
                                        React.createElement('li', { className: 'mb-0' },
                                            React.createElement('i', { className: 'bi bi-heart text-danger me-2' }),
                                            'Disfruta tu momento de relax'
                                        )
                                    )
                                )
                            ),

                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h5', { className: 'mb-0' }, 'Contacto Directo')
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    React.createElement('p', { className: 'mb-3' },
                                        React.createElement('i', { className: 'bi bi-whatsapp text-success me-2' }),
                                        React.createElement('strong', null, 'WhatsApp:'),
                                        React.createElement('br'),
                                        '+52 55 1234-5678'
                                    ),
                                    React.createElement('p', { className: 'mb-3' },
                                        React.createElement('i', { className: 'bi bi-telephone text-primary me-2' }),
                                        React.createElement('strong', null, 'Teléfono:'),
                                        React.createElement('br'),
                                        '+52 55 1234-5678'
                                    ),
                                    React.createElement('p', { className: 'mb-0' },
                                        React.createElement('i', { className: 'bi bi-clock text-info me-2' }),
                                        React.createElement('strong', null, 'Horarios:'),
                                        React.createElement('br'),
                                        'Lun-Sáb: 9:00-20:00',
                                        React.createElement('br'),
                                        'Dom: 10:00-18:00'
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