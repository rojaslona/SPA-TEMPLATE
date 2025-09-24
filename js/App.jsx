/**
 * H&B SPA Jardín Balbuena - Aplicación Principal
 * Template de e-commerce para spa de belleza
 * Usando React + Bootstrap con paleta de colores personalizada
 */

// Estado global de la aplicación
const AppContext = React.createContext();

// Hook personalizado para usar el contexto
const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext debe ser usado dentro de AppProvider');
    }
    return context;
};

// Componente principal de la aplicación
function App() {
    const [currentPage, setCurrentPage] = React.useState('inicio');
    const [theme, setTheme] = React.useState('light');
    const [cartItems, setCartItems] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // Efecto para aplicar el tema
    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Funciones para manejar el carrito
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Función para cambiar de tema
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Función para navegar entre páginas
    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    // Función para autenticar usuario
    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    // Valor del contexto
    const contextValue = {
        currentPage,
        theme,
        cartItems,
        user,
        isLoading,
        setIsLoading,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        toggleTheme,
        navigateTo,
        loginUser,
        logoutUser
    };

    return (
        React.createElement(AppContext.Provider, { value: contextValue },
            React.createElement('div', { className: 'App' },
                React.createElement(Navbar),
                React.createElement(MainContent),
                React.createElement(Footer)
            )
        )
    );
}

// Componente de navegación
function Navbar() {
    const { currentPage, navigateTo, theme, toggleTheme, getCartItemCount } = useAppContext();

    const navItems = [
        { key: 'inicio', label: 'Inicio', icon: 'house' },
        { key: 'productos', label: 'Productos', icon: 'bag' },
        { key: 'servicios', label: 'Servicios', icon: 'heart' },
        { key: 'reservas', label: 'Reservas', icon: 'calendar' },
        { key: 'nosotros', label: 'Nosotros', icon: 'people' },
        { key: 'contacto', label: 'Contacto', icon: 'envelope' }
    ];

    return (
        React.createElement('nav', { className: 'navbar navbar-expand-lg navbar-custom fixed-top' },
            React.createElement('div', { className: 'container' },
                React.createElement('a', { 
                    className: 'navbar-brand', 
                    href: '#',
                    onClick: (e) => { e.preventDefault(); navigateTo('inicio'); }
                },
                    React.createElement('i', { className: 'bi bi-flower1 me-2' }),
                    'H&B SPA Jardín Balbuena'
                ),
                
                React.createElement('button', {
                    className: 'navbar-toggler',
                    type: 'button',
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#navbarNav'
                },
                    React.createElement('span', { className: 'navbar-toggler-icon' })
                ),

                React.createElement('div', { className: 'collapse navbar-collapse', id: 'navbarNav' },
                    React.createElement('ul', { className: 'navbar-nav me-auto' },
                        navItems.map(item =>
                            React.createElement('li', { key: item.key, className: 'nav-item' },
                                React.createElement('a', {
                                    className: `nav-link ${currentPage === item.key ? 'active' : ''}`,
                                    href: '#',
                                    onClick: (e) => { e.preventDefault(); navigateTo(item.key); }
                                },
                                    React.createElement('i', { className: `bi bi-${item.icon} me-1` }),
                                    item.label
                                )
                            )
                        )
                    ),

                    React.createElement('div', { className: 'd-flex align-items-center gap-3' },
                        // Botón de carrito
                        React.createElement('button', {
                            className: 'btn position-relative',
                            onClick: () => navigateTo('carrito'),
                            'aria-label': 'Ver carrito'
                        },
                            React.createElement('i', { className: 'bi bi-cart3 fs-5' }),
                            getCartItemCount() > 0 && React.createElement('span', {
                                className: 'cart-badge'
                            }, getCartItemCount())
                        ),

                        // Toggle de tema
                        React.createElement('button', {
                            className: 'theme-toggle',
                            onClick: toggleTheme,
                            'aria-label': 'Cambiar tema'
                        },
                            React.createElement('i', { 
                                className: `bi bi-${theme === 'light' ? 'moon' : 'sun'}` 
                            })
                        ),

                        // Botón de login
                        React.createElement('button', {
                            className: 'btn btn-primary-custom',
                            onClick: () => navigateTo('login')
                        },
                            React.createElement('i', { className: 'bi bi-person me-1' }),
                            'Ingresar'
                        )
                    )
                )
            )
        )
    );
}

// Componente de contenido principal que renderiza la página actual
function MainContent() {
    const { currentPage } = useAppContext();

    const renderPage = () => {
        switch (currentPage) {
            case 'inicio': return React.createElement(HomePage);
            case 'productos': return React.createElement(ProductsPage);
            case 'servicios': return React.createElement(ServicesPage);
            case 'reservas': return React.createElement(ReservationsPage);
            case 'nosotros': return React.createElement(AboutPage);
            case 'contacto': return React.createElement(ContactPage);
            case 'carrito': return React.createElement(CartPage);
            case 'login': return React.createElement(LoginPage);
            case 'admin': return React.createElement(AdminPage);
            default: return React.createElement(HomePage);
        }
    };

    return (
        React.createElement('main', { style: { paddingTop: '80px', minHeight: '100vh' } },
            renderPage()
        )
    );
}

