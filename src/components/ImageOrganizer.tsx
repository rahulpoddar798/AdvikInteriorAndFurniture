import { useState } from 'react';

export function ImageOrganizer() {
  const allImages = [
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452666/IMG-20251005-WA0072_g2u7lp.jpg', name: 'WA0072', currentCategory: 'Beds', id: 1 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0102_j0iepi.jpg', name: 'WA0102', currentCategory: 'Beds', id: 2 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0073_ewdoj8.jpg', name: 'WA0073', currentCategory: 'Beds', id: 3 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452664/IMG-20251005-WA0070_tig2w9.jpg', name: 'WA0070', currentCategory: 'Beds', id: 4 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452663/IMG-20251005-WA0068_wp1qml.jpg', name: 'WA0068', currentCategory: 'Beds', id: 5 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0065_fykb0q.jpg', name: 'WA0065', currentCategory: 'Beds', id: 6 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0064_dpqrzw.jpg', name: 'WA0064', currentCategory: 'Beds', id: 7 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0060_iuxgo5.jpg', name: 'WA0060', currentCategory: 'Beds', id: 8 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0061_qh8tpc.jpg', name: 'WA0061', currentCategory: 'Beds', id: 9 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452656/IMG-20251005-WA0058_cx1ldk.jpg', name: 'WA0058', currentCategory: 'Beds', id: 10 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0055_zoj0z4.jpg', name: 'WA0055', currentCategory: 'Beds', id: 11 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0053_tjj4k4.jpg', name: 'WA0053', currentCategory: 'Beds', id: 12 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0048_rzsxd8.jpg', name: 'WA0048', currentCategory: 'Beds', id: 13 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0025_qweynn.jpg', name: 'WA0025', currentCategory: 'Beds', id: 14 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0022_pur5xb.jpg', name: 'WA0022', currentCategory: 'Beds', id: 15 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0021_cyw8xs.jpg', name: 'WA0021', currentCategory: 'Beds', id: 16 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0019_zl5xqw.jpg', name: 'WA0019', currentCategory: 'Beds', id: 17 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0020_fam1ij.jpg', name: 'WA0020', currentCategory: 'Beds', id: 18 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0018_r5a61c.jpg', name: 'WA0018', currentCategory: 'Beds', id: 19 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0017_hidmif.jpg', name: 'WA0017', currentCategory: 'Beds', id: 20 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0016_qw6wpm.jpg', name: 'WA0016', currentCategory: 'Beds', id: 21 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0015_hli2ik.jpg', name: 'WA0015', currentCategory: 'Sofas', id: 22 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0014_mqizc6.jpg', name: 'WA0014', currentCategory: 'Sofas', id: 23 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0011_cgupte.jpg', name: 'WA0011', currentCategory: 'Sofas', id: 24 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0010_yatxvc.jpg', name: 'WA0010', currentCategory: 'Sofas', id: 25 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0013_kkho8o.jpg', name: 'WA0013', currentCategory: 'Sofas', id: 26 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0009_wcrd3t.jpg', name: 'WA0009', currentCategory: 'Sofas', id: 27 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452637/IMG-20251005-WA0008_pnoyjb.jpg', name: 'WA0008', currentCategory: 'Sofas', id: 28 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0007_p0olxl.jpg', name: 'WA0007', currentCategory: 'Sofas', id: 29 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0005_zdzdbb.jpg', name: 'WA0005', currentCategory: 'Sofas', id: 30 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452635/IMG-20251005-WA0004_chker5.jpg', name: 'WA0004', currentCategory: 'Sofas', id: 31 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0043_zszv8j.jpg', name: 'WA0043', currentCategory: 'Sofas', id: 32 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0042_hsp7f0.jpg', name: 'WA0042', currentCategory: 'Sofas', id: 33 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452631/IMG-20251005-WA0041_a9hynl.jpg', name: 'WA0041', currentCategory: 'Sofas', id: 34 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452627/IMG-20251005-WA0040_bpqjyy.jpg', name: 'WA0040', currentCategory: 'Sofas', id: 35 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0039_hu7xmf.jpg', name: 'WA0039', currentCategory: 'Sofas', id: 36 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0036_aaa3hc.jpg', name: 'WA0036', currentCategory: 'Sofas', id: 37 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0038_l1wsw5.jpg', name: 'WA0038', currentCategory: 'Sofas', id: 38 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0032_xx8pkc.jpg', name: 'WA0032', currentCategory: 'Sofas', id: 39 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0035_zci1fq.jpg', name: 'WA0035', currentCategory: 'Sofas', id: 40 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452624/IMG-20251005-WA0031_rlzu4q.jpg', name: 'WA0031', currentCategory: 'Sofas', id: 41 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452620/IMG-20251005-WA0030_rzguzu.jpg', name: 'WA0030', currentCategory: 'Sofas', id: 42 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0027_mdqrq0.jpg', name: 'WA0027', currentCategory: 'Sofas', id: 43 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0028_kq8a9s.jpg', name: 'WA0028', currentCategory: 'Sofas', id: 44 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452618/IMG-20251005-WA0026_mxszcn.jpg', name: 'WA0026', currentCategory: 'Sofas', id: 45 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0025_qhfkea.jpg', name: 'WA0025', currentCategory: 'Sofas', id: 46 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0022_gtvndg.jpg', name: 'WA0022', currentCategory: 'Sofas', id: 47 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0020_lowbp6.jpg', name: 'WA0020', currentCategory: 'Sofas', id: 48 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0019_ohjvkb.jpg', name: 'WA0019', currentCategory: 'Sofas', id: 49 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0017_fa4wlg.jpg', name: 'WA0017', currentCategory: 'Sofas', id: 50 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0018_uy4abu.jpg', name: 'WA0018', currentCategory: 'Sofas', id: 51 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0014_qsstce.jpg', name: 'WA0014', currentCategory: 'Sofas', id: 52 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452612/IMG-20251005-WA0015_utsyer.jpg', name: 'WA0015', currentCategory: 'Chairs', id: 53 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452594/IMG-20251005-WA0051_lgvn22.jpg', name: 'WA0051', currentCategory: 'Chairs', id: 54 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0045_grgiy9.jpg', name: 'WA0045', currentCategory: 'Chairs', id: 55 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0044_zlbt3e.jpg', name: 'WA0044', currentCategory: 'Chairs', id: 56 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0006_mhq3i8.jpg', name: 'WA0006', currentCategory: 'Chairs', id: 57 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0101_rjnfwz.jpg', name: 'WA0101', currentCategory: 'Chairs', id: 58 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0099_tmbwqo.jpg', name: 'WA0099', currentCategory: 'Chairs', id: 59 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0094_kb1u3p.jpg', name: 'WA0094', currentCategory: 'Chairs', id: 60 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0097_uemedw.jpg', name: 'WA0097', currentCategory: 'Chairs', id: 61 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0096_zbsgdp.jpg', name: 'WA0096', currentCategory: 'Chairs', id: 62 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0093_vtsezb.jpg', name: 'WA0093', currentCategory: 'Chairs', id: 63 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0090_hxvu2i.jpg', name: 'WA0090', currentCategory: 'Chairs', id: 64 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0092_l68itw.jpg', name: 'WA0092', currentCategory: 'Chairs', id: 65 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0084_deubcr.jpg', name: 'WA0084', currentCategory: 'Chairs', id: 66 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0089_r02v4e.jpg', name: 'WA0089', currentCategory: 'Chairs', id: 67 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0085_pkabfy.jpg', name: 'WA0085', currentCategory: 'Chairs', id: 68 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0088_acpry7.jpg', name: 'WA0088', currentCategory: 'Chairs', id: 69 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0087_gernz0.jpg', name: 'WA0087', currentCategory: 'Chairs', id: 70 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0083_kllt1p.jpg', name: 'WA0083', currentCategory: 'Chairs', id: 71 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0077_pfk4rz.jpg', name: 'WA0077', currentCategory: 'Chairs', id: 72 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0081_uz6tgz.jpg', name: 'WA0081', currentCategory: 'Chairs', id: 73 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0066_qqqf7p.jpg', name: 'WA0066', currentCategory: 'Chairs', id: 74 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0050_ljxkl9.jpg', name: 'WA0050', currentCategory: 'Dining Tables', id: 75 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0063_edjovj.jpg', name: 'WA0063', currentCategory: 'Dining Tables', id: 76 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0076_l18tvy.jpg', name: 'WA0076', currentCategory: 'Dining Tables', id: 77 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0054_c4ck2q.jpg', name: 'WA0054', currentCategory: 'Dining Tables', id: 78 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0062_r1enxu.jpg', name: 'WA0062', currentCategory: 'Dining Tables', id: 79 },
    { url: 'https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0067_ze3msm.jpg', name: 'WA0067', currentCategory: 'Dining Tables', id: 80 },
  ];

  const [filter, setFilter] = useState<string>('All');

  const filteredImages = filter === 'All' 
    ? allImages 
    : allImages.filter(img => img.currentCategory === filter);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-4">Image Category Organizer</h1>
        <p className="text-muted-foreground mb-6">
          Review all images and their current category assignments. Check which images need to be moved to different categories.
        </p>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['All', 'Beds', 'Sofas', 'Chairs', 'Dining Tables'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {cat}
              {cat !== 'All' && ` (${allImages.filter(img => img.currentCategory === cat).length})`}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <div className="aspect-square bg-muted relative">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">ID:</span> {image.id}
                </p>
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">Name:</span> {image.name}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Category:</span>{' '}
                  <span className="font-medium">{image.currentCategory}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl mb-3">How to Reorganize:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Review each image and note its ID and current category</li>
            <li>Identify which images are in the wrong category</li>
            <li>Tell me which image IDs need to be moved to which category</li>
            <li>Example: "Move ID 5, 12, 18 from Beds to Sofas" or "WA0072 should be a Sofa"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
