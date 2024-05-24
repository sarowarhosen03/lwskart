const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");
const { log } = require("next/dist/server/typescript/utils");
(async () => {

    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
        orderBy: {
            name: "desc",
        }
    })
    let i = 0;
    products.forEach(async (product, index) => {
        const images = product.image.map((img, index) => {
            return product.name.split(" ").join("-") + "-" + product.sku + "-" + index + ".jpg"
        })
        await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                image: images
            }
        })

    })

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
                console.log("done");
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
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;

    // Convert the random timestamp to a date
    return new Date(randomTimestamp);
}