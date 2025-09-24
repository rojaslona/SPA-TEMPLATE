/**
 * Panel de Administración - H&B SPA Jardín Balbuena
 * Interface amigable para gestionar productos, servicios y reservas
 */

function AdminPage() {
    const { user, navigateTo, logoutUser } = useAppContext();
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [products, setProducts] = React.useState([
        {
            id: 1,
            name: 'Crema Hidratante Premium',
            price: 450,
            category: 'facial',
            stock: 25,
            status: 'active'
        },
        {
            id: 2,
            name: 'Serum Vitamina C',
            price: 680,
            category: 'facial',
            stock: 15,
            status: 'active'
        },
        {
            id: 3,
            name: 'Mascarilla Purificante',
            price: 320,
            category: 'facial',
            stock: 30,
            status: 'active'
        }
    ]);
    
    const [services, setServices] = React.useState([
        {
            id: 1,
            name: 'Limpieza Facial Profunda',
            price: 600,
            duration: 60,
            status: 'active'
        },
        {
            id: 2,
            name: 'Masaje Relajante',
            price: 800,
            duration: 90,
            status: 'active'
        },
        {
            id: 3,
            name: 'HydraFacial Premium',
            price: 1500,
            duration: 75,
            status: 'active'
        }
    ]);

    const [reservations] = React.useState([
        {
            id: 1,
            customerName: 'María González',
            service: 'Limpieza Facial Profunda',
            date: '2024-12-26',
            time: '10:00',
            status: 'confirmed',
            phone: '+52 55 1234-5678'
        },
        {
            id: 2,
            customerName: 'Ana Martínez',
            service: 'Masaje Relajante',
            date: '2024-12-26',
            time: '14:00',
            status: 'pending',
            phone: '+52 55 9876-5432'
        },
        {
            id: 3,
            customerName: 'Carmen López',
            service: 'HydraFacial Premium',
            date: '2024-12-27',
            time: '11:00',
            status: 'confirmed',
            phone: '+52 55 5555-1234'
        }
    ]);

    // Verificar si el usuario es admin
    if (!user || user.role !== 'admin') {
        return (
            React.createElement('div', { className: 'section-padding text-center' },
                React.createElement('i', { 
                    className: 'bi bi-shield-exclamation',
                    style: { fontSize: '4rem', color: 'var(--medium-gray)' }
                }),
                React.createElement('h3', { className: 'mt-3' }, 'Acceso Restringido'),
                React.createElement('p', { className: 'text-muted' }, 'Esta página es solo para administradores.'),
                React.createElement('button', {
                    className: 'btn btn-primary-custom',
                    onClick: () => navigateTo('login')
                }, 'Iniciar Sesión')
            )
        );
    }

    const updateProductPrice = (productId, newPrice) => {
        setProducts(prev => prev.map(product => 
            product.id === productId ? { ...product, price: parseFloat(newPrice) } : product
        ));
        showNotification('Precio actualizado correctamente', 'success');
    };

    const updateServicePrice = (serviceId, newPrice) => {
        setServices(prev => prev.map(service => 
            service.id === serviceId ? { ...service, price: parseFloat(newPrice) } : service
        ));
        showNotification('Precio del servicio actualizado', 'success');
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

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'speedometer2' },
        { id: 'products', label: 'Productos', icon: 'bag' },
        { id: 'services', label: 'Servicios', icon: 'heart' },
        { id: 'reservations', label: 'Reservas', icon: 'calendar' },
        { id: 'analytics', label: 'Análisis', icon: 'graph-up' }
    ];

    const stats = {
        totalSales: 15750,
        monthlyReservations: 84,
        activeProducts: products.length,
        averageRating: 4.8
    };

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header del admin
            React.createElement('section', { className: 'bg-gradient-success py-4' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row align-items-center' },
                        React.createElement('div', { className: 'col-md-6' },
                            React.createElement('h1', { className: 'text-white mb-0' },
                                React.createElement('i', { className: 'bi bi-shield-check me-3' }),
                                'Panel de Administración'
                            ),
                            React.createElement('p', { className: 'text-white-50 mb-0' },
                                `Bienvenida, ${user.name}`
                            )
                        ),
                        React.createElement('div', { className: 'col-md-6 text-md-end' },
                            React.createElement('button', {
                                className: 'btn btn-light me-2',
                                onClick: () => navigateTo('inicio')
                            },
                                React.createElement('i', { className: 'bi bi-house me-1' }),
                                'Ver Sitio'
                            ),
                            React.createElement('button', {
                                className: 'btn btn-outline-light',
                                onClick: () => {
                                    logoutUser();
                                    navigateTo('inicio');
                                }
                            },
                                React.createElement('i', { className: 'bi bi-box-arrow-right me-1' }),
                                'Salir'
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container-fluid' },
                    React.createElement('div', { className: 'row' },
                        // Sidebar
                        React.createElement('div', { className: 'col-lg-3 col-md-4 mb-4' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-body p-0' },
                                    React.createElement('div', { className: 'list-group list-group-flush' },
                                        tabs.map(tab =>
                                            React.createElement('button', {
                                                key: tab.id,
                                                className: `list-group-item list-group-item-action d-flex align-items-center ${activeTab === tab.id ? 'active' : ''}`,
                                                onClick: () => setActiveTab(tab.id)
                                            },
                                                React.createElement('i', { className: `bi bi-${tab.icon} me-3` }),
                                                tab.label
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        // Contenido principal
                        React.createElement('div', { className: 'col-lg-9 col-md-8' },
                            // Dashboard
                            activeTab === 'dashboard' && React.createElement('div', null,
                                React.createElement('div', { className: 'row mb-4' },
                                    [
                                        { title: 'Ventas del Mes', value: `$${stats.totalSales.toLocaleString()}`, icon: 'currency-dollar', color: 'success' },
                                        { title: 'Reservas Mensuales', value: stats.monthlyReservations, icon: 'calendar-check', color: 'primary' },
                                        { title: 'Productos Activos', value: stats.activeProducts, icon: 'bag-check', color: 'info' },
                                        { title: 'Calificación Promedio', value: `${stats.averageRating} ⭐`, icon: 'star-fill', color: 'warning' }
                                    ].map((stat, index) =>
                                        React.createElement('div', { key: index, className: 'col-lg-3 col-md-6 mb-3' },
                                            React.createElement('div', { className: 'card card-custom' },
                                                React.createElement('div', { className: 'card-body text-center' },
                                                    React.createElement('i', { 
                                                        className: `bi bi-${stat.icon} mb-2`,
                                                        style: { fontSize: '2rem', color: `var(--bs-${stat.color})` }
                                                    }),
                                                    React.createElement('h4', { className: 'fw-bold' }, stat.value),
                                                    React.createElement('small', { className: 'text-muted' }, stat.title)
                                                )
                                            )
                                        )
                                    )
                                ),
                                
                                React.createElement('div', { className: 'card card-custom' },
                                    React.createElement('div', { className: 'card-header' },
                                        React.createElement('h5', { className: 'mb-0' }, 'Resumen del Sistema')
                                    ),
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('p', { className: 'mb-3' },
                                            'Sistema de gestión integral para H&B SPA con funcionalidades completas:'
                                        ),
                                        React.createElement('ul', { className: 'list-unstyled' },
                                            React.createElement('li', { className: 'mb-2' },
                                                React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                'Gestión de productos y precios en tiempo real'
                                            ),
                                            React.createElement('li', { className: 'mb-2' },
                                                React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                'Control de servicios y tarifas'
                                            ),
                                            React.createElement('li', { className: 'mb-2' },
                                                React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                'Monitoreo de reservas y calendario'
                                            ),
                                            React.createElement('li', { className: 'mb-2' },
                                                React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                'Análisis de ventas y métricas'
                                            ),
                                            React.createElement('li', { className: 'mb-0' },
                                                React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                'Compatible con APIs REST para integración Java 17'
                                            )
                                        )
                                    )
                                )
                            ),

                            // Gestión de Productos
                            activeTab === 'products' && React.createElement('div', null,
                                React.createElement('div', { className: 'card card-custom' },
                                    React.createElement('div', { className: 'card-header d-flex justify-content-between align-items-center' },
                                        React.createElement('h5', { className: 'mb-0' }, 'Gestión de Productos'),
                                        React.createElement('button', { className: 'btn btn-primary-custom btn-sm' },
                                            React.createElement('i', { className: 'bi bi-plus me-1' }),
                                            'Nuevo Producto'
                                        )
                                    ),
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('div', { className: 'table-responsive' },
                                            React.createElement('table', { className: 'table table-hover' },
                                                React.createElement('thead', null,
                                                    React.createElement('tr', null,
                                                        React.createElement('th', null, 'Producto'),
                                                        React.createElement('th', null, 'Categoría'),
                                                        React.createElement('th', null, 'Precio'),
                                                        React.createElement('th', null, 'Stock'),
                                                        React.createElement('th', null, 'Estado'),
                                                        React.createElement('th', null, 'Acciones')
                                                    )
                                                ),
                                                React.createElement('tbody', null,
                                                    products.map(product =>
                                                        React.createElement('tr', { key: product.id },
                                                            React.createElement('td', { className: 'fw-bold' }, product.name),
                                                            React.createElement('td', null,
                                                                React.createElement('span', { className: 'badge bg-light text-dark' }, product.category)
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('input', {
                                                                    type: 'number',
                                                                    className: 'form-control form-control-sm',
                                                                    style: { width: '100px' },
                                                                    value: product.price,
                                                                    onChange: (e) => updateProductPrice(product.id, e.target.value)
                                                                })
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('span', { 
                                                                    className: `badge ${product.stock > 10 ? 'bg-success' : product.stock > 5 ? 'bg-warning' : 'bg-danger'}`
                                                                }, product.stock)
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('span', { 
                                                                    className: `badge ${product.status === 'active' ? 'bg-success' : 'bg-secondary'}`
                                                                }, product.status === 'active' ? 'Activo' : 'Inactivo')
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('div', { className: 'btn-group btn-group-sm' },
                                                                    React.createElement('button', { className: 'btn btn-outline-primary' },
                                                                        React.createElement('i', { className: 'bi bi-pencil' })
                                                                    ),
                                                                    React.createElement('button', { className: 'btn btn-outline-danger' },
                                                                        React.createElement('i', { className: 'bi bi-trash' })
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

                            // Gestión de Servicios
                            activeTab === 'services' && React.createElement('div', null,
                                React.createElement('div', { className: 'card card-custom' },
                                    React.createElement('div', { className: 'card-header d-flex justify-content-between align-items-center' },
                                        React.createElement('h5', { className: 'mb-0' }, 'Gestión de Servicios'),
                                        React.createElement('button', { className: 'btn btn-success-custom btn-sm' },
                                            React.createElement('i', { className: 'bi bi-plus me-1' }),
                                            'Nuevo Servicio'
                                        )
                                    ),
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('div', { className: 'table-responsive' },
                                            React.createElement('table', { className: 'table table-hover' },
                                                React.createElement('thead', null,
                                                    React.createElement('tr', null,
                                                        React.createElement('th', null, 'Servicio'),
                                                        React.createElement('th', null, 'Duración (min)'),
                                                        React.createElement('th', null, 'Precio'),
                                                        React.createElement('th', null, 'Estado'),
                                                        React.createElement('th', null, 'Acciones')
                                                    )
                                                ),
                                                React.createElement('tbody', null,
                                                    services.map(service =>
                                                        React.createElement('tr', { key: service.id },
                                                            React.createElement('td', { className: 'fw-bold' }, service.name),
                                                            React.createElement('td', null, service.duration),
                                                            React.createElement('td', null,
                                                                React.createElement('input', {
                                                                    type: 'number',
                                                                    className: 'form-control form-control-sm',
                                                                    style: { width: '120px' },
                                                                    value: service.price,
                                                                    onChange: (e) => updateServicePrice(service.id, e.target.value)
                                                                })
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('span', { 
                                                                    className: `badge ${service.status === 'active' ? 'bg-success' : 'bg-secondary'}`
                                                                }, service.status === 'active' ? 'Activo' : 'Inactivo')
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('div', { className: 'btn-group btn-group-sm' },
                                                                    React.createElement('button', { className: 'btn btn-outline-primary' },
                                                                        React.createElement('i', { className: 'bi bi-pencil' })
                                                                    ),
                                                                    React.createElement('button', { className: 'btn btn-outline-danger' },
                                                                        React.createElement('i', { className: 'bi bi-trash' })
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

                            // Gestión de Reservas
                            activeTab === 'reservations' && React.createElement('div', null,
                                React.createElement('div', { className: 'card card-custom' },
                                    React.createElement('div', { className: 'card-header' },
                                        React.createElement('h5', { className: 'mb-0' }, 'Reservas Recientes')
                                    ),
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('div', { className: 'table-responsive' },
                                            React.createElement('table', { className: 'table table-hover' },
                                                React.createElement('thead', null,
                                                    React.createElement('tr', null,
                                                        React.createElement('th', null, 'Cliente'),
                                                        React.createElement('th', null, 'Servicio'),
                                                        React.createElement('th', null, 'Fecha'),
                                                        React.createElement('th', null, 'Hora'),
                                                        React.createElement('th', null, 'Teléfono'),
                                                        React.createElement('th', null, 'Estado'),
                                                        React.createElement('th', null, 'Acciones')
                                                    )
                                                ),
                                                React.createElement('tbody', null,
                                                    reservations.map(reservation =>
                                                        React.createElement('tr', { key: reservation.id },
                                                            React.createElement('td', { className: 'fw-bold' }, reservation.customerName),
                                                            React.createElement('td', null, reservation.service),
                                                            React.createElement('td', null, reservation.date),
                                                            React.createElement('td', null, reservation.time),
                                                            React.createElement('td', null, reservation.phone),
                                                            React.createElement('td', null,
                                                                React.createElement('span', { 
                                                                    className: `badge ${reservation.status === 'confirmed' ? 'bg-success' : reservation.status === 'pending' ? 'bg-warning' : 'bg-danger'}`
                                                                }, reservation.status === 'confirmed' ? 'Confirmada' : reservation.status === 'pending' ? 'Pendiente' : 'Cancelada')
                                                            ),
                                                            React.createElement('td', null,
                                                                React.createElement('div', { className: 'btn-group btn-group-sm' },
                                                                    React.createElement('button', { className: 'btn btn-outline-success' },
                                                                        React.createElement('i', { className: 'bi bi-check' })
                                                                    ),
                                                                    React.createElement('button', { className: 'btn btn-outline-danger' },
                                                                        React.createElement('i', { className: 'bi bi-x' })
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

                            // Análisis
                            activeTab === 'analytics' && React.createElement('div', null,
                                React.createElement('div', { className: 'card card-custom mb-4' },
                                    React.createElement('div', { className: 'card-header' },
                                        React.createElement('h5', { className: 'mb-0' }, 'Análisis y Métricas')
                                    ),
                                    React.createElement('div', { className: 'card-body text-center' },
                                        React.createElement('i', { 
                                            className: 'bi bi-graph-up',
                                            style: { fontSize: '4rem', color: 'var(--teal-green)' }
                                        }),
                                        React.createElement('h4', { className: 'mt-3 mb-3' }, 'Análisis Avanzado'),
                                        React.createElement('p', { className: 'text-muted mb-4' },
                                            'Integración con herramientas de análisis y reporting'
                                        ),
                                        React.createElement('div', { className: 'row' },
                                            React.createElement('div', { className: 'col-md-6 mb-3' },
                                                React.createElement('div', { className: 'card bg-light' },
                                                    React.createElement('div', { className: 'card-body' },
                                                        React.createElement('h6', null, 'Google Analytics'),
                                                        React.createElement('p', { className: 'small text-muted' }, 'Seguimiento de visitantes y conversiones')
                                                    )
                                                )
                                            ),
                                            React.createElement('div', { className: 'col-md-6 mb-3' },
                                                React.createElement('div', { className: 'card bg-light' },
                                                    React.createElement('div', { className: 'card-body' },
                                                        React.createElement('h6', null, 'Reportes de Ventas'),
                                                        React.createElement('p', { className: 'small text-muted' }, 'Análisis detallado de ingresos')
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
        )
    );
}