import MongodbConnection from "../Util/MongodbConnection.js";
import Inventory from "../models/Inventory.js";

const imageUrlToBuffer = async (imageUrl) => {
  try {
    // Make a GET request to the image URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Create a Buffer from the response data
    const imageBuffer = Buffer.from(response.data, 'binary');

    return imageBuffer;
  } catch (error) {
    console.error('Error fetching or converting image:', error);
    throw error; // You may want to handle this error according to your needs
  }
};

const imageurl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFmMOsazWl9rOTMKcL5-SazgrMIumNifVzKg&usqp=CAU'


export const createInventory = async (req, resp) => {
  const { name, stock, mrp, brand, attribute } = req.body;
  const buffer = req.file
  MongodbConnection();
  try {
    const inventory = await Inventory.create({ name, stock, mrp, brand, attribute, image:buffer ? buffer.buffer : ""})
    inventory.save();
    resp.send(inventory);
  } catch (error) {
    resp.send(error)
  }
};

export const fetchInventory = async (req, resp) => {
  MongodbConnection();
  try {
    const inventory = await Inventory.find({});

    // Convert Buffer data to base64
    const inventoryWithBase64 = inventory.map(item => {
      if (item.image && item.image instanceof Buffer) {
        const base64Data = item.image.toString('base64');
        return { ...item._doc, image: base64Data };
      }
      return item;
    });

    resp.json(inventoryWithBase64);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    resp.status(500).json({ error: 'Internal server error' });
  }
};

export const UpdateInventory = async (req, resp) => {
  const {name,stock,mrp,brand,attribute} = req.body;
  const id = req.params.id;
  await MongodbConnection();
  try {
    const response = await Inventory.findOneAndUpdate({_id:id},{name,stock,mrp,brand,attribute},{new:true})
    resp.send("successfully updated")
  } catch (error) {
    resp.send(error)
    console.log(error)
  }
  
}
