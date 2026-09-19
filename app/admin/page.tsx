'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NUOVO_MARKET_PRODUCTS, ProductItem } from '@/lib/data';
import { 
  Store, 
  TrendingUp, 
  MessageCircle, 
  Eye, 
  MapPin, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  ExternalLink, 
  Settings, 
  Save, 
  Clock, 
  Phone,
  BarChart2,
  Package,
  ArrowUpRight
} from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<ProductItem[]>(NUOVO_MARKET_PRODUCTS);
  const [filterCat, setFilterCat] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // New product form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Bebidas');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');

  // Store config state
  const [storeName, setStoreName] = useState('Nuovo Market');
  const [storeHours, setStoreHours] = useState('08:00–23:30 hs');
  const [storeAddress, setStoreAddress] = useState('Av. Las Heras 742, Ciudad, Mendoza');
  const [storeWa, setStoreWa] = useState('+54 9 261 555-1040');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories = ['Todos', 'Bebidas', 'Snacks', 'Golosinas', 'Cigarrillos', 'Almacén'];

  const filteredProducts = products.filter(p => {
    const matchesCat = filterCat === 'Todos' || p.category === filterCat;
    const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductPrice) return;

    const newItem: ProductItem = {
      id: `p-${Date.now()}`,
      name: newProductName.trim(),
      category: newProductCategory,
      price: parseInt(newProductPrice, 10) || 0,
      description: newProductDesc.trim() || 'Producto disponible en mostrador.',
      inStock: true
    };

    setProducts(prev => [newItem, ...prev]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDesc('');
    setShowAddModal(false);
  };

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const deleteProduct = (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este producto del catálogo?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="site-wrapper admin-layout">
      <Navbar />

      <main className="admin-page-content">
        <div className="content-container">
          {/* ADMIN TOP BAR */}
          <div className="admin-header-row">
            <div>
              <div className="admin-tag">
                <span className="dot green"></span>
                <span>PANEL DE CONTROL · SMARTBARRIO</span>
              </div>
              <h1 className="admin-title">Administración: {storeName}</h1>
              <p className="admin-sub">
                Gestioná tu catálogo digital en tiempo real, actualizá precios y consultá las métricas de tu comercio.
              </p>
            </div>

            <div className="admin-header-actions">
              <Link href="/kioscos/nuovo-market" target="_blank" className="btn secondary">
                <span>Ver tienda pública</span>
                <ArrowUpRight size={15} />
              </Link>
              <button onClick={() => setShowAddModal(true)} className="btn primary">
                <Plus size={16} />
                <span>Nuevo Producto</span>
              </button>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="admin-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-box green">
                <Eye size={18} />
              </div>
              <div>
                <span className="metric-label">Visitas este mes</span>
                <h3 className="metric-value">1.842</h3>
                <small className="metric-diff positive">+18% vs mes anterior</small>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box orange">
                <MessageCircle size={18} />
              </div>
              <div>
                <span className="metric-label">Contactos WhatsApp</span>
                <h3 className="metric-value">214</h3>
                <small className="metric-diff positive">+32% esta semana</small>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box blue">
                <Package size={18} />
              </div>
              <div>
                <span className="metric-label">Productos en catálogo</span>
                <h3 className="metric-value">{products.length}</h3>
                <small className="metric-diff neutral">{products.filter(p => p.inStock).length} con stock activo</small>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box teal">
                <MapPin size={18} />
              </div>
              <div>
                <span className="metric-label">Clics en Cómo Llegar</span>
                <h3 className="metric-value">96</h3>
                <small className="metric-diff positive">Clientes guiados</small>
              </div>
            </div>
          </div>

          {/* MAIN ADMIN WORKSPACE: CATALOG MANAGER */}
          <div className="admin-workspace-grid">
            <div className="admin-left-col">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <div>
                    <h2 className="panel-title">Catálogo de Productos</h2>
                    <p className="panel-desc">Los cambios se reflejan inmediatamente en la URL pública del comercio.</p>
                  </div>

                  <button onClick={() => setShowAddModal(true)} className="btn primary small">
                    <Plus size={14} />
                    <span>Agregar</span>
                  </button>
                </div>

                {/* FILTERS */}
                <div className="admin-filter-bar">
                  <div className="admin-cat-pills">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setFilterCat(c)}
                        className={`admin-cat-btn ${filterCat === c ? 'active' : ''}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="admin-search-wrap">
                    <Search size={15} />
                    <input 
                      type="text" 
                      placeholder="Buscar por nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="admin-search-input"
                    />
                  </div>
                </div>

                {/* PRODUCTS TABLE */}
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th style={{ textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id}>
                          <td>
                            <strong>{product.name}</strong>
                            <small style={{ display: 'block', color: '#728077', fontSize: '11px' }}>
                              {product.description}
                            </small>
                          </td>
                          <td>
                            <span className="table-cat-badge">{product.category}</span>
                          </td>
                          <td>
                            <strong>${product.price.toLocaleString('es-AR')}</strong>
                          </td>
                          <td>
                            <button 
                              onClick={() => toggleStock(product.id)}
                              className={`stock-toggle-btn ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
                            >
                              {product.inStock ? 'En stock' : 'Agotado'}
                            </button>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              <button 
                                onClick={() => deleteProduct(product.id)}
                                className="action-icon-btn danger"
                                title="Eliminar producto"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COL: STORE SETTINGS & LEADS */}
            <div className="admin-right-col">
              {/* STORE SETTINGS */}
              <div className="admin-panel-card">
                <h3 className="panel-title" style={{ fontSize: '15px' }}>Datos del Comercio</h3>
                <p className="panel-desc">Información pública que ven tus clientes en Mendoza.</p>

                <form onSubmit={handleSaveSettings} style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
                  <div>
                    <label className="admin-label">Nombre del Comercio</label>
                    <input 
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">Dirección física</label>
                    <input 
                      type="text"
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">Horario de atención</label>
                    <input 
                      type="text"
                      value={storeHours}
                      onChange={(e) => setStoreHours(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">WhatsApp de Pedidos</label>
                    <input 
                      type="text"
                      value={storeWa}
                      onChange={(e) => setStoreWa(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <button type="submit" className="btn primary full-width">
                    <Save size={15} />
                    <span>Guardar Cambios</span>
                  </button>

                  {savedSuccess && (
                    <div className="save-success-msg">
                      <Check size={14} />
                      <span>¡Cambios guardados exitosamente!</span>
                    </div>
                  )}
                </form>
              </div>

              {/* RECENT LEADS PREVIEW */}
              <div className="admin-panel-card" style={{ marginTop: '16px' }}>
                <h3 className="panel-title" style={{ fontSize: '15px' }}>Últimas Consultas WhatsApp</h3>
                <p className="panel-desc">Mensajes generados desde SmartBarrio:</p>

                <div className="leads-list">
                  <div className="lead-item">
                    <div className="lead-top">
                      <strong>Pedido de 3 artículos</strong>
                      <small>Hace 12 min</small>
                    </div>
                    <p className="lead-text">Coca-Cola 500ml, Alfajor Havanna 70%, Papas Lays...</p>
                    <span className="lead-status success">Enviado a WhatsApp</span>
                  </div>

                  <div className="lead-item">
                    <div className="lead-top">
                      <strong>Consulta de Cigarrillos</strong>
                      <small>Hace 45 min</small>
                    </div>
                    <p className="lead-text">Marlboro Box 20 x2 unidades</p>
                    <span className="lead-status success">Enviado a WhatsApp</span>
                  </div>

                  <div className="lead-item">
                    <div className="lead-top">
                      <strong>Consulta de horarios</strong>
                      <small>Hace 2 horas</small>
                    </div>
                    <p className="lead-text">¿Siguen abiertos hasta las 23:30 hoy domingo?</p>
                    <span className="lead-status neutral">Respondido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Agregar Producto al Catálogo</h3>
              <button onClick={() => setShowAddModal(false)} className="icon-btn">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="modal-form">
              <div>
                <label className="admin-label">Nombre del producto *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Alfajor Bagley Negro"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Categoría *</label>
                  <select 
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="admin-input"
                  >
                    <option value="Bebidas">Bebidas</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Golosinas">Golosinas</option>
                    <option value="Cigarrillos">Cigarrillos</option>
                    <option value="Almacén">Almacén</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">Precio ($ ARS) *</label>
                  <input 
                    type="number"
                    required
                    placeholder="Ej: 1500"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Descripción breve</label>
                <input 
                  type="text" 
                  placeholder="Ej: Bañado en chocolate con dulce de leche"
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn primary">
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