// Página de inicio
function HomePage() {
    const { addToCart, navigateTo } = useAppContext();

    const featuredProducts = [
        {
            id: 1,
            name: 'Crema Hidratante Premium',
            price: 450,
            oldPrice: 500,
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop',
            category: 'Cuidado Facial'
        },
        {
            id: 2,
            name: 'Mascarilla Revitalizante',
            price: 320,
            image: 'https://images.unsplash.com/photo-1570194065650-d99fb4beaa0a?w=300&h=200&fit=crop',
            category: 'Tratamientos'
        },
        {
            id: 3,
            name: 'Serum Anti-edad',
            price: 680,
            oldPrice: 750,
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
            category: 'Anti-edad'
        }
    ];

    const services = [
        {
            id: 1,
            name: 'Limpieza Facial Profunda',
            price: 600,
            duration: '60 min',
            icon: 'droplet'
        },
        {
            id: 2,
            name: 'Masaje Relajante',
            price: 800,
            duration: '90 min',
            icon: 'heart'
        },
        {
            id: 3,
            name: 'Tratamiento Anti-edad',
            price: 1200,
            duration: '120 min',
            icon: 'star'
        }
    ];

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Hero Section
            React.createElement('section', { className: 'hero-section' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row align-items-center' },
                        React.createElement('div', { className: 'col-lg-6 hero-content' },
                            React.createElement('h1', { className: 'display-4 fw-bold mb-4' },
                                'Bienvenida a ',
                                React.createElement('span', { className: 'text-gradient' }, 'H&B SPA')
                            ),
                            React.createElement('p', { className: 'lead mb-4' },
                                'Descubre la belleza y el bienestar en nuestro exclusivo spa. Tratamientos de última generación con productos premium para tu cuidado personal.'
                            ),
                            React.createElement('div', { className: 'd-flex gap-3 flex-wrap' },
                                React.createElement('button', {
                                    className: 'btn btn-primary-custom btn-lg',
                                    onClick: () => navigateTo('reservas')
                                },
                                    React.createElement('i', { className: 'bi bi-calendar-check me-2' }),
                                    'Reservar Cita'
                                ),
                                React.createElement('button', {
                                    className: 'btn btn-secondary-custom btn-lg',
                                    onClick: () => navigateTo('productos')
                                },
                                    React.createElement('i', { className: 'bi bi-bag me-2' }),
                                    'Ver Productos'
                                )
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-6' },
                            React.createElement('div', { className: 'text-center' },
                                React.createElement('i', { 
                                    className: 'bi bi-flower1 animate-pulse',
                                    style: { fontSize: '15rem', color: 'var(--teal-green)' }
                                })
                            )
                        )
                    )
                )
            ),

            // Servicios destacados
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Nuestros Servicios'),
                    React.createElement('div', { className: 'row' },
                        services.map(service =>
                            React.createElement('div', { key: service.id, className: 'col-md-4 mb-4' },
                                React.createElement('div', { className: 'card card-custom text-center h-100' },
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('div', { className: 'mb-3' },
                                            React.createElement('i', { 
                                                className: `bi bi-${service.icon}`,
                                                style: { fontSize: '3rem', color: 'var(--teal-green)' }
                                            })
                                        ),
                                        React.createElement('h5', { className: 'card-title' }, service.name),
                                        React.createElement('p', { className: 'text-muted mb-3' }, service.duration),
                                        React.createElement('div', { className: 'product-price' }, `$${service.price}`),
                                        React.createElement('button', {
                                            className: 'btn btn-primary-custom mt-3',
                                            onClick: () => navigateTo('reservas')
                                        }, 'Reservar')
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Productos destacados
            React.createElement('section', { className: 'section-padding bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h2', { className: 'section-title' }, 'Productos Destacados'),
                    React.createElement('div', { className: 'row' },
                        featuredProducts.map(product =>
                            React.createElement('div', { key: product.id, className: 'col-md-4 mb-4' },
                                React.createElement('div', { className: 'card product-card h-100' },
                                    React.createElement('img', {
                                        src: product.image,
                                        className: 'card-img-top product-image',
                                        alt: product.name
                                    }),
                                    React.createElement('div', { className: 'card-body' },
                                        React.createElement('h5', { className: 'card-title' }, product.name),
                                        React.createElement('p', { className: 'text-muted small mb-2' }, product.category),
                                        React.createElement('div', { className: 'd-flex align-items-center mb-3' },
                                            React.createElement('span', { className: 'product-price' }, `$${product.price}`),
                                            product.oldPrice && React.createElement('span', { 
                                                className: 'product-old-price ms-2' 
                                            }, `$${product.oldPrice}`)
                                        ),
                                        React.createElement('button', {
                                            className: 'btn btn-success-custom w-100',
                                            onClick: () => addToCart(product)
                                        },
                                            React.createElement('i', { className: 'bi bi-cart-plus me-2' }),
                                            'Agregar al Carrito'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'text-center mt-4' },
                        React.createElement('button', {
                            className: 'btn btn-primary-custom btn-lg',
                            onClick: () => navigateTo('productos')
                        },
                            'Ver Todos los Productos',
                            React.createElement('i', { className: 'bi bi-arrow-right ms-2' })
                        )
                    )
                )
            ),

            // Promociones especiales
            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row align-items-center' },
                        React.createElement('div', { className: 'col-lg-6' },
                            React.createElement('div', { className: 'card card-gradient p-4' },
                                React.createElement('h3', { className: 'fw-bold mb-3' }, '🌸 Promoción Especial'),
                                React.createElement('p', { className: 'mb-3' },
                                    'Lleva 2 productos de cuidado facial y obtén 20% de descuento en tu próximo tratamiento.'
                                ),
                                React.createElement('button', {
                                    className: 'btn btn-success-custom',
                                    onClick: () => navigateTo('productos')
                                }, 'Aprovechar Oferta')
                            )
                        ),
                        React.createElement('div', { className: 'col-lg-6' },
                            React.createElement('div', { className: 'text-center' },
                                React.createElement('i', { 
                                    className: 'bi bi-gift',
                                    style: { fontSize: '8rem', color: 'var(--lime-green)' }
                                })
                            )
                        )
                    )
                )
            )
        )
    );
}

// Componente Footer
function Footer() {
    return (
        React.createElement('footer', { className: 'footer-custom mt-5' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'row' },
                    React.createElement('div', { className: 'col-md-4 mb-4' },
                        React.createElement('h5', { className: 'footer-title' },
                            React.createElement('i', { className: 'bi bi-flower1 me-2' }),
                            'H&B SPA Jardín Balbuena'
                        ),
                        React.createElement('p', { className: 'mb-3' },
                            'Tu destino de belleza y bienestar. Tratamientos profesionales con los más altos estándares de calidad.'
                        ),
                        React.createElement('div', { className: 'd-flex gap-3' },
                            React.createElement('a', { href: '#', className: 'footer-link' },
                                React.createElement('i', { className: 'bi bi-facebook fs-5' })
                            ),
                            React.createElement('a', { href: '#', className: 'footer-link' },
                                React.createElement('i', { className: 'bi bi-instagram fs-5' })
                            ),
                            React.createElement('a', { href: '#', className: 'footer-link' },
                                React.createElement('i', { className: 'bi bi-whatsapp fs-5' })
                            )
                        )
                    ),
                    React.createElement('div', { className: 'col-md-4 mb-4' },
                        React.createElement('h5', { className: 'footer-title' }, 'Enlaces Rápidos'),
                        React.createElement('ul', { className: 'list-unstyled' },
                            ['Servicios', 'Productos', 'Reservas', 'Nosotros', 'Contacto'].map(link =>
                                React.createElement('li', { key: link, className: 'mb-2' },
                                    React.createElement('a', { href: '#', className: 'footer-link' }, link)
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'col-md-4 mb-4' },
                        React.createElement('h5', { className: 'footer-title' }, 'Contacto'),
                        React.createElement('p', { className: 'mb-2' },
                            React.createElement('i', { className: 'bi bi-geo-alt me-2' }),
                            'Jardín Balbuena, Ciudad de México'
                        ),
                        React.createElement('p', { className: 'mb-2' },
                            React.createElement('i', { className: 'bi bi-phone me-2' }),
                            '+52 55 1234-5678'
                        ),
                        React.createElement('p', { className: 'mb-2' },
                            React.createElement('i', { className: 'bi bi-envelope me-2' }),
                            'info@hbspa.com.mx'
                        )
                    )
                ),
                React.createElement('hr', { className: 'mt-4 mb-3' }),
                React.createElement('div', { className: 'row' },
                    React.createElement('div', { className: 'col-md-6' },
                        React.createElement('p', { className: 'mb-0' },
                            '© 2024 H&B SPA Jardín Balbuena. Todos los derechos reservados.'
                        )
                    ),
                    React.createElement('div', { className: 'col-md-6 text-md-end' },
                        React.createElement('p', { className: 'mb-0' },
                            React.createElement('i', { className: 'bi bi-shield-check me-2' }),
                            'Sitio seguro con HTTPS'
                        )
                    )
                )
            )
        )
    );
}

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));