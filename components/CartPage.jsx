/**
 * Página del Carrito de Compras - H&B SPA Jardín Balbuena
 * Funcionalidad completa del carrito con cálculos y checkout
 */

function CartPage() {
    const { 
        cartItems, 
        updateCartQuantity, 
        removeFromCart, 
        clearCart, 
        getCartTotal,
        navigateTo 
    } = useAppContext();
    
    const [promoCode, setPromoCode] = React.useState('');
    const [discount, setDiscount] = React.useState(0);
    const [showCheckout, setShowCheckout] = React.useState(false);

    const validPromoCodes = {
        'BIENVENIDA10': 0.1,
        'VERANO20': 0.2,
        'CLIENTE25': 0.25
    };

    const applyPromoCode = () => {
        if (validPromoCodes[promoCode]) {
            setDiscount(validPromoCodes[promoCode]);
            // Mostrar notificación de éxito
            showNotification('¡Código promocional aplicado!', 'success');
        } else {
            showNotification('Código promocional inválido', 'error');
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

    const subtotal = getCartTotal();
    const discountAmount = subtotal * discount;
    const shipping = subtotal > 500 ? 0 : 80;
    const total = subtotal - discountAmount + shipping;

    if (cartItems.length === 0) {
        return (
            React.createElement('div', { className: 'section-padding animate-fade-in-up' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-lg-8 mx-auto text-center' },
                            React.createElement('i', { 
                                className: 'bi bi-cart-x',
                                style: { fontSize: '6rem', color: 'var(--medium-gray)' }
                            }),
                            React.createElement('h2', { className: 'mt-4 mb-3' }, 'Tu carrito está vacío'),
                            React.createElement('p', { className: 'text-muted mb-4' },
                                'Descubre nuestros increíbles productos y tratamientos de belleza'
                            ),
                            React.createElement('button', {
                                className: 'btn btn-primary-custom btn-lg',
                                onClick: () => navigateTo('productos')
                            },
                                React.createElement('i', { className: 'bi bi-bag me-2' }),
                                'Explorar Productos'
                            )
                        )
                    )
                )
            )
        );
    }

    return (
        React.createElement('div', { className: 'animate-fade-in-up' },
            // Header del carrito
            React.createElement('section', { className: 'bg-gradient-secondary py-4' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        React.createElement('div', { className: 'col-12' },
                            React.createElement('h1', { className: 'text-white mb-0' },
                                React.createElement('i', { className: 'bi bi-cart3 me-3' }),
                                'Tu Carrito de Compras'
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'section-padding' },
                React.createElement('div', { className: 'container' },
                    React.createElement('div', { className: 'row' },
                        // Productos en el carrito
                        React.createElement('div', { className: 'col-lg-8' },
                            React.createElement('div', { className: 'card card-custom mb-4' },
                                React.createElement('div', { className: 'card-header d-flex justify-content-between align-items-center' },
                                    React.createElement('h5', { className: 'mb-0' },
                                        `Productos (${cartItems.reduce((total, item) => total + item.quantity, 0)})`
                                    ),
                                    React.createElement('button', {
                                        className: 'btn btn-outline-danger btn-sm',
                                        onClick: clearCart
                                    },
                                        React.createElement('i', { className: 'bi bi-trash me-1' }),
                                        'Vaciar Carrito'
                                    )
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    cartItems.map(item =>
                                        React.createElement('div', { key: item.id, className: 'cart-item' },
                                            React.createElement('div', { className: 'row align-items-center' },
                                                React.createElement('div', { className: 'col-md-2' },
                                                    React.createElement('img', {
                                                        src: item.image,
                                                        alt: item.name,
                                                        className: 'img-fluid rounded',
                                                        style: { height: '80px', objectFit: 'cover' }
                                                    })
                                                ),
                                                React.createElement('div', { className: 'col-md-4' },
                                                    React.createElement('h6', { className: 'mb-1' }, item.name),
                                                    React.createElement('small', { className: 'text-muted' }, item.category),
                                                    React.createElement('div', { className: 'mt-2' },
                                                        React.createElement('span', { className: 'fw-bold text-success' },
                                                            `$${item.price}`
                                                        )
                                                    )
                                                ),
                                                React.createElement('div', { className: 'col-md-3' },
                                                    React.createElement('div', { className: 'd-flex align-items-center' },
                                                        React.createElement('button', {
                                                            className: 'btn btn-sm btn-outline-secondary',
                                                            onClick: () => updateCartQuantity(item.id, item.quantity - 1)
                                                        },
                                                            React.createElement('i', { className: 'bi bi-dash' })
                                                        ),
                                                        React.createElement('span', { className: 'mx-3 fw-bold' }, item.quantity),
                                                        React.createElement('button', {
                                                            className: 'btn btn-sm btn-outline-secondary',
                                                            onClick: () => updateCartQuantity(item.id, item.quantity + 1)
                                                        },
                                                            React.createElement('i', { className: 'bi bi-plus' })
                                                        )
                                                    )
                                                ),
                                                React.createElement('div', { className: 'col-md-2 text-end' },
                                                    React.createElement('div', { className: 'fw-bold' },
                                                        `$${(item.price * item.quantity).toFixed(2)}`
                                                    )
                                                ),
                                                React.createElement('div', { className: 'col-md-1' },
                                                    React.createElement('button', {
                                                        className: 'btn btn-sm btn-outline-danger',
                                                        onClick: () => removeFromCart(item.id)
                                                    },
                                                        React.createElement('i', { className: 'bi bi-x' })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        // Resumen del carrito
                        React.createElement('div', { className: 'col-lg-4' },
                            React.createElement('div', { className: 'card card-custom' },
                                React.createElement('div', { className: 'card-header' },
                                    React.createElement('h5', { className: 'mb-0' }, 'Resumen del Pedido')
                                ),
                                React.createElement('div', { className: 'card-body' },
                                    // Código promocional
                                    React.createElement('div', { className: 'mb-4' },
                                        React.createElement('label', { className: 'form-label' }, 'Código Promocional'),
                                        React.createElement('div', { className: 'input-group' },
                                            React.createElement('input', {
                                                type: 'text',
                                                className: 'form-control',
                                                placeholder: 'Ingresa tu código',
                                                value: promoCode,
                                                onChange: (e) => setPromoCode(e.target.value.toUpperCase())
                                            }),
                                            React.createElement('button', {
                                                className: 'btn btn-outline-secondary',
                                                onClick: applyPromoCode
                                            }, 'Aplicar')
                                        ),
                                        discount > 0 && React.createElement('small', { className: 'text-success mt-1 d-block' },
                                            React.createElement('i', { className: 'bi bi-check-circle me-1' }),
                                            `Descuento aplicado: ${(discount * 100)}%`
                                        )
                                    ),

                                    // Desglose de precios
                                    React.createElement('div', { className: 'd-flex justify-content-between mb-2' },
                                        React.createElement('span', null, 'Subtotal:'),
                                        React.createElement('span', null, `$${subtotal.toFixed(2)}`)
                                    ),
                                    
                                    discount > 0 && React.createElement('div', { className: 'd-flex justify-content-between mb-2 text-success' },
                                        React.createElement('span', null, 'Descuento:'),
                                        React.createElement('span', null, `-$${discountAmount.toFixed(2)}`)
                                    ),
                                    
                                    React.createElement('div', { className: 'd-flex justify-content-between mb-2' },
                                        React.createElement('span', null, 'Envío:'),
                                        React.createElement('span', null, 
                                            shipping === 0 ? 
                                                React.createElement('span', { className: 'text-success' }, 'Gratis') :
                                                `$${shipping.toFixed(2)}`
                                        )
                                    ),
                                    
                                    shipping === 0 && React.createElement('small', { className: 'text-success mb-3 d-block' },
                                        React.createElement('i', { className: 'bi bi-truck me-1' }),
                                        'Envío gratis por compra mayor a $500'
                                    ),

                                    React.createElement('hr'),
                                    
                                    React.createElement('div', { className: 'd-flex justify-content-between mb-4' },
                                        React.createElement('strong', null, 'Total:'),
                                        React.createElement('strong', { className: 'text-success fs-5' }, `$${total.toFixed(2)}`)
                                    ),

                                    React.createElement('button', {
                                        className: 'btn btn-success-custom w-100 mb-3',
                                        onClick: () => setShowCheckout(true)
                                    },
                                        React.createElement('i', { className: 'bi bi-credit-card me-2' }),
                                        'Proceder al Pago'
                                    ),

                                    React.createElement('button', {
                                        className: 'btn btn-outline-secondary w-100',
                                        onClick: () => navigateTo('productos')
                                    },
                                        React.createElement('i', { className: 'bi bi-arrow-left me-2' }),
                                        'Seguir Comprando'
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // Modal de checkout (simulado)
            showCheckout && React.createElement('div', { 
                className: 'modal fade show',
                style: { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }
            },
                React.createElement('div', { className: 'modal-dialog modal-lg' },
                    React.createElement('div', { className: 'modal-content' },
                        React.createElement('div', { className: 'modal-header' },
                            React.createElement('h5', { className: 'modal-title' },
                                React.createElement('i', { className: 'bi bi-credit-card me-2' }),
                                'Checkout - Integración de Pagos'
                            ),
                            React.createElement('button', {
                                type: 'button',
                                className: 'btn-close',
                                onClick: () => setShowCheckout(false)
                            })
                        ),
                        React.createElement('div', { className: 'modal-body text-center py-5' },
                            React.createElement('div', { className: 'mb-4' },
                                React.createElement('i', { 
                                    className: 'bi bi-credit-card-2-front',
                                    style: { fontSize: '4rem', color: 'var(--teal-green)' }
                                })
                            ),
                            React.createElement('h4', { className: 'mb-3' }, 'Integración con Pasarela de Pagos'),
                            React.createElement('p', { className: 'text-muted mb-4' },
                                'Esta sección está preparada para integrar con sistemas de pago como:'
                            ),
                            React.createElement('div', { className: 'row text-start' },
                                React.createElement('div', { className: 'col-md-6' },
                                    React.createElement('ul', { className: 'list-unstyled' },
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'PayPal'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'Stripe'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'Mercado Pago'
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'col-md-6' },
                                    React.createElement('ul', { className: 'list-unstyled' },
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'Tarjetas de Crédito'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'Transferencia Bancaria'
                                        ),
                                        React.createElement('li', { className: 'mb-2' },
                                            React.createElement('i', { className: 'bi bi-check-circle-fill text-success me-2' }),
                                            'OXXO/Efectivo'
                                        )
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'alert alert-info mt-4' },
                                React.createElement('i', { className: 'bi bi-shield-lock me-2' }),
                                'Todas las transacciones están protegidas con cifrado SSL de 256 bits'
                            ),
                            React.createElement('p', { className: 'small text-muted mt-3' },
                                'Total a pagar: ',
                                React.createElement('strong', { className: 'text-success' }, `$${total.toFixed(2)} MXN`)
                            )
                        ),
                        React.createElement('div', { className: 'modal-footer' },
                            React.createElement('button', {
                                type: 'button',
                                className: 'btn btn-secondary',
                                onClick: () => setShowCheckout(false)
                            }, 'Cerrar'),
                            React.createElement('button', {
                                type: 'button',
                                className: 'btn btn-success-custom',
                                onClick: () => {
                                    clearCart();
                                    setShowCheckout(false);
                                    showNotification('¡Compra simulada exitosamente!', 'success');
                                    navigateTo('inicio');
                                }
                            },
                                React.createElement('i', { className: 'bi bi-check-circle me-2' }),
                                'Simular Compra'
                            )
                        )
                    )
                )
            )
        )
    );
}