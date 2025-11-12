// Swiggy Food Delivery App - Data Structure

export interface Location {
  id: string
  label: string
  address: string
  area: string
}

export interface Restaurant {
  id: string
  name: string
  image: string
  cuisines: string[]
  rating: number
  reviews: number
  deliveryTime: string
  distance: string
  priceForTwo: number
  offers: string[]
  categories: Category[]
  isVeg?: boolean
}

export interface Category {
  id: string
  name: string
  itemCount: number
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  isVeg: boolean
  isAvailable: boolean
  sizes?: { name: string; price: number }[]
  beverages?: { name: string; price: number; isAvailable: boolean }[]
  toppings?: { name: string; price: number; isVeg: boolean }[]
}

export interface CartItem {
  menuItem: MenuItem
  restaurant: Restaurant
  quantity: number
  selectedSize?: { name: string; price: number }
  selectedBeverages?: { name: string; price: number }[]
  selectedToppings?: { name: string; price: number }[]
  customizationTotal: number
}

export interface PaymentMethod {
  type: 'upi' | 'card' | 'wallet' | 'cod'
  id: string
  name: string
  details: string
  icon?: string
}

export interface DeliveryPerson {
  name: string
  phone: string
  rating: number
  deliveries: number
}

export const locations: Location[] = [
  {
    id: '1',
    label: 'Home',
    address: 'Road 39, Block 28, Sector-24, Rohini, Delhi, 110085, India',
    area: 'Rohini'
  },
  {
    id: '2',
    label: 'Work',
    address: 'S7-105, Malviya Nagar, New Delhi, Delhi 110017, India',
    area: 'Malviya Nagar'
  },
  {
    id: '3',
    label: 'Hotel',
    address: 'S7-109, Sector, -56, Gurgaon, Kendriya Vihar, Sector 56, Gurugram, Haryana 122011, India',
    area: 'Gurgaon'
  },
  {
    id: '4',
    label: 'Nandini',
    address: 'Block B, ABC Apartment, New Delhi, Delhi 110022, India',
    area: 'New Delhi'
  }
]

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Olio - The Wood Fired Pizzeria',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    cuisines: ['Pizzas', 'Italian', 'Fast Food'],
    rating: 4.1,
    reviews: 1234,
    deliveryTime: '31 MINS',
    distance: '1.7 km',
    priceForTwo: 300,
    offers: ['FLAT ₹125 OFF', '40% OFF UPTO ₹100'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 30,
        items: [
          {
            id: '1',
            name: 'Queen Margherita Pizza',
            description: 'Classic margherita with premium mozzarella and fresh basil',
            price: 159,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop',
            rating: 4.5,
            isVeg: true,
            isAvailable: true,
            sizes: [
              { name: '10 Inch (Medium)', price: 159 },
              { name: '12 Inch (Large)', price: 289 },
              { name: '14 Inch (Extra Large)', price: 409 }
            ],
            beverages: [
              { name: 'Coke [250ml]', price: 57, isAvailable: true },
              { name: 'Thums Up [250ml]', price: 57, isAvailable: true },
              { name: 'Sprite [250ml]', price: 57, isAvailable: true },
              { name: 'Mango Pineapple Smoothie', price: 89, isAvailable: true },
              { name: 'Mixed Fruit Juice', price: 89, isAvailable: true },
              { name: 'Pepsi [250ml]', price: 57, isAvailable: false },
              { name: 'Lime & Lemon Fizz', price: 79, isAvailable: false }
            ],
            toppings: [
              { name: 'Tandoori Chicken', price: 79, isVeg: false },
              { name: 'Chicken Tikka', price: 79, isVeg: false },
              { name: 'Chicken Pepperoni', price: 89, isVeg: false }
            ]
          },
          {
            id: '2',
            name: 'Wood Fired Veg Pizza',
            description: 'Loaded with farm fresh vegetables',
            price: 189,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
            rating: 4.3,
            isVeg: true,
            isAvailable: true
          },
          {
            id: '3',
            name: 'Pepperoni Pizza - Chef\'s Special',
            description: 'Spicy pepperoni with extra cheese',
            price: 299,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop',
            rating: 4.6,
            isVeg: false,
            isAvailable: true
          },
          {
            id: '4',
            name: 'Guilfree By Eatfit!',
            description: 'Healthy pizza with multigrain base',
            price: 249,
            image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=300&fit=crop',
            rating: 4.2,
            isVeg: true,
            isAvailable: true
          }
        ]
      },
      {
        id: 'pizzas',
        name: 'Wood Fired Veg Pizza',
        itemCount: 8,
        items: []
      },
      {
        id: 'non-veg',
        name: 'Wood Fired Non Veg Pizza',
        itemCount: 5,
        items: []
      },
      {
        id: 'pastas',
        name: 'Pastas',
        itemCount: 2,
        items: []
      },
      {
        id: 'burgers',
        name: 'Gourmet Burgers',
        itemCount: 6,
        items: [
          {
            id: 'burger1',
            name: 'Classic Beef Burger',
            description: 'Juicy beef patty with lettuce, tomato, onion and special sauce',
            price: 249,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
            rating: 4.4,
            isVeg: false,
            isAvailable: true,
            sizes: [
              { name: 'Regular', price: 249 },
              { name: 'Large', price: 329 }
            ]
          },
          {
            id: 'burger2',
            name: 'Veggie Deluxe Burger',
            description: 'Plant-based patty with fresh vegetables and avocado',
            price: 199,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
            rating: 4.2,
            isVeg: true,
            isAvailable: true
          },
          {
            id: 'burger3',
            name: 'Chicken Crispy Burger',
            description: 'Crispy fried chicken with coleslaw and mayo',
            price: 229,
            image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&h=300&fit=crop',
            rating: 4.5,
            isVeg: false,
            isAvailable: true
          },
          {
            id: 'burger4',
            name: 'BBQ Bacon Burger',
            description: 'Beef patty with BBQ sauce, bacon and cheese',
            price: 299,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop',
            rating: 4.6,
            isVeg: false,
            isAvailable: true
          },
          {
            id: 'burger5',
            name: 'Mushroom Swiss Burger',
            description: 'Beef patty with sautéed mushrooms and Swiss cheese',
            price: 269,
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=300&fit=crop',
            rating: 4.3,
            isVeg: false,
            isAvailable: true
          },
          {
            id: 'burger6',
            name: 'Spicy Jalapeño Burger',
            description: 'Spicy beef patty with jalapeños and pepper jack cheese',
            price: 279,
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=300&fit=crop',
            rating: 4.4,
            isVeg: false,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Chai Point',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    cuisines: ['Bakery', 'Beverages', 'Maharashtrian', 'Snacks'],
    rating: 4.1,
    reviews: 2847,
    deliveryTime: '38 MINS',
    distance: '2.3 km',
    priceForTwo: 150,
    offers: ['40% OFF'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 30,
        items: [
          {
            id: '5',
            name: 'Filter Coffee Uniflask',
            description: 'Experience the taste of authentic filter coffee with every sip',
            price: 130,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop',
            rating: 4.4,
            isVeg: true,
            isAvailable: true
          },
          {
            id: '6',
            name: 'Filter Coffee Mini Flask',
            description: 'Mini Flask - 500 ML (Serves 4-5)',
            price: 200,
            image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=300&fit=crop',
            rating: 4.5,
            isVeg: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Samosa Party',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    cuisines: ['Fast Food', 'Snacks', 'Beverages', 'Chaat', 'North Indian'],
    rating: 4.2,
    reviews: 1567,
    deliveryTime: '28 MINS',
    distance: '1.2 km',
    priceForTwo: 300,
    offers: ['10% OFF - FLAT DEAL'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 30,
        items: [
          {
            id: '7',
            name: 'Aloo Samosa',
            description: 'Crispy golden samosas filled with spiced potatoes',
            price: 25,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop',
            rating: 4.3,
            isVeg: true,
            isAvailable: true
          }
        ]
      },
      {
        id: 'burgers',
        name: 'Street Style Burgers',
        itemCount: 4,
        items: [
          {
            id: 'burger7',
            name: 'Aloo Tikki Burger',
            description: 'Crispy potato patty with mint chutney and onions',
            price: 89,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
            rating: 4.1,
            isVeg: true,
            isAvailable: true
          },
          {
            id: 'burger8',
            name: 'Paneer Tikka Burger',
            description: 'Grilled paneer tikka with Indian spices',
            price: 129,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
            rating: 4.3,
            isVeg: true,
            isAvailable: true
          },
          {
            id: 'burger9',
            name: 'Chicken Keema Burger',
            description: 'Spiced chicken keema with onions and chutneys',
            price: 149,
            image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&h=300&fit=crop',
            rating: 4.4,
            isVeg: false,
            isAvailable: true
          },
          {
            id: 'burger10',
            name: 'Masala Veg Burger',
            description: 'Mixed vegetable patty with Indian masala',
            price: 99,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop',
            rating: 4.0,
            isVeg: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'The Cubano Sandwich Co.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    cuisines: ['Sandwich', 'American', 'Salads', 'Desserts'],
    rating: 4.3,
    reviews: 892,
    deliveryTime: '35 MINS',
    distance: '3.1 km',
    priceForTwo: 400,
    offers: ['₹150 OFF ABOVE ₹299'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 20,
        items: [
          {
            id: '8',
            name: 'Grilled Veggie Parmesan Cubano',
            description: 'Grilled vegetables with parmesan cheese',
            price: 249,
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=300&fit=crop',
            rating: 4.4,
            isVeg: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Sandoitchi Kojo',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    cuisines: ['Juices', 'Japanese', 'Healthy Food', 'Beverages'],
    rating: 4.2,
    reviews: 654,
    deliveryTime: '32 MINS',
    distance: '2.8 km',
    priceForTwo: 350,
    offers: ['Free delivery'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 15,
        items: []
      }
    ]
  },
  {
    id: '6',
    name: '32 Degree',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
    cuisines: ['Beverages', 'Juices', 'Indian'],
    rating: 4.3,
    reviews: 1123,
    deliveryTime: '21 MINS',
    distance: '1.5 km',
    priceForTwo: 100,
    offers: [],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 25,
        items: []
      }
    ]
  },
  {
    id: '7',
    name: 'The Coffee Brewery',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop',
    cuisines: ['Cafe', 'Desserts', 'Fast Food', 'Beverages'],
    rating: 3.3,
    reviews: 432,
    deliveryTime: '27 MINS',
    distance: '2.1 km',
    priceForTwo: 500,
    offers: ['40% OFF'],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 18,
        items: []
      }
    ]
  },
  {
    id: '8',
    name: 'Grover Mithaivala',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=300&fit=crop',
    cuisines: ['Sweets', 'Desserts', 'North Indian', 'Snacks'],
    rating: 4.5,
    reviews: 2341,
    deliveryTime: '25 MINS',
    distance: '1.8 km',
    priceForTwo: 250,
    offers: [],
    categories: [
      {
        id: 'recommended',
        name: 'Recommended',
        itemCount: 40,
        items: []
      }
    ]
  }
]

export const paymentMethods: PaymentMethod[] = [
  {
    type: 'card',
    id: 'card-1',
    name: 'Axis Card',
    details: '•••••••• 1380'
  },
  {
    type: 'upi',
    id: 'upi-1',
    name: 'Loremipsum@okicici',
    details: 'UPI ID'
  },
  {
    type: 'upi',
    id: 'upi-2',
    name: 'Payment@okicici',
    details: 'UPI ID'
  },
  {
    type: 'upi',
    id: 'upi-3',
    name: '799131480@paytm',
    details: 'UPI ID'
  },
  {
    type: 'card',
    id: 'card-2',
    name: 'Slice Card',
    details: '•••••••• 6222'
  },
  {
    type: 'card',
    id: 'card-3',
    name: 'Jane',
    details: '•••••••• 1172'
  }
]

export const deliveryPerson: DeliveryPerson = {
  name: 'ANIL KUMAR S',
  phone: '9876543210',
  rating: 4.8,
  deliveries: 1234
}

export const addOns = [
  {
    id: 'addon-1',
    name: 'CookieMan Double...',
    price: 284,
    originalPrice: 360,
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop'
  },
  {
    id: 'addon-2',
    name: 'Red Bull Sugar Free Energy...',
    price: 125,
    originalPrice: 150,
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34f1f161?w=200&h=200&fit=crop'
  },
  {
    id: 'addon-3',
    name: 'Id Fresh Pouch Curd',
    price: 45,
    originalPrice: 50,
    discount: '5%',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop'
  },
  {
    id: 'addon-4',
    name: 'Amul Butter',
    price: 56,
    originalPrice: 60,
    discount: '3%',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop'
  }
]

