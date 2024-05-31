const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");
const { log } = require("next/dist/server/typescript/utils");
(async () => {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  let i = 0;
  const newP = products.map((product) => {
    return {
      ...product,
      ntags: generateTags(product.name, product.category.name),
    };
  });
  newP.forEach(async (item) => {
    if (item.tags.length > 0) {
      return;
    }
    await prisma.product.update({
      where: {
        id: item.id,
      },

      data: {
        tags: item.ntags,
      },
    });
  });

  // await products.forEach((item) => {

  //     Promise.all(item.image.map(async (img, index) => {
  //         const fileName = item.name.split(" ").slice(0, 3).join("-") + "-" + index + Date.now().toString().slice(8);
  //         return await downloadFile(img, fileName)

  //     })).then(images => {
  //         console.log(images)
  //         const thumbnail = images[0];
  //         images.shift()
  //         console.log(dbProductlist.push({ ...item, image: images, thumbnail: thumbnail }));
  //         process.exit(0)
  //     }).catch(err => () => {
  //         console.log(err);
  //     })

  // })
  // fs.writeFileSync('test.json', JSON.stringify(dbProductlist));
  // const newProducts = products.map(item => {
  //     const categoryId = returnData.find(cat => cat.name === item.category).id
  //     item.category = categoryId
  //     return item

  // })
  // console.log(newProducts)
})();

// Function to generate tags
function generateTags(title, category) {
  // Define a list of common stopwords
  const stopwords = [
    "the",
    "and",
    "is",
    "in",
    "to",
    "for",
    "with",
    "a",
    "of",
    "on",
    "at",
    "by",
    "an",
    "size",
    "bed",
    "frame",
    "modern",
    "upholstered",
    "twin",
    "canopy",
    "storage",
    "adjustable",
    "wooden",
    "daybed",
    "trundle",
    "loft",
    "elegant",
    "dining",
    "table",
    "coffee",
    "rustic",
    "farmhouse",
    "industrial",
    "desk",
    "round",
    "glass",
    "top",
    "console",
    "foldable",
    "picnic",
    "marble",
    "end",
    "laptop",
    "vintage",
    "accent",
    "classic",
    "chair",
    "leather",
    "office",
    "ergonomic",
    "gaming",
    "comfort",
    "recliner",
    "outdoor",
    "patio",
    "swivel",
    "bar",
    "stool",
    "velvet",
    "lounge",
    "minimalist",
    "rocking",
    "fabric",
    "sofa",
    "contemporary",
    "linen",
    "retro",
    "style",
    "luxe",
    "modular",
    "scandinavian",
    "mid-century",
    "plush",
    "chic",
    "bohemian",
    "sectional",
    "luxurious",
    "cozy",
    "stylish",
    "transitional",
    "french",
    "country",
    "set",
    "rattan",
    "hammock",
    "stand",
    "fire",
    "pit",
    "adirondack",
    "bench",
    "umbrella",
    "storage",
    "plant",
    "folding",
    "nightstand",
    "drawer",
    "dresser",
    "mirror",
    "king",
    "mattress",
    "wardrobe",
    "closet",
    "bedside",
    "lamp",
    "rug",
    "vanity",
    "wall",
    "art",
    "throw",
    "blanket",
    "desk",
    "mirror",
    "accent",
    "bench",
    "floor",
    "stainless",
    "steel",
    "cookware",
    "non-stick",
    "bakeware",
    "blender",
    "coffee",
    "maker",
    "toaster",
    "oven",
    "food",
    "processor",
    "knife",
    "scale",
    "electric",
    "kettle",
    "tv",
    "stand",
    "bookshelf",
    "pillows",
    "area",
    "clock",
    "fan",
    "pouf",
    "curtains",
    "shelf",
    "memory",
    "foam",
    "hybrid",
    "innerspring",
    "latex",
    "pillow",
    "top",
    "gel",
    "orthopedic",
    "firm",
    "euro",
    "waterproof",
    "protector",
    "fitted",
    "sheet",
    "topper",
    "foundation",
    "bag",
    "encasement",
    "cleaner",
    "spray",
  ];

  // Helper function to clean and split text into words
  function cleanAndSplit(text) {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z\s]/g, "") // Remove non-alphabetic characters
      .split(/\s+/) // Split by whitespace
      .filter((word) => !stopwords.includes(word) && word.length > 1); // Filter stopwords and single letters
  }

  // Generate tags from title and category
  const titleTags = cleanAndSplit(title);
  const categoryTags = cleanAndSplit(category);

  // Combine tags and remove duplicates
  const tags = Array.from(new Set([...titleTags, ...categoryTags]));

  return tags;
}

async function downloadFile(url, id) {
  const outputFilePath = path.resolve("public/assets/images/p/", id + ".jpg");
  // console.log(outputFilePath);
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(outputFilePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        resolve(outputFilePath);
      });
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Error downloading the file: ${error.message}`);
  }
}

function getRandomDate(startDate, endDate) {
  // Get the timestamps for the start and end dates
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  // Generate a random timestamp between the start and end dates
  const randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
    startTimestamp;

  // Convert the random timestamp to a date
  return new Date(randomTimestamp);
}
