const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_super_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create Users Table with OTP fields
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            name TEXT,
            otp TEXT,
            is_verified INTEGER DEFAULT 0
        )`);

        // Create Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            image TEXT,
            category TEXT,
            itemCode TEXT
        )`, (err) => {
            if (!err) {
                // Seed some initial products if empty
                db.get("SELECT count(*) as count FROM products", (err, row) => {
                    if (row.count < 10) { // Re-seed if low count (or empty)
                        // Clear existing to avoid duplicates if partial
                        db.run("DELETE FROM products", [], (err) => {
                            if (!err) {
                                const stmt = db.prepare("INSERT INTO products (name, description, price, image, category, itemCode) VALUES (?, ?, ?, ?, ?, ?)");

                                const products = [
                                    // Beds
                                    { id: 2, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0102_j0iepi.jpg", description: "Solid wood platform bed with modern design.", itemCode: "AFI002", category: "Bedroom", name: "Platform Bed" },
                                    { id: 3, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0073_ewdoj8.jpg", description: "Elegant tufted headboard with soft fabric.", itemCode: "AFI003", category: "Bedroom", name: "Tufted Headboard Bed" },
                                    { id: 4, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452664/IMG-20251005-WA0070_tig2w9.jpg", description: "Functional bed with built-in storage drawers.", itemCode: "AFI004", category: "Bedroom", name: "Storage Bed" },
                                    { id: 5, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452663/IMG-20251005-WA0068_wp1qml.jpg", description: "Classic queen-size panel bed design.", itemCode: "AFI005", category: "Bedroom", name: "Panel Bed" },
                                    { id: 7, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0064_dpqrzw.jpg", description: "Traditional sleigh bed with curved headboard.", itemCode: "AFI007", category: "Bedroom", name: "Sleigh Bed" },
                                    { id: 9, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0061_qh8tpc.jpg", description: "Soft velvet upholstery with elegant finish.", itemCode: "AFI009", category: "Bedroom", name: "Velvet Bed" },
                                    { id: 10, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452656/IMG-20251005-WA0058_cx1ldk.jpg", description: "Classic four-poster bed for grand bedrooms.", itemCode: "AFI010", category: "Bedroom", name: "Four-Poster Bed" },
                                    { id: 11, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0055_zoj0z4.jpg", description: "Premium leather headboard with sturdy frame.", itemCode: "AFI011", category: "Bedroom", name: "Leather Headboard Bed" },
                                    { id: 12, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0053_tjj4k4.jpg", description: "Stylish wingback design with comfort.", itemCode: "AFI012", category: "Bedroom", name: "Wingback Bed" },
                                    { id: 13, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0048_rzsxd8.jpg", description: "Adjustable base for customized comfort.", itemCode: "AFI013", category: "Bedroom", name: "Adjustable Bed" },
                                    { id: 33, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0042_hsp7f0.jpg", description: "Cozy bed design perfect for small spaces.", itemCode: "AFI033", category: "Bedroom", name: "Cozy Bed" },
                                    { id: 36, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0039_hu7xmf.jpg", description: "Flexible modular design for any layout.", itemCode: "AFI036", category: "Bedroom", name: "Modular Bed" },
                                    { id: 37, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0036_aaa3hc.jpg", description: "Unique curved design statement piece.", itemCode: "AFI037", category: "Bedroom", name: "Curved Bed" },
                                    { id: 38, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0038_l1wsw5.jpg", description: "Space-efficient design for apartments.", itemCode: "AFI038", category: "Bedroom", name: "Apartment Bed" },
                                    { id: 39, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0032_xx8pkc.jpg", description: "Large king-sized bed for families.", itemCode: "AFI039", category: "Bedroom", name: "Family King Bed" },
                                    { id: 40, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0035_zci1fq.jpg", description: "Bed with extended platform design.", itemCode: "AFI040", category: "Bedroom", name: "Extended Platform Bed" },
                                    { id: 41, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452624/IMG-20251005-WA0031_rlzu4q.jpg", description: "Low-profile contemporary bed design.", itemCode: "AFI041", category: "Bedroom", name: "Low-Profile Bed" },
                                    { id: 42, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452620/IMG-20251005-WA0030_rzguzu.jpg", description: "Multi-functional convertible bed.", itemCode: "AFI042", category: "Bedroom", name: "Convertible Bed" },
                                    { id: 43, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0027_mdqrq0.jpg", description: "Exclusive designer bed collection.", itemCode: "AFI043", category: "Bedroom", name: "Designer Bed" },
                                    { id: 44, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0028_kq8a9s.jpg", description: "Luxurious royal-themed bed set.", itemCode: "AFI044", category: "Bedroom", name: "Royal Bed" },
                                    { id: 45, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452618/IMG-20251005-WA0026_mxszcn.jpg", description: "Classic master bedroom bed design.", itemCode: "AFI045", category: "Bedroom", name: "Master Bed" },
                                    { id: 59, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0099_tmbwqo.jpg", description: "Traditional elegant bed frame design.", itemCode: "AFI059", category: "Bedroom", name: "Traditional Bed" },

                                    // Sofas
                                    { id: 1, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452666/IMG-20251005-WA0072_g2u7lp.jpg", description: "Luxurious sofa with premium upholstery.", itemCode: "AFI001", category: "Sofas", name: "Luxury Sofa" },
                                    { id: 6, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0065_fykb0q.jpg", description: "Sleek minimalist design for modern living rooms.", itemCode: "AFI006", category: "Sofas", name: "Minimalist Sofa" },
                                    { id: 8, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0060_iuxgo5.jpg", description: "Contemporary low-profile sofa design.", itemCode: "AFI008", category: "Sofas", name: "Low-Profile Sofa" },
                                    { id: 29, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0007_p0olxl.jpg", description: "Space-saving corner sofa for modern homes.", itemCode: "AFI029", category: "Sofas", name: "Corner Sofa" },
                                    { id: 54, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452594/IMG-20251005-WA0051_lgvn22.jpg", description: "Premium ergonomic sofa design.", itemCode: "AFI054", category: "Sofas", name: "Ergonomic Sofa" },
                                    { id: 55, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0045_grgiy9.jpg", description: "Statement sofa for living spaces.", itemCode: "AFI055", category: "Sofas", name: "Statement Sofa" },
                                    { id: 56, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0044_zlbt3e.jpg", description: "Modern compact sofa with adjustable features.", itemCode: "AFI056", category: "Sofas", name: "Compact Sofa" },
                                    { id: 57, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0006_mhq3i8.jpg", description: "Classic wooden frame sofa design.", itemCode: "AFI057", category: "Sofas", name: "Wooden Frame Sofa" },
                                    { id: 58, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0101_rjnfwz.jpg", description: "Space-saving sofa design.", itemCode: "AFI058", category: "Sofas", name: "Space Saver Sofa" },
                                    { id: 60, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0094_kb1u3p.jpg", description: "Comfortable lounge sofa for relaxation.", itemCode: "AFI060", category: "Sofas", name: "Lounge Sofa" },
                                    { id: 61, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0097_uemedw.jpg", description: "High-performance contemporary sofa.", itemCode: "AFI061", category: "Sofas", name: "Contemporary Sofa" },
                                    { id: 62, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0096_zbsgdp.jpg", description: "Ergonomic comfort sofa design.", itemCode: "AFI062", category: "Sofas", name: "Comfort Sofa" },
                                    { id: 63, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0093_vtsezb.jpg", description: "Breathable modern sofa design.", itemCode: "AFI063", category: "Sofas", name: "Modern Sofa" },
                                    { id: 64, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0090_hxvu2i.jpg", description: "Solid wood frame sofa.", itemCode: "AFI064", category: "Sofas", name: "Solid Wood Sofa" },
                                    { id: 65, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0092_l68itw.jpg", description: "Fully upholstered comfort sofa.", itemCode: "AFI065", category: "Sofas", name: "Upholstered Sofa" },
                                    { id: 66, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0084_deubcr.jpg", description: "Professional living room sofa.", itemCode: "AFI066", category: "Sofas", name: "Professional Sofa" },
                                    { id: 67, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0089_r02v4e.jpg", description: "Adjustable recliner sofa.", itemCode: "AFI067", category: "Sofas", name: "Recliner Sofa" },
                                    { id: 68, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0085_pkabfy.jpg", description: "Colorful sofa designed for families.", itemCode: "AFI068", category: "Sofas", name: "Family Sofa" },
                                    { id: 69, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0088_acpry7.jpg", description: "Professional conference room sofa.", itemCode: "AFI069", category: "Sofas", name: "Conference Sofa" },
                                    { id: 70, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0087_gernz0.jpg", description: "Decorative designer sofa.", itemCode: "AFI070", category: "Sofas", name: "Designer Sofa" },
                                    { id: 71, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0083_kllt1p.jpg", description: "360-degree premium sofa design.", itemCode: "AFI071", category: "Sofas", name: "360 Sofa" },
                                    { id: 72, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0077_pfk4rz.jpg", description: "High-back executive sofa.", itemCode: "AFI072", category: "Sofas", name: "Executive Sofa" },
                                    { id: 73, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0081_uz6tgz.jpg", description: "Low-back minimalist sofa.", itemCode: "AFI073", category: "Sofas", name: "Low-Back Sofa" },
                                    { id: 75, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0050_ljxkl9.jpg", description: "Complete sectional sofa set.", itemCode: "AFI075", category: "Sofas", name: "Sectional Sofa" },
                                    { id: 76, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0063_edjovj.jpg", description: "Solid traditional sofa for 6-8 people.", itemCode: "AFI076", category: "Sofas", name: "Traditional Sofa" },
                                    { id: 77, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0076_l18tvy.jpg", description: "Versatile modular sofa design.", itemCode: "AFI077", category: "Sofas", name: "Modular Sofa" },
                                    { id: 78, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0054_c4ck2q.jpg", description: "Round curved sofa design.", itemCode: "AFI078", category: "Sofas", name: "Round Sofa" },
                                    { id: 79, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0062_r1enxu.jpg", description: "Modern L-shaped sofa design.", itemCode: "AFI079", category: "Sofas", name: "L-Shaped Sofa" },
                                    { id: 80, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0067_ze3msm.jpg", description: "Luxurious premium sofa set.", itemCode: "AFI080", category: "Sofas", name: "Premium Sofa Set" },

                                    // Chairs
                                    { id: 74, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0066_qqqf7p.jpg", description: "Weather-resistant outdoor sofa.", itemCode: "AFI074", category: "Chairs", name: "Outdoor Sofa" },
                                    { id: 14, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0025_qweynn.jpg", description: "Romantic elegant chair with draping design.", itemCode: "AFI014", category: "Chairs", name: "Elegant Chair" },
                                    { id: 15, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0022_pur5xb.jpg", description: "Compact single chair for smaller spaces.", itemCode: "AFI015", category: "Chairs", name: "Compact Chair" },
                                    { id: 16, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0021_cyw8xs.jpg", description: "Durable metal frame with modern styling.", itemCode: "AFI016", category: "Chairs", name: "Metal Frame Chair" },
                                    { id: 17, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0019_zl5xqw.jpg", description: "Space-saving stackable chair design.", itemCode: "AFI017", category: "Chairs", name: "Stackable Chair" },
                                    { id: 18, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0020_fam1ij.jpg", description: "Versatile chair with flexible design.", itemCode: "AFI018", category: "Chairs", name: "Flexible Chair" },
                                    { id: 19, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0018_r5a61c.jpg", description: "Chair with hydraulic storage features.", itemCode: "AFI019", category: "Chairs", name: "Storage Chair" },
                                    { id: 20, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0017_hidmif.jpg", description: "Classic cushioned chair with upholstered finish.", itemCode: "AFI020", category: "Chairs", name: "Cushioned Chair" },
                                    { id: 21, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0016_qw6wpm.jpg", description: "Unique designer chair with artistic details.", itemCode: "AFI021", category: "Chairs", name: "Artistic Chair" },
                                    { id: 22, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0015_hli2ik.jpg", description: "Elegant velvet chair with deep seating and premium comfort.", itemCode: "AFI022", category: "Chairs", name: "Velvet Armchair" },
                                    { id: 23, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0014_mqizc6.jpg", description: "Spacious armchair with contemporary design.", itemCode: "AFI023", category: "Chairs", name: "Spacious Armchair" },
                                    { id: 25, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0010_yatxvc.jpg", description: "Clean lines and minimalist aesthetic.", itemCode: "AFI025", category: "Chairs", name: "Minimalist Chair" },
                                    { id: 32, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0043_zszv8j.jpg", description: "Contemporary design with sleek lines.", itemCode: "AFI032", category: "Chairs", name: "Sleek Chair" },
                                    { id: 34, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452631/IMG-20251005-WA0041_a9hynl.jpg", description: "Convertible chair for guests.", itemCode: "AFI034", category: "Chairs", name: "Convertible Chair" },
                                    { id: 35, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452627/IMG-20251005-WA0040_bpqjyy.jpg", description: "Button tufted design adds elegance.", itemCode: "AFI035", category: "Chairs", name: "Tufted Chair" },
                                    { id: 46, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0025_qhfkea.jpg", description: "Chair with built-in storage compartments.", itemCode: "AFI046", category: "Chairs", name: "Storage Compartment Chair" },
                                    { id: 47, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0022_gtvndg.jpg", description: "Nordic-inspired minimalist chair.", itemCode: "AFI047", category: "Chairs", name: "Nordic Chair" },
                                    { id: 48, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0020_lowbp6.jpg", description: "Chair with integrated side table.", itemCode: "AFI048", category: "Chairs", name: "Side Table Chair" },
                                    { id: 49, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0019_ohjvkb.jpg", description: "Ultra-plush deep cushion chair.", itemCode: "AFI049", category: "Chairs", name: "Plush Chair" },
                                    { id: 50, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0017_fa4wlg.jpg", description: "Reversible accent chair design.", itemCode: "AFI050", category: "Chairs", name: "Accent Chair" },
                                    { id: 51, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0018_uy4abu.jpg", description: "Classic armchair design.", itemCode: "AFI051", category: "Chairs", name: "Classic Armchair" },
                                    { id: 52, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0014_qsstce.jpg", description: "Traditional comfort chair with loose cushions.", itemCode: "AFI052", category: "Chairs", name: "Traditional Chair" },
                                    { id: 53, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452612/IMG-20251005-WA0015_utsyer.jpg", description: "Elegant dining chairs with ergonomic design.", itemCode: "AFI053", category: "Dining", name: "Dining Chair" },

                                    // Dining Tables
                                    { id: 24, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0011_cgupte.jpg", description: "Timeless design with button tufting and rolled arms.", itemCode: "AFI024", category: "Dining", name: "Timeless Dining Table" },
                                    { id: 26, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0013_kkho8o.jpg", description: "Comfortable dining table perfect for family meals.", itemCode: "AFI026", category: "Dining", name: "Family Dining Table" },
                                    { id: 27, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0009_wcrd3t.jpg", description: "Stylish wooden table with elegant finish.", itemCode: "AFI027", category: "Dining", name: "Wooden Dining Table" },
                                    { id: 28, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452637/IMG-20251005-WA0008_pnoyjb.jpg", description: "Premium dining set with superior comfort.", itemCode: "AFI028", category: "Dining", name: "Premium Dining Set" },
                                    { id: 30, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0005_zdzdbb.jpg", description: "Modular dining table with customizable arrangement.", itemCode: "AFI030", category: "Dining", name: "Modular Dining Table" },
                                    { id: 31, image: "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452635/IMG-20251005-WA0004_chker5.jpg", description: "Retro-inspired design with modern comfort.", itemCode: "AFI031", category: "Dining", name: "Retro Dining Table" },
                                ];

                                products.forEach(p => {
                                    stmt.run(p.name, p.description, 0, p.image, p.category, p.itemCode);
                                });
                                stmt.finalize();
                                console.log("Seeded full product list");
                            }
                        });
                    }
                });
            }
        });
    }
});

// Routes

// Register (Step 1: Send OTP)
app.post('/api/register/send-otp', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (user && user.is_verified) {
            return res.status(400).send({ message: "User already exists." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = bcrypt.hashSync(password, 8);

        if (user && !user.is_verified) {
            // Update existing unverified user
            db.run(`UPDATE users SET name = ?, password = ?, otp = ? WHERE email = ?`,
                [name, hashedPassword, otp, email],
                function (err) {
                    if (err) return res.status(500).send({ message: "Error updating user." });
                    sendOtpEmail(email, otp, res);
                }
            );
        } else {
            // Create new unverified user
            db.run(`INSERT INTO users (name, email, password, otp, is_verified) VALUES (?, ?, ?, ?, 0)`,
                [name, email, hashedPassword, otp],
                function (err) {
                    if (err) return res.status(500).send({ message: "Error creating user." });
                    sendOtpEmail(email, otp, res);
                }
            );
        }
    });
});

// Verify OTP (Step 2)
app.post('/api/register/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) return res.status(400).send({ message: "User not found." });

        if (user.otp === otp) {
            db.run(`UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?`, [email], (err) => {
                if (err) return res.status(500).send({ message: "Error verifying user." });

                const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
                res.status(200).send({ auth: true, token: token, user: { id: user.id, name: user.name, email: user.email } });
            });
        } else {
            res.status(400).send({ message: "Invalid OTP." });
        }
    });
});

function sendOtpEmail(email, otp, res) {
    // Simulate or send real email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`[SIMULATION] OTP for ${email}: ${otp}`);
        return res.status(200).send({ message: "OTP sent successfully (Simulation: Check console)" });
    }

    console.log("Attempting to send OTP email to:", email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending OTP email:", error);
            return res.status(500).send({ message: "Failed to send OTP email. Check server logs." });
        }
        console.log("OTP email sent successfully:", info.response);
        res.status(200).send({ message: "OTP sent successfully." });
    });
}

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        if (!user.is_verified) return res.status(401).send('Account not verified.');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

// Get Products
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Contact Form (Email)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const targetEmail = "enginetrinity53@gmail.com";

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`[SIMULATION] Sending email to ${targetEmail} from ${email}:`, message);
        return res.status(200).json({ message: "Message received! (Simulation mode)" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email, // Note: Gmail might override this with the auth user
        to: targetEmail,
        subject: `New Contact Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
