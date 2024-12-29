import supabase from "../../config/supabase";

export const addGroceries = async (items: any[]) => {
    try {
        const data = await supabase.from('grocery').insert(items);
        return data
    } catch (error) {
        return error
    }
}

export const getGroceries = async () => {
    try {
        const data = await supabase.from('grocery').select('*').eq("isDeleted",false);
        return data
    } catch (error) {
        return error
    }
}

export const updateGroceries = async (items: any,id: any) => {
    try {
        const data = await supabase.from('grocery').update({items}).eq('_id', id)
        return data
    } catch (error) {
        return error
    }
}

export const removeGroceries = async (id: any) => {
    try {
        const data = await supabase.from('grocery').update({isDeleted:true}).eq('_id', id);
        return data
    } catch (error) {
        return error
    }
}
