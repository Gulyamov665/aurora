import React from "react";

export const SearchAutoComplete: React.FC = () => {
  // const handleSearch = async () => {
  //   if (!address) return;
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&countrycodes=uz`
  //     );
  //     const data = await response.json();

  //     if (data.length > 0) {
  //       // const { lat, lon } = data[0];
  //       // const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
  //       const location = data.map((loc: LocationType) => ({
  //         id: loc.place_id, // можно использовать place_id из Nominatim или fallback на index
  //         label: loc.display_name,
  //       }));
  //       setAdressesList(location);
  //       {
  //         adressesList;
  //       }
  //     } else {
  //       alert("Адрес не найден 1");
  //     }
  //   } catch (err) {
  //     console.error("Ошибка при поиске адреса:", err);
  //   }
  // };

  return (
    <div>
      {" "}
      {/* <Autocomplete
    disablePortal
    fullWidth
    onChange={(_, newValue) => setAddress(newValue || "")}
    options={adressesList}
    sx={{ width: 300 }}
    getOptionLabel={(option: any) => option.label}
    renderOption={(props: any, option: any) => (
      <li {...props} key={option.id}>
        {option.label}
      </li>
    )}
    renderInput={(params) => (
      <TextField {...params} label="Location" value={address} onChange={(e) => setAddress(e.target.value)} />
    )}
    freeSolo
  /> */}
    </div>
  );
};
