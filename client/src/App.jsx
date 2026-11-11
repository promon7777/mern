import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { imageUrl, products as fallbackProducts } from './data'

const categories = ['All objects', 'Objects', 'Textiles', 'Scent', 'Lighting']
const money = (value) => `$${value.toFixed(2)}`

function App() {
  const [products, setProducts] = useState(fallbackProducts)
  const [category, setCategory] = useState('All objects')
  const [sort, setSort] = useState('Featured')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => { fetch(`${import.meta.env.VITE_API_URL || ''}/api/products`).then((r) => r.ok ? r.json() : null).then((data) => { if (Array.isArray(data) && data.length) setProducts(data) }).catch(() => {}) }, [])

  const visibleProducts = useMemo(() => {
    let list = products.filter((p) => (category === 'All objects' || p.category === category) && (!query || `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())))
    if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, category, sort, query])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2200) }
  const addToCart = (product) => { setCart((current) => { const found = current.find((item) => item.id === product.id); return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }] }); notify(`${product.name} added to your bag`) }
  const changeQuantity = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])

  return <>
    <div className="announcement">A little something extra: complimentary shipping over $100 <span aria-hidden="true">✳</span></div>
    <header className="header">
      <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={`nav-links ${mobileMenu ? 'nav-open' : ''}`}><a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a><a href="#story" onClick={() => setMobileMenu(false)}>Our story</a><a href="#journal" onClick={() => setMobileMenu(false)}>The journal</a></nav>
      <a className="wordmark" href="#top" aria-label="Morrow Market home">morrow<span>market</span></a>
      <div className="header-actions"><button className="icon-button search-button" aria-label="Search products" onClick={() => { setSearchOpen(!searchOpen); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}><Search /></button><button className="bag-button" onClick={() => setCartOpen(true)}><span className="bag-label">Bag</span><span className="bag-count">{cartCount}</span></button></div>
    </header>
    {searchOpen && <div className="search-bar"><Search size={17} /><input autoFocus placeholder="Find something lovely..." value={query} onChange={(e) => setQuery(e.target.value)} /><button className="icon-button" onClick={() => { setQuery(''); setSearchOpen(false) }} aria-label="Close search"><X size={18} /></button></div>}

    <main id="top">
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> OBJECTS FOR LIVING WELL</div><h1>Make room<br />for <em>the good.</em></h1><p>Thoughtful things for slower mornings, longer dinners, and the everyday in between.</p><a className="button button-dark" href="#shop">Explore the collection <ArrowRight size={16} /></a><div className="hero-note"><ArrowDown size={14} /> A considered collection, made to stay</div></div>
        <div className="hero-image-wrap"><img className="hero-image" src={imageUrl('photo-1616486338812-3dadae4b4ace', 1500)} alt="Sunlit, considered living room with natural textures" /><div className="hero-image-caption"><span>01 / THE SLOW LIVING EDIT</span><span>Made for the everyday</span></div><div className="hero-stamp">GOOD<br />THINGS<br /><span>inside</span></div></div>
      </section>

      <section className="values-strip"><span>Designed to be lived with</span><span className="value-separator">✳</span><span>Made with intention</span><span className="value-separator">✳</span><span>Better, not more</span><span className="value-separator">✳</span><span>Free shipping over $100</span></section>

      <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow">THE MORROW EDIT <span className="eyebrow-dot" /></div><h2>Everyday, <em>elevated.</em></h2></div><a className="text-link desktop-link" href="#newsletter">A note from us <ArrowRight size={15} /></a></div>
        <div className="shop-toolbar"><div className="category-tabs" role="tablist" aria-label="Filter by category">{categories.map((item) => <button role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="sort-control"><span>{visibleProducts.length} pieces</span><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products"><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={14} /></label></div>
        <div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card" key={product.id} style={{ '--i': index }}><div className="product-image-wrap"><img loading="lazy" src={imageUrl(product.image, 800)} alt={product.name} /><div className="product-badges">{product.badge && <span>{product.badge}</span>}</div><button className={`favorite-button ${favorites.includes(product.id) ? 'favorited' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={favorites.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product)}><Plus size={16} /> Add to bag</button></div><div className="product-info"><div><h3>{product.name}</h3><span className="product-color">{product.color}</span></div><span className="product-price">{money(product.price)}</span></div></article>)}</div>
        {visibleProducts.length === 0 && <p className="empty-search">Nothing here just yet. Try another search.</p>}
        <div className="shop-bottom"><span>Good things take time. Take a look around.</span><span>Showing {visibleProducts.length} of {products.length} pieces</span></div>
      </section>

      <section className="story-section" id="story"><div className="story-image"><img loading="lazy" src={imageUrl('photo-1600210492486-724fe5c67fb0', 1100)} alt="A warm, thoughtful living space" /><span className="image-side-note">A HOME, SLOWLY PUT TOGETHER</span></div><div className="story-copy"><div className="eyebrow">A SMALL INTRODUCTION <span className="eyebrow-dot" /></div><h2>Less, but<br /><em>more meaningful.</em></h2><p>We believe the things we keep close should earn their place. Morrow is a collection of quiet favorites, made carefully and chosen to become part of your everyday.</p><a href="#journal" className="button button-outline">A little more about us <ArrowRight size={16} /></a><div className="story-index">A GOOD HOME IS NEVER FINISHED <span>— &nbsp;JUST A LITTLE MORE YOURS</span></div></div></section>

      <section className="quote-section" id="journal"><div className="quote-mark">“</div><blockquote>It’s not about having more.<br />It’s about loving what you have.</blockquote><span>NOTES ON A SLOWER KIND OF HOME</span></section>

      <section className="newsletter" id="newsletter"><div><div className="eyebrow">LETTERS FROM MORROW <span className="eyebrow-dot" /></div><h2>A good thing<br /><em>in your inbox.</em></h2><p>New finds, small rituals, and the occasional note from us. Never too much.</p></div><form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) { setSubscribed(true); setEmail('') } }}><label htmlFor="email">YOUR EMAIL ADDRESS</label><div className="email-field"><input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button aria-label="Subscribe" type="submit"><ArrowRight size={19} /></button></div><span>{subscribed ? 'You’re on the list. Look out for a little note soon.' : 'By subscribing, you agree to our very occasional emails.'}</span></form></section>
    </main>

    <footer className="footer"><a className="wordmark footer-wordmark" href="#top">morrow<span>market</span></a><span className="footer-tagline">MAKE ROOM FOR THE GOOD.</span><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#newsletter">Contact</a><a href="#top">Instagram ↗</a></div><div className="footer-bottom"><span>© 2025 Morrow Market. Made with care.</span><span>Thoughtful things, for the everyday.</span><span>Privacy&nbsp;&nbsp; · &nbsp;&nbsp;Terms</span></div></footer>

    {cartOpen && <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setCartOpen(false) }}><aside className="cart-drawer" aria-label="Shopping bag"><div className="drawer-header"><div><span className="eyebrow">YOUR LITTLE COLLECTION</span><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={28} /><h3>It’s a little quiet in here.</h3><p>Your next everyday favorite is waiting.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore the collection <ArrowRight size={15} /></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={imageUrl(item.image, 240)} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><span>{item.color}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={12} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={12} /></button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="cart-summary"><div className="shipping-message"><Check size={15} />{subtotal >= 100 ? 'You’ve unlocked complimentary shipping.' : `You’re ${money(100 - subtotal)} away from complimentary shipping.`}</div><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><button className="button button-dark checkout-button" onClick={() => notify('Checkout is coming soon')}>Continue to checkout <ArrowRight size={16} /></button></div></>}</aside></div>}
    {toast && <div className="toast"><Check size={15} />{toast}</div>}
  </>
}

export default App
