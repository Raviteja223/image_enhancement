import dotenv from "dotenv";
dotenv.config();
import Replicate from "replicate";


export const image_enhancer = async (fileUrl) => {
    console.log(fileUrl, "file");
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
        "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        {
          input: {
            img: fileUrl
          }
        }
    );

    return output;
};