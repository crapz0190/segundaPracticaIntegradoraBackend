import { messagesModel } from "../models/messages.model.js";

class MessagesManager {
  async findAll() {
    try {
      const response = await messagesModel.find().lean();
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async findById(id) {
    try {
      const response = await messagesModel.findById({ _id: id });
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async createOne(obj) {
    try {
      const response = await messagesModel.create(obj);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async updateOne(id, obj) {
    try {
      const result = await messagesModel.updateOne({ _id: id }, obj);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteOne(id) {
    try {
      const result = await messagesModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

export const messagesManager = new MessagesManager();
