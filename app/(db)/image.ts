import { Model, Schema, model, models } from "mongoose";

interface ImageI {
    id: number;
    image: string;
    markers: Marker[];
}

interface Position {
    yaw: number;
    pitch: number;
}

interface Size {
    width: number;
    height: number;
}

interface Marker {
    id: string;
    position: Position;
    size: Size;
    html: string;
    style: Object;
}

type ImageModel = Model<ImageI>

const imageSchema = new Schema<ImageI, ImageModel>({
    id: { type: Number, required: true },
    image: { type: String, required: true },
    markers: { type: [Object], default: [] }
})

const Image = model<ImageI, ImageModel>("Image", imageSchema)

export default Image;