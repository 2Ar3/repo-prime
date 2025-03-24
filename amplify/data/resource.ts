import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

export const Schema = {
  models: {
    Doctor: {
      name: "Doctor",
      fields: {
        id: { type: "ID", primaryKey: true },
        name: { type: "String", required: true },
        specialty: { type: "String" },
        vhaChats: { type: "hasMany", targetName: "doctorID", model: "VHAChat" } // One-to-many relationship
      }
    },
    VHAChat: { // Virtual Health Assistant Chats Model
      name: "VHAChat",
      fields: {
        id: { type: "ID", primaryKey: true },
        message: { type: "String", required: true }, // Chat message
        timestamp: { type: "AWSDateTime", required: true }, // Timestamp
        doctorID: { type: "ID", required: true, targetName: "id", relation: "belongsTo", model: "Doctor" }
      }
    }
  },
  version: "1"
};
