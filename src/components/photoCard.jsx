<div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
  <div className="w-full h-56 overflow-hidden">
    <img
      src={`https://picsum.photos/id/${photo.id}/300/300`}
      alt={photo.author}
      className="w-full h-48 object-cover"
/>  
  </div>

  <div className="flex justify-between items-center p-3">
    <p className="text-sm font-medium truncate">
      {photo.author}
    </p>

    <button
      onClick={() =>
        dispatch({
          type: "TOGGLE_FAVOURITE",
          payload: photo.id,
        })
      }
      className="text-2xl"
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  </div>
</div>