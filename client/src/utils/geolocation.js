const shareLocation = (socket) => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser.");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "shareLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => console.log("Location Shared.")
    );
  });
};
export default shareLocation;
