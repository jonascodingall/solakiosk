/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1710601764")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3591305582",
    "max": null,
    "min": null,
    "name": "startCredit",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1710601764")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3591305582",
    "max": null,
    "min": null,
    "name": "start_credit",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
