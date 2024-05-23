const fs = require("fs");
const path = require("path");
const http = require("http");
const { PrismaClient } = require("@prisma/client");
const { default: axios } = require("axios");

(async () => {
    const products = JSON.parse(
        fs.readFileSync("./rnext/products.json", "utf-8"),
    );
    const [product] = products;

    const categoryis = products.reduce((prev, curr) => {
        if (prev.includes(curr.category)) {
            return prev;
        }
        return [...prev, curr.category];
    }, []);

    const brands = products.reduce((prev, curr) => {
        if (prev.includes(curr.brand)) {
            return prev;
        }
        return [...prev, curr.brand];
    }, []);
    const prisma = new PrismaClient();
    const returndBrands = await prisma.brand.findMany();
    const returnCatergory = await prisma.category.findMany();
    await prisma.product.createMany({
        data: products.map((item, index) => {

            const category = returnCatergory.find((it) => it.name === item.category);
            const brand = returndBrands.find((it) => it.name === item.brand);
            delete item.category
            delete item.brand;
            return {
                ...item,
                categoryId: category.id,
                brandId: brand.id,
            };
        }),
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

async function downloadFile(url, id) {
    const outputFilePath = path.resolve("public/assets/images/", id + ".jpg");
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
                console.log("done");
                resolve(outputFilePath);
            });
            writer.on("error", reject);
        });
    } catch (error) {
        console.error(`Error downloading the file: ${error.message}`);
    }
}
