export function MostSoldItems() {
    const items = [
      { product: "Thai Boba", units: 254 },
      { product: "Taro Boba", units: 190 },
      { product: "Taro Boba", units: 190 },
      { product: "Taro Boba", units: 190 },
      { product: "Taro Boba", units: 190 },
    ]
  
    return (
      <div className="mb-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-black">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Units Sold</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-gray-700 text-sm">
                <td className="py-2">{item.product}</td>
                <td className="py-2">{item.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  