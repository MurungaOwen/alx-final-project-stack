import propertyModel from '../models/propertyModel.js'

export async function createProperty(req, res) {
    const { propertyName, ownerId, details } = req.body;

    if (!ownerId) return res.status(400).json({error: 'Missing owner id'});
    if (!propertyName) return res.status(400).json({error: 'Missing property name'});

    const newProperty = await propertyModel.createProperty(propertyName, ownerId, details);

    if (newProperty) return res.status(201).json({propertyId: newProperty._id});
}

export async function getAllProperties(req, res) {
    const allProperties = await propertyModel.getAll();
    if (allProperties) return res.status(200).json({properties: allProperties});
}

export async function getPropertyById(req, res) {
    const { propertyId } = req.params;
    if (!propertyId) return res.status(401).json({error: 'Missing propertyid'});

    const property = await propertyModel.getPropertyWithId(propertyId);
    if (property) return res.status(200).json({property: property});
}

export async function updateProperty(req, res) {
    const { propertyId } = req.params;
    const { updateObject } = req.body;
    if (!propertyId) return res.status(400).json({error: 'Missing property id'});
    if (!updateObject) return res.status(400).json({error: 'Missing update object'});

    const updatedProperty = await propertyModel.updateValue(propertyId, updateObject);
    if (updatedProperty) return res.status(200).json({propertyId: updatedProperty._id});
}

export async function deleteProperty(req, res) {
    const { propertyId } = req.params;

    if (!propertyId) return res.status(400).json({error: 'Missing property id'});

    const deletedProperty = await propertyModel.deletePropertyWithId(propertyId);
    if (deletedProperty) return res.status(201).json({propertyId: deletedProperty._id});
}