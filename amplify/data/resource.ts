import { a, defineData } from '@aws-amplify/backend';

export const data = defineData({
  schema: a.schema({
    Doctor: a.model({
      name: a.string().required(),
      specialty: a.string(),
      vhaChats: a.hasMany('VHAChat', 'doctorId'),
    }).authorization(allow => [allow.owner()]),

    VHAChat: a.model({
      message: a.string().required(),
      timestamp: a.datetime().required(),
      doctorId: a.id().required(), // actual FK
      doctor: a.belongsTo('Doctor', 'doctorId'),
    }).authorization(allow => [allow.owner()]),
  }),
});
