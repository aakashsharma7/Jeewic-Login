export function ProductCards() {
    const products = [
      {
        name: "Thai Boba",
        units: 254,
        image: "https://i.pinimg.com/474x/26/f4/bd/26f4bd1cc0024e498e50e8666aef988c.jpg?height=60&width=60",
      },
      {
        name: "Taro Boba",
        units: 190,
        image: "https://i.pinimg.com/474x/26/f4/bd/26f4bd1cc0024e498e50e8666aef988c.jpg?height=60&width=60",
      },
      {
        name: "Taro Boba",
        units: 190,
        image: "https://i.pinimg.com/474x/26/f4/bd/26f4bd1cc0024e498e50e8666aef988c.jpg?height=60&width=60",
      },
    ]
  
    return (
      <div className="flex  gap-4 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 border rounded-lg p-3 flex items-center gap-3 min-w-[200px]">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <h4 className="font-medium text-orange-500">{product.name}</h4>
              <p className="text-sm text-black">{product.units} Units sold</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
  