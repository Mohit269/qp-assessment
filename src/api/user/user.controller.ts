import { Request, Response } from "express";
import supabase from "../../config/supabase";

export const bookItem = async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        for (const item of req.body.items) {
            const { quantityInPiece = 0, quantityInKilo = 0, name } = item;

            const { data: groceryData, error: groceryError } = await supabase
                .from('grocery')
                .select('*')
                .eq('name', name)
                .eq('isDeleted', false)
                .single();

            if (groceryError || !groceryData) {
                console.error(`Error fetching grocery item "${name}":`, groceryError?.message || 'Item not found');
                continue;
            }

            const { _id, quantityInPiece: availablePieces, quantityInKilo: availableKilos, price } = groceryData;

            // Check if the demand can be fulfilled
            if (quantityInPiece > availablePieces || quantityInKilo > availableKilos) {
                console.error(`Insufficient stock for "${name}". Skipping.`);
                continue;
            }

            // Insert a record into the user table
            const totalAmount = price * (quantityInPiece || 0) + price * (quantityInKilo || 0);
            const { error: userError } = await supabase
                .from('user')
                .insert({
                    userName: userName,
                    productName: name,
                    totalAmount,
                    quantityInPiece: quantityInPiece,
                    quantityInKilo: quantityInKilo,
                });

            if (userError) {
                console.error(`Error inserting record into user table for "${name}":`, userError.message);
                continue;
            }

            console.log(`User record created successfully for "${name}".`);

            // Update the grocery table to adjust the quantities
            const updatedQuantities = {
                quantityInPiece: availablePieces - quantityInPiece,
                quantityInKilo: availableKilos - quantityInKilo,
            };

            const { error: groceryUpdateError } = await supabase
                .from('grocery')
                .update(updatedQuantities)
                .eq('_id', _id);

            if (groceryUpdateError) {
                console.error(`Error updating grocery record for "${name}":`, groceryUpdateError.message);
                continue;
            }

            console.log(`Grocery record updated successfully for "${name}".`);
        }
        const data = await supabase.from('user').select('*').eq('userName', userName);
        console.log(data,"--00")
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error booking items:', error);
    }
};
