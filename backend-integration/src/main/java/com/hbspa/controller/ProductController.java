package com.hbspa.controller;

import com.hbspa.dto.ProductDTO;
import com.hbspa.model.Product;
import com.hbspa.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para gestión de productos y servicios
 * Expone endpoints que consume el frontend React
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * GET /api/products - Obtener lista de productos/servicios
     * Soporta filtrado por categoría y paginación
     * 
     * Frontend: getProductsByCategory() en mockData.ts
     */
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @RequestParam(required = false) Product.ProductCategory category,
            @RequestParam(required = false, defaultValue = "true") Boolean available,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        
        Page<ProductDTO> products = productService.getProducts(category, available, search, pageable);
        return ResponseEntity.ok(products);
    }
    
    /**
     * GET /api/products/{id} - Obtener producto específico por ID
     * 
     * Frontend: getProductById() en mockData.ts
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    
    /**
     * POST /api/products - Crear nuevo producto/servicio
     * Solo accesible para administradores
     * 
     * Frontend: ProductManager.tsx onSubmit() - caso agregar
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
    
    /**
     * PUT /api/products/{id} - Actualizar producto existente
     * Solo accesible para administradores
     * 
     * Frontend: ProductManager.tsx onSubmit() - caso editar
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable String id, 
            @Valid @RequestBody ProductDTO productDTO) {
        
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }
    
    /**
     * DELETE /api/products/{id} - Eliminar producto
     * Solo accesible para administradores
     * 
     * Frontend: ProductManager.tsx handleDeleteProduct()
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * PATCH /api/products/{id}/availability - Cambiar disponibilidad
     * Solo accesible para administradores
     */
    @PatchMapping("/{id}/availability")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> toggleAvailability(@PathVariable String id) {
        ProductDTO product = productService.toggleAvailability(id);
        return ResponseEntity.ok(product);
    }
    
    /**
     * GET /api/products/services - Obtener solo servicios
     * Endpoint especializado para reservas
     * 
     * Frontend: Services.tsx y ReservationModal.tsx
     */
    @GetMapping("/services")
    public ResponseEntity<List<ProductDTO>> getServices() {
        List<ProductDTO> services = productService.getServicesList();
        return ResponseEntity.ok(services);
    }
    
    /**
     * GET /api/products/low-stock - Obtener productos con stock bajo
     * Para alertas en el panel de administración
     * 
     * Frontend: AdminPanel.tsx dashboard
     */
    @GetMapping("/low-stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDTO>> getLowStockProducts(
            @RequestParam(defaultValue = "5") int threshold) {
        
        List<ProductDTO> lowStockProducts = productService.getLowStockProducts(threshold);
        return ResponseEntity.ok(lowStockProducts);
    }
    
    /**
     * POST /api/products/{id}/update-stock - Actualizar stock del producto
     * Solo accesible para administradores
     */
    @PostMapping("/{id}/update-stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> updateStock(
            @PathVariable String id,
            @RequestParam int newStock) {
        
        ProductDTO product = productService.updateStock(id, newStock);
        return ResponseEntity.ok(product);
    }
}