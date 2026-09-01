window.StudyNookConfig = {

  EXPECTED_PARENT_ORIGIN: "https://sites.google.com",

  DEV_MODE: true,
  DEV_XP: 480,

  STORAGE_KEY: "studynook_avatar_config",

  categories: [
    "skin",
    "hair",
    "face",
    "tops",
    "bottoms",
    "shoes",
    "bags",
    "accessories",
    "glasses",
    "hijab"
  ],

  defaultAvatar: {
    skinTone: "medium",
    face: "soft-smile",
    eyes: "round-brown",
    hair: "wavy-brown",
    hijab: null,
    top: "cream-tee",
    bottom: "sage-pants",
    shoes: "white-sneakers",
    bag: null,
    accessories: [],
    glasses: null
  },

  /* ===============================
     SKIN COLOURS
     Change/add colours here later.
  =============================== */

  skinTones: {
    porcelain: "#f8ddcc",
    light: "#efc7aa",
    medium: "#d79b72",
    golden: "#c8885d",
    tan: "#b87953",
    brown: "#8b5a3c",
    dark: "#684333",
    deep: "#452b23"
  },

  skinToneOptions: [
    {
      id: "porcelain",
      name: "Porcelain"
    },
    {
      id: "light",
      name: "Light"
    },
    {
      id: "medium",
      name: "Medium"
    },
    {
      id: "golden",
      name: "Golden"
    },
    {
      id: "tan",
      name: "Tan"
    },
    {
      id: "brown",
      name: "Brown"
    },
    {
      id: "dark",
      name: "Dark"
    },
    {
      id: "deep",
      name: "Deep"
    }
  ],

  items: [

    /* HAIR */

    {
      id: "wavy-brown",
      category: "hair",
      name: "Wavy Brown",
      xpRequired: 0,
      asset: "assets/avatars/hair/wavy-brown.svg"
    },

    {
      id: "short-black",
      category: "hair",
      name: "Short Black",
      xpRequired: 0,
      asset: "assets/avatars/hair/short-black.svg"
    },

    {
      id: "twin-pink",
      category: "hair",
      name: "Pink Twin Tails",
      xpRequired: 1000,
      asset: "assets/avatars/hair/twin-pink.svg"
    },

    /* FACE */

    {
      id: "soft-smile",
      category: "face",
      name: "Soft Smile",
      xpRequired: 0,
      asset: "assets/avatars/face/soft-smile.svg"
    },

    {
      id: "happy-face",
      category: "face",
      name: "Happy Face",
      xpRequired: 250,
      asset: "assets/avatars/face/happy-face.svg"
    },

    /* TOPS */

    {
      id: "cream-tee",
      category: "tops",
      name: "Cream Tee",
      xpRequired: 0,
      asset: "assets/avatars/tops/cream-tee.svg"
    },

    {
      id: "pink-cardigan",
      category: "tops",
      name: "Pink Cardigan",
      xpRequired: 500,
      asset: "assets/avatars/tops/pink-cardigan.svg"
    },

    {
      id: "lavender-hoodie",
      category: "tops",
      name: "Lavender Hoodie",
      xpRequired: 1500,
      asset: "assets/avatars/tops/lavender-hoodie.svg"
    },

    /* BOTTOMS */

    {
      id: "sage-pants",
      category: "bottoms",
      name: "Sage Trousers",
      xpRequired: 0,
      asset: "assets/avatars/bottoms/sage-pants.svg"
    },

    {
      id: "denim-skirt",
      category: "bottoms",
      name: "Denim Skirt",
      xpRequired: 250,
      asset: "assets/avatars/bottoms/denim-skirt.svg"
    },

    /* SHOES */

    {
      id: "white-sneakers",
      category: "shoes",
      name: "White Sneakers",
      xpRequired: 0,
      asset: "assets/avatars/shoes/white-sneakers.svg"
    },

    {
      id: "mary-janes",
      category: "shoes",
      name: "Mary Janes",
      xpRequired: 500,
      asset: "assets/avatars/shoes/mary-janes.svg"
    },

    /* BAGS */

    {
      id: "study-tote",
      category: "bags",
      name: "Study Tote",
      xpRequired: 1000,
      asset: "assets/avatars/bags/study-tote.svg"
    },

    /* ACCESSORIES */

    {
      id: "pink-bow",
      category: "accessories",
      name: "Pink Bow",
      xpRequired: 100,
      asset: "assets/avatars/accessories/pink-bow.svg",
      multi: true
    },

    {
      id: "headphones",
      category: "accessories",
      name: "Study Headphones",
      xpRequired: 750,
      asset: "assets/avatars/accessories/headphones.svg",
      multi: true
    },

    /* GLASSES */

    {
      id: "round-glasses",
      category: "glasses",
      name: "Round Glasses",
      xpRequired: 250,
      asset: "assets/avatars/glasses/round-glasses.svg"
    },

    /* HIJAB */

    {
      id: "rose-hijab",
      category: "hijab",
      name: "Dusty Rose Hijab",
      xpRequired: 0,
      asset: "assets/avatars/hijab/rose-hijab.svg"
    },

    {
      id: "sage-hijab",
      category: "hijab",
      name: "Sage Hijab",
      xpRequired: 500,
      asset: "assets/avatars/hijab/sage-hijab.svg"
    }

  ]
};
