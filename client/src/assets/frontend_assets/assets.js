import hero_video from './10537262-uhd_4096_2160_25fps.mp4'
import elegant_perfume_bottle from './Elegant Perfume Bottle.png'
import red_perfume_bottle from './Elegant Red Perfume Bottle with Floral Background.png'
import perfume_roses_display from './Perfume and Roses Display.png'
import istock_1008118858 from './istockphoto-1008118858-612x612.jpg'
import istock_1253935837 from './istockphoto-1253935837-612x612.jpg'
import istock_160052159 from './istockphoto-160052159-612x612.jpg'
import istock_1724981631 from './istockphoto-1724981631-612x612.jpg'
import istock_2222118675 from './istockphoto-2222118675-612x612.jpg'
import istock_2264373671 from './istockphoto-2264373671-612x612.jpg'
import istock_468435596 from './istockphoto-468435596-612x612.jpg'
import istock_517233780 from './istockphoto-517233780-612x612.jpg'
import pexels_beautinow_niche_perfume from './pexels-beautinow-niche-perfume-413075804-15097440.jpg'
import pexels_fashionneedles_1 from './pexels-fashionneedles-32630385.jpg'
import pexels_fashionneedles_2 from './pexels-fashionneedles-32645088.jpg'
import pexels_maram from './pexels-maram-145487840-32817141.jpg'
import pexels_valeriya from './pexels-valeriya-9957552.jpg'

// Parent assets directory images
import elegant_perfume_flowers_still_life from '../Elegant Perfume and Flowers Still Life.png'
import perfume_wildflowers from '../Perfume and Wildflowers.png'

export const assets = {
  hero_video,
  elegant_perfume_bottle,
  red_perfume_bottle,
  perfume_roses_display,
  istock_1008118858,
  istock_1253935837,
  istock_160052159,
  istock_1724981631,
  istock_2222118675,
  istock_2264373671,
  istock_468435596,
  istock_517233780,
  pexels_beautinow_niche_perfume,
  pexels_fashionneedles_1,
  pexels_fashionneedles_2,
  pexels_maram,
  pexels_valeriya,
  elegant_perfume_flowers_still_life,
  perfume_wildflowers
}

export const categories_list = [
  {
    category_name: "Aquatic & Fresh",
    category_image: istock_1008118858
  },
  {
    category_name: "Amber & Spice",
    category_image: istock_1253935837
  },
  {
    category_name: "Floral & Rose",
    category_image: elegant_perfume_bottle
  },
  {
    category_name: "Woody & Oud",
    category_image: istock_160052159
  },
  {
    category_name: "Citrus & Solar",
    category_image: istock_1724981631
  },
  {
    category_name: "Gourmand & Vanilla",
    category_image: istock_2222118675
  },
  {
    category_name: "Wildflower Atelier",
    category_image: perfume_wildflowers
  },
  {
    category_name: "Botanical Still Life",
    category_image: elegant_perfume_flowers_still_life
  }
]

