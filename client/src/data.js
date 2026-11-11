export const products = [
  { id: 'linen-throw', name: 'Everyday Linen Throw', category: 'Textiles', price: 88, badge: 'BESTSELLER', color: 'Natural / oat', image: 'photo-1600210492486-724fe5c67fb0', description: 'A breathable Belgian linen throw with a relaxed, lived-in feel.' },
  { id: 'ceramic-vase', name: 'Sculpted Ceramic Vase', category: 'Objects', price: 64, badge: 'NEW', color: 'Chalk', image: 'photo-1578500494198-246f612d3b3d', description: 'Hand-finished stoneware with a soft, tactile glaze.' },
  { id: 'oak-tray', name: 'Sunday Oak Tray', category: 'Objects', price: 52, badge: '', color: 'Natural oak', image: 'photo-1603006905003-be475563bc59', description: 'A solid oak catch-all for the small rituals of your day.' },
  { id: 'glass-candle', name: 'Slow Morning Candle', category: 'Scent', price: 38, badge: '', color: 'Fig & cedar', image: 'photo-1602874801007-bd458bb1b8b6', description: 'A gentle, woodsy blend poured by hand in small batches.' },
  { id: 'wool-cushion', name: 'Woven Wool Cushion', category: 'Textiles', price: 76, badge: 'LOW STOCK', color: 'Moss stripe', image: 'photo-1584100936595-c0654b55a2e2', description: 'A soft, textured layer woven from responsibly sourced wool.' },
  { id: 'stoneware-cup', name: 'Daily Stoneware Cup', category: 'Objects', price: 32, badge: '', color: 'Warm white', image: 'photo-1514228742587-6b1558fcca3d', description: 'An easy-to-hold cup, made for the first coffee and the last tea.' },
  { id: 'table-light', name: 'Forma Table Light', category: 'Lighting', price: 148, badge: 'NEW', color: 'Sand', image: 'photo-1507473885765-e6ed057f782c', description: 'A sculptural, softly diffused lamp for evenings that linger.' },
  { id: 'woven-basket', name: 'Market Woven Basket', category: 'Objects', price: 58, badge: '', color: 'Natural', image: 'photo-1590874103328-eac38a683ce7', description: 'A versatile handwoven basket for blankets, books, and everyday bits.' },
]

export const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
