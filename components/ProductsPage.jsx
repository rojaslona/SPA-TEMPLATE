/**
 * Página de Productos - H&B SPA Jardín Balbuena
 * Catálogo completo de productos organizados por categorías
 */

function ProductsPage() {
    const { addToCart } = useAppContext();
    const [selectedCategory, setSelectedCategory] = React.useState('todos');
    const [searchTerm, setSearchTerm] = React.useState('');

    const categories = [
        { id: 'todos', name: 'Todos los Productos', icon: 'grid' },
        { id: 'facial', name: 'Cuidado Facial', icon: 'droplet' },
        { id: 'corporal', name: 'Cuidado Corporal', icon: 'heart' },
        { id: 'cabello', name: 'Cuidado del Cabello', icon: 'scissors' },
        { id: 'antiedad', name: 'Anti-edad', icon: 'star' },
        { id: 'limpieza', name: 'Limpieza', icon: 'soap' }
    ];

    const products = [
        // Cuidado Facial
        {
            id: 1,
            name: 'Crema Hidratante Premium',
            price: 450,
            oldPrice: 500,
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop',
            category: 'facial',
            description: 'Crema hidratante con ingredientes naturales para todo tipo de piel.',
            benefits: ['Hidratación profunda', 'Textura ligera', '24h de protección']
        },
        {
            id: 2,
            name: 'Serum Vitamina C',
            price: 680,
            oldPrice: 750,
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
            category: 'facial',
            description: 'Serum antioxidante con vitamina C para iluminar la piel.',
            benefits: ['Ilumina la piel', 'Reduce manchas', 'Antioxidante natural']
        },
        {
            id: 3,
            name: 'Mascarilla Purificante',
            price: 320,
            image: 'https://images.unsplash.com/photo-1570194065650-d99fb4beaa0a?w=300&h=200&fit=crop',
            category: 'facial',
            description: 'Mascarilla de arcilla para limpiar profundamente los poros.',
            benefits: ['Limpieza profunda', 'Reduce grasa', 'Minimiza poros']
        },
        
        // Cuidado Corporal
        {
            id: 4,
            name: 'Loción Corporal Nutritiva',
            price: 380,
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop',
            category: 'corporal',
            description: 'Loción hidratante con manteca de karité para piel suave.',
            benefits: ['Nutrición intensa', 'Piel sedosa', 'Aroma relajante']
        },
        {
            id: 5,
            name: 'Exfoliante Corporal',
            price: 420,
            oldPrice: 480,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
            category: 'corporal',
            description: 'Exfoliante suave con sales marinas y aceites esenciales.',
            benefits: ['Elimina células muertas', 'Suaviza la piel', 'Estimula circulación']
        },
        
        // Cuidado del Cabello
        {
            id: 6,
            name: 'Shampoo Reparador',
            price: 290,
            image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=300&h=200&fit=crop',
            category: 'cabello',
            description: 'Shampoo reparador para cabello dañado con keratina.',
            benefits: ['Repara el cabello', 'Fortalece', 'Brillo natural']
        },
        {
            id: 7,
            name: 'Mascarilla Capilar',
            price: 350,
            image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=300&h=200&fit=crop',
            category: 'cabello',
            description: 'Tratamiento intensivo para cabello seco y maltratado.',
            benefits: ['Hidratación profunda', 'Reduce frizz', 'Cabello sedoso']
        },
        
        // Anti-edad
        {
            id: 8,
            name: 'Contorno de Ojos',
            price: 720,
            image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=200&fit=crop',
            category: 'antiedad',
            description: 'Crema específica para el contorno de ojos con péptidos.',
            benefits: ['Reduce arrugas', 'Descongestiona', 'Efecto lifting']
        },
        {
            id: 9,
            name: 'Crema Anti-edad Noche',
            price: 890,
            oldPrice: 950,
            image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop',
            category: 'antiedad',
            description: 'Crema regeneradora nocturna con retinol y colágeno.',
            benefits: ['Regenera la piel', 'Reduce líneas', 'Textura firme']
        },
        
        // Limpieza
        {
            id: 10,
            name: 'Gel Limpiador',
            price: 250,
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=200&fit=crop',
            category: 'limpieza',
            description: 'Gel limpiador suave para uso diario en todo tipo de piel.',
            benefits: ['Limpieza suave', 'No reseca', 'pH balanceado']
        },
        {
            id: 11,
            name: 'Tónico Facial',
            price: 280,
            image: 'https://images.unsplash.com/photo-1570194065650-d99fb4beaa0a?w=300&h=200&fit=crop',
            category: 'limpieza',
            description: 'Tónico equilibrante con agua de rosas y ácido hialurónico.',
            benefits: ['Equilibra pH', 'Refresca', 'Prepara la piel']
        }
    ];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header de productos
            React.createElement('section', { className: 'bg-gradient-primary py-5' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('h1', { className: 'display-4 fw-bold text-white mb-3' },
                                'Nuestros Productos'
                            ),
                            React.createElement('p', { className: 'lead text-white mb-0' },
                                'Descubre nuestra selección premium de productos para tu cuidado personal'
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    // Filtros y búsqueda
                    React.createElement('div', { className: 'row mb-4' },
                        React.createElement('div', { className: 'col-md-8' },
                            // Categorías
                            React.createElement('div', { className: 'd-flex flex-wrap gap-2 mb-3' },
                                categories.map(category =>
                                    React.createElement('button', {
                                        key: category.id,
                                        className: `btn ${selectedCategory === category.id ? 'btn-primary-custom' : 'btn-outline-secondary'}`,
                                        onClick: () => setSelectedCategory(category.id)
                                    },
                                        React.createElement('i', { className: `bi bi-${category.icon} me-1` }),
                                        category.name
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'col-md-4' },
                            // Barra de búsqueda
                            React.createElement('div', { className: 'input-group' },
                                React.createElement('span', { className: 'input-group-text' },
                                    React.createElement('i', { className: 'bi bi-search' })
                                ),
                                React.createElement('input', {
                                    type: 'text',
                                    className: 'form-control',
                                    placeholder: 'Buscar productos...',
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value)
                                })
                            )
                        )
                    ),

                    // Grid de productos
                    React.createElement('div', { className: 'row' },
                        filteredProducts.length === 0 ?
                            React.createElement('div', { className: 'col-12 text-center py-5' },
                                React.createElement('i', { 
                                    className: 'bi bi-search',
                                    style: { fontSize: '4rem', color: 'var(--medium-gray)' }
                                }),
                                React.createElement('h4', { className: 'mt-3 text-muted' },
                                    'No se encontraron productos'
                                ),
                                React.createElement('p', { className: 'text-muted' },
                                    'Intenta con otros términos de búsqueda o categoría'
                                )
                            ) :
                            filteredProducts.map(product =>
                                React.createElement('div', { key: product.id, className: 'col-lg-4 col-md-6 mb-4' },
                                    React.createElement('div', { className: 'card product-card h-100' },
                                        React.createElement('img', {
                                            src: product.image,
                                            className: 'card-img-top product-image',
                                            alt: product.name
                                        }),
                                        React.createElement('div', { className: 'card-body d-flex flex-column' },
                                            React.createElement('h5', { className: 'card-title' }, product.name),
                                            React.createElement('p', { className: 'card-text text-muted small mb-2' },
                                                product.description
                                            ),
                                            
                                            // Beneficios
                                            React.createElement('ul', { className: 'list-unstyled small mb-3' },
                                                product.benefits.map((benefit, index) =>
                                                    React.createElement('li', { key: index, className: 'mb-1' },
                                                        React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                                        benefit
                                                    )
                                                )
                                            ),
                                            
                                            React.createElement('div', { className: 'mt-auto' },
                                                React.createElement('div', { className: 'd-flex align-items-center justify-content-between mb-3' },
                                                    React.createElement('div', null,
                                                        React.createElement('span', { className: 'product-price' }, `$${product.price}`),
                                                        product.oldPrice && React.createElement('span', { 
                                                            className: 'product-old-price ms-2' 
                                                        }, `$${product.oldPrice}`)
                                                    ),
                                                    product.oldPrice && React.createElement('span', {
                                                        className: 'badge bg-success'
                                                    }, `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`)
                                                ),
                                                React.createElement('button', {
                                                    className: 'btn btn-success-custom w-100',
                                                    onClick: () => {
                                                        addToCart(product);
                                                        // Mostrar notificación
                                                        const toast = document.createElement('div');
                                                        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
                                                        toast.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
                                                        toast.innerHTML = `
                                                            <div class="d-flex">
                                                                <div class="toast-body">
                                                                    <i class="bi bi-check-circle me-2"></i>
                                                                    ${product.name} agregado al carrito
                                                                </div>
                                                            </div>
                                                        `;
                                                        document.body.appendChild(toast);
                                                        const bsToast = new bootstrap.Toast(toast);
                                                        bsToast.show();
                                                        setTimeout(() => document.body.removeChild(toast), 3000);
                                                    }
                                                },
                                                    React.createElement('i', { className: 'bi bi-cart-plus me-2' }),
                                                    'Agregar al Carrito'
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