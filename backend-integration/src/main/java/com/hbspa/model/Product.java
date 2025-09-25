package com.hbspa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad Product - Representa productos y servicios del spa
 * Basado en el tipo TypeScript Product del frontend
 */
@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String name;
    
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "La descripción es obligatoria")
    @Size(min = 10, max = 1000, message = "La descripción debe tener entre 10 y 1000 caracteres")
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    @NotNull(message = "El precio es obligatorio")
    private BigDecimal price;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(nullable = false)
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
    
    // Para servicios - duración en minutos
    @Column(name = "duration_minutes")
    @Min(value = 0, message = "La duración no puede ser negativa")
    private Integer duration;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    // Para servicios - si requiere terapeuta especializado
    @Column(name = "therapist_required")
    private Boolean therapistRequired = false;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enum para categorías
    public enum ProductCategory {
        PRODUCTO, SERVICIO
    }
    
    // Constructors
    public Product() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Product(String name, String description, BigDecimal price, ProductCategory category) {
        this();
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
    
    // Lifecycle methods
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public ProductCategory getCategory() {
        return category;
    }
    
    public void setCategory(ProductCategory category) {
        this.category = category;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public Integer getStock() {
        return stock;
    }
    
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    
    public Integer getDuration() {
        return duration;
    }
    
    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public Boolean getAvailable() {
        return available;
    }
    
    public void setAvailable(Boolean available) {
        this.available = available;
    }
    
    public Boolean getTherapistRequired() {
        return therapistRequired;
    }
    
    public void setTherapistRequired(Boolean therapistRequired) {
        this.therapistRequired = therapistRequired;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    // Helper methods
    public boolean isService() {
        return ProductCategory.SERVICIO.equals(this.category);
    }
    
    public boolean isProduct() {
        return ProductCategory.PRODUCTO.equals(this.category);
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", price=" + price +
                ", available=" + available +
                '}';
    }
}