import supabase, { supabaseUrl, supabaseQueryKeys } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from(supabaseQueryKeys.cabins).select('*').order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from(supabaseQueryKeys.cabins);

  // Create Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(id ? 'There was an error editing the cabin' : 'Cabin could not be created');
  }

  // Upload File
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

  // Delete cabin there was an image error
  if (storageError) {
    await supabase.from(supabaseQueryKeys.cabins).delete().eq('id', newCabin.id);
    throw new Error('Cabin image could not be uploaded. Cabin was deleted.');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from(supabaseQueryKeys.cabins).delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('There was an error deleting the cabin');
  }
}