export const perfumes_list = [
  {
    _id: "1",
    name: "Oceanic Breeze",
    image: istock_1008118858,
    price: 135.00,
    description: "Invigorating blend of coastal bergamot, sea salt notes, and warm ambergris.",
    category: "Aquatic & Fresh",
    family: "Aquatic",
    concentration: "Eau de Parfum",
    notes: "Bergamot, Sea Salt, Ambergris",
    rating: 4.9,
    reviewsCount: 84,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Bestseller"
  },
  {
    _id: "2",
    name: "Velvet Amber & Vanilla",
    image: istock_1253935837,
    price: 145.00,
    description: "Rich bourbon vanilla resin paired with roasted tonka beans and golden amber.",
    category: "Amber & Spice",
    family: "Amber & Spice",
    concentration: "Eau de Parfum",
    notes: "Bourbon Vanilla, Amber Resin, Tonka",
    rating: 4.8,
    reviewsCount: 62,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Signature"
  },
  {
    _id: "3",
    name: "Midnight Rose & Oud",
    image: red_perfume_bottle,
    price: 195.00,
    description: "Velvety Damask roses steeped in smoky oud wood and aged dark patchouli.",
    category: "Floral & Rose",
    family: "Floral",
    concentration: "Extrait de Parfum",
    notes: "Damask Rose, Smoked Oud, Patchouli",
    rating: 5.0,
    reviewsCount: 41,
    size: "50 ml / 1.7 fl. oz.",
    tag: "Intense"
  },
  {
    _id: "4",
    name: "Solar Citrus & Bergamot",
    image: istock_1724981631,
    price: 110.00,
    description: "Sun-drenched Calabrian bergamot bursting with crushed lemon leaves and cedar.",
    category: "Citrus & Solar",
    family: "Fresh & Citrus",
    concentration: "Eau de Toilette",
    notes: "Calabrian Bergamot, Lemon Zest, Cedar",
    rating: 4.7,
    reviewsCount: 29,
    size: "100 ml / 3.4 fl. oz.",
    tag: "New"
  },
  {
    _id: "5",
    name: "Smoked Wood & Saffron",
    image: istock_160052159,
    price: 210.00,
    description: "Rare Kashmiri saffron infused into smoked Mysore sandalwood and wild vetiver.",
    category: "Woody & Oud",
    family: "Woody & Earthy",
    concentration: "Extrait de Parfum",
    notes: "Sandalwood, Saffron, Vetiver",
    rating: 4.9,
    reviewsCount: 53,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Artisan"
  },
  {
    _id: "6",
    name: "Wild Jasmine & Cypress",
    image: perfume_roses_display,
    price: 150.00,
    description: "Night-blooming jasmine blossoms layered over crisp Mediterranean cypress and white musk.",
    category: "Floral & Rose",
    family: "Floral",
    concentration: "Eau de Parfum",
    notes: "Night Jasmine, White Musk, Cypress",
    rating: 4.8,
    reviewsCount: 38,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Limited Edition"
  },
  {
    _id: "7",
    name: "Imperial Tonka & Cardamom",
    image: istock_2222118675,
    price: 165.00,
    description: "Warm green cardamom pods coupled with sweet roasted tonka and cashmeran.",
    category: "Gourmand & Vanilla",
    family: "Amber & Spice",
    concentration: "Eau de Parfum",
    notes: "Green Cardamom, Tonka Bean, Cashmeran",
    rating: 4.9,
    reviewsCount: 77,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Reserve"
  },
  {
    _id: "8",
    name: "Niche Botanical Discovery Set",
    image: pexels_beautinow_niche_perfume,
    price: 45.00,
    description: "Curated collection of 5 hand-poured 2ml sample vials from our master perfumer.",
    category: "Sample Vault",
    family: "Discovery",
    concentration: "Sample Vault",
    notes: "5 x 2ml Hand-Poured Vials",
    rating: 5.0,
    reviewsCount: 190,
    size: "5 x 2 ml Vials",
    tag: "Gift Set"
  },
  {
    _id: "9",
    name: "Botanical Still Life Atelier",
    image: elegant_perfume_flowers_still_life,
    price: 180.00,
    description: "Handcrafted fragrance surrounded by rare botanical flowers and delicate sweet nectar.",
    category: "Botanical Still Life",
    family: "Floral",
    concentration: "Eau de Parfum",
    notes: "Peony, White Lily, Fresh Nectar",
    rating: 4.9,
    reviewsCount: 95,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Masterpiece"
  },
  {
    _id: "10",
    name: "Wildflower Meadow & Dew",
    image: perfume_wildflowers,
    price: 155.00,
    description: "Morning dew on meadow wildflowers, damp earth, and soft solar musks.",
    category: "Wildflower Atelier",
    family: "Fresh & Floral",
    concentration: "Eau de Parfum",
    notes: "Wild Orchid, Dew Drops, Soft Amber",
    rating: 4.8,
    reviewsCount: 68,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Atelier"
  },
  {
    _id: "11",
    name: "Ethereal Crystal Bloom",
    image: elegant_perfume_bottle,
    price: 175.00,
    description: "Pure crystalized floral petals in a clear hand-blown glass perfume flacon.",
    category: "Floral & Rose",
    family: "Floral",
    concentration: "Extrait de Parfum",
    notes: "Crystal Violet, Tuberose, Blonde Woods",
    rating: 4.9,
    reviewsCount: 110,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Luxury Edition"
  },
  {
    _id: "12",
    name: "Golden Oud Noir",
    image: istock_2264373671,
    price: 220.00,
    description: "Dark agarwood resin with rich liquid gold amber and burnt vanilla bean.",
    category: "Woody & Oud",
    family: "Woody & Earthy",
    concentration: "Extrait de Parfum",
    notes: "Agarwood, Gold Amber, Smoked Vanilla",
    rating: 5.0,
    reviewsCount: 88,
    size: "50 ml / 1.7 fl. oz.",
    tag: "Exclusive"
  },
  {
    _id: "13",
    name: "Botanical Essence Reserve",
    image: istock_468435596,
    price: 140.00,
    description: "Organic herbal oils pressed from wild garden sage, thyme, and orange flower.",
    category: "Aquatic & Fresh",
    family: "Fresh & Herbal",
    concentration: "Eau de Toilette",
    notes: "Clary Sage, Orange Blossom, Thyme",
    rating: 4.7,
    reviewsCount: 45,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Organic"
  },
  {
    _id: "14",
    name: "Rose & Velvet Petals",
    image: istock_517233780,
    price: 160.00,
    description: "Crushed crimson rose petals with soft pink pepper and sweet almond milk.",
    category: "Floral & Rose",
    family: "Floral",
    concentration: "Eau de Parfum",
    notes: "Crimson Rose, Pink Pepper, Almond Milk",
    rating: 4.8,
    reviewsCount: 57,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Romantic"
  },
  {
    _id: "15",
    name: "Couture Fragrance Elixir",
    image: pexels_fashionneedles_1,
    price: 185.00,
    description: "High-fashion fragrance elixir with velvety iris root, mimosa, and clean linen.",
    category: "Gourmand & Vanilla",
    family: "Powdery & Floral",
    concentration: "Eau de Parfum",
    notes: "Florentine Iris, Mimosa, Musk",
    rating: 4.9,
    reviewsCount: 73,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Couture"
  },
  {
    _id: "16",
    name: "Silk Saffron & Cashmere",
    image: pexels_fashionneedles_2,
    price: 190.00,
    description: "Smooth silk notes draped over warm golden saffron and cashmere wood.",
    category: "Amber & Spice",
    family: "Amber & Spice",
    concentration: "Extrait de Parfum",
    notes: "Silk Blossom, Golden Saffron, Cashmere",
    rating: 4.9,
    reviewsCount: 64,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Velvet"
  },
  {
    _id: "17",
    name: "Oasis Amber Solitude",
    image: pexels_maram,
    price: 205.00,
    description: "Solitary desert amber warmed by sunset rays, cedarwood, and spicy clove.",
    category: "Amber & Spice",
    family: "Woody & Earthy",
    concentration: "Extrait de Parfum",
    notes: "Desert Amber, Cedarwood, Spicy Clove",
    rating: 4.8,
    reviewsCount: 51,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Desert Series"
  },
  {
    _id: "18",
    name: "Monarch Vanilla Bloom",
    image: pexels_valeriya,
    price: 170.00,
    description: "Regal Madagascar vanilla orchids enriched with golden honey and warm benzoin.",
    category: "Gourmand & Vanilla",
    family: "Gourmand",
    concentration: "Eau de Parfum",
    notes: "Madagascar Vanilla, Wild Honey, Benzoin",
    rating: 5.0,
    reviewsCount: 122,
    size: "100 ml / 3.4 fl. oz.",
    tag: "Bestseller"
  }
]
