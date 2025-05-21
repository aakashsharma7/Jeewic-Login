"use client"

interface EmailTemplateProps {
  onSelectTemplateAction: (content: string) => void
}

export function EmailTemplates({ onSelectTemplateAction }: EmailTemplateProps) {
  const templates = [
    {
      id: 1,
      name: "Product Launch",
      preview: "https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=100&width=150&text=Product+Launch",
      content: `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=300&width=600&text=New+Product" alt="New Product" style="max-width: 100%;" />
        </div>
        <h2 style="color: #F97316; font-size: 24px; text-align: center; margin-bottom: 20px;">Introducing Our New Product!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #F97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Shop Now</a>
        </div>
      `,
    },
    {
      id: 2,
      name: "Special Offer",
      preview: "https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=100&width=150&text=Special+Offer",
      content: `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=300&width=600&text=Special+Offer" alt="Special Offer" style="max-width: 100%;" />
        </div>
        <h2 style="color: #F97316; font-size: 24px; text-align: center; margin-bottom: 20px;">Limited Time Offer!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #F97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Get 20% Off</a>
        </div>
      `,
    },
    {
      id: 3,
      name: "Newsletter",
      preview: "https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=100&width=150&text=Newsletter",
      content: `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=300&width=600&text=Newsletter" alt="Newsletter" style="max-width: 100%;" />
        </div>
        <h2 style="color: #F97316; font-size: 24px; text-align: center; margin-bottom: 20px;">This Month's Updates</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3 style="color: #F97316; font-size: 18px; margin-top: 20px;">Featured Products</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      `,
    },
  ]

  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium text-gray-800 mb-3">Email Templates</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-md p-2 cursor-pointer hover:border-orange-500 transition-colors"
            onClick={() => onSelectTemplateAction(template.content)}
          >
            <img
              src={template.preview || "https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg"}
              alt={template.name}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="text-xs text-center text-gray-700">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
