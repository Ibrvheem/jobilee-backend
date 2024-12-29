import mongoose from 'mongoose';

export const UdusSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: String },
  reg_no: { type: String, required: true },
});

export interface UDUS {
  id: string;
  first_name: string;
  last_name: string;
  reg_no: string;
  phone_no: string;
  email: string;
}
