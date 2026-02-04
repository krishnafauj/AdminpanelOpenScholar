// models/Song.ts
import mongoose, { Schema, model, models } from "mongoose";

const SongSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  audioUrl: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });
const Song = models.Song || model("Song", SongSchema);

export default Song;