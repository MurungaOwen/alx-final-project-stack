import rentalModel from '../models/rentalModel.js';

export async function createRental(req, res) {
    const { rentalName, propertyId, price} = req.body;

    if (!rentalName) return res.status(400).json({error: 'Missing rental name'});
    if (!propertyId) return res.status(400).json({error: 'Missing property id'});
    if (!price) return res.status(400).json({error: 'Missing price per month'});

    const newRental = await rentalModel.createRental(rentalName, propertyId, price);

    if (newRental) return res.status(201).json({rentalId: newRental._id});
}

export async function getAllRentals(req, res) {
    const allRentals = await rentalModel.getAll();
    if (allRentals) return res.status(200).json({rentals: allRentals});
}

export async function getRentalById(req, res) {
    const { rentalId } = req.params;
    if (!rentalId) return res.status(401).json({error: 'Missing rental id'});

    const rental = await rentalModel.getRentalWithId(rentalId);
    if (rental) return res.status(200).json({rental: rental});
}

export async function updateRental(req, res) {
    const { rentalId } = req.params;
    const { updateObject } = req.body;
    if (!rentalId) return res.status(400).json({error: 'Missing rental id'});
    if (!updateObject) return res.status(400).json({error: 'Missing update object'});

    const updatedRental = await rentalModel.updateValue(rentalId, updateObject);
    if (updatedRental) return res.status(200).json({rentalId: updatedRental._id});
}

export async function deleteRental(req, res) {
    const { rentalId } = req.params;

    if (!rentalId) return res.status(400).json({error: 'Missing rental id'});

    const deletedRental = await rentalModel.deleteRentalwithId(rentalId);
    if (deletedRental) return res.status(201).json({rentalId: deletedRental._id});
}