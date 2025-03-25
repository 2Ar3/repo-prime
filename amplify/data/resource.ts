import { a, defineData } from '@aws-amplify/backend';

export const data = defineData({
  schema: a.schema({
    Doctor: a.model({
      name: a.string().required(),
      specialty: a.string(),
      vhaChats: a.hasMany('VHAChat', 'doctorID'),
    }).authorization(allow => [allow.owner()]),

    VHAChat: a.model({
      message: a.string().required(),
      timestamp: a.datetime().required(),
      doctorID: a.belongsTo('Doctor', 'doctorID'),
    }).authorization(allow => [allow.owner()]),
  }),
});
