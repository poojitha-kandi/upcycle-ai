# 🌱 UpcycleAI

**Transform Your Furniture Sustainably with AI**

UpcycleAI is a hackathon project that helps renters breathe new life into their furniture using AI-powered, budget-friendly, and sustainable DIY suggestions.

## 🎯 Project Goal

An app where renters can:
1. Upload a photo of furniture that needs a refresh
2. Select their preferred style (Boho, Modern, Minimalist)
3. Set a budget for DIY fixes
4. Receive AI-generated, renter-friendly transformation ideas

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Future Integration**: Vision AI (OpenAI GPT-4 Vision, Google Cloud Vision, etc.)

## 📁 Project Structure

```
upcycle-ai/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for AI analysis
│   ├── components/
│   │   └── UploadForm.tsx        # Upload form component
│   ├── globals.css               # Global styles with sustainability theme
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page with Hero section
├── lib/                          # Utility functions (future)
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/                       # Static assets
└── package.json
```

## 🎨 Design Features

- **Dark Theme**: Black background with emerald green accents
- **Sustainability Vibe**: Green color palette representing eco-friendliness
- **Modern UI**: Gradient backgrounds, animated elements, and smooth transitions
- **Responsive**: Mobile-first design that works on all devices

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Features

### Current
- ✅ Beautiful Hero section with animated backgrounds
- ✅ Image upload with preview
- ✅ Style selection (Boho, Modern, Minimalist)
- ✅ Budget slider ($25 - $500)
- ✅ Placeholder API endpoint
- ✅ Mock AI suggestions

### Coming Soon
- 🔄 Vision AI integration (OpenAI GPT-4 Vision or similar)
- 🔄 Real-time image analysis
- 🔄 Detailed DIY instructions with images
- 🔄 Save favorite transformations
- 🔄 Share transformations on social media
- 🔄 Community gallery

## 🔧 API Integration (TODO)

To integrate with a Vision AI service:

1. Add your API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   # or
   GOOGLE_CLOUD_API_KEY=your_api_key_here
   ```

2. Update `app/api/analyze/route.ts` to call the Vision AI service

3. Update the mock suggestions with real AI-generated content

## 🌍 Sustainability Focus

All suggestions prioritize:
- **Renter-Friendly**: No permanent modifications
- **Budget-Conscious**: Work within specified budget
- **Eco-Friendly**: Use sustainable materials and methods
- **DIY-Friendly**: Easy to follow instructions

## 📦 Dependencies

Make sure to install lucide-react for icons:
```bash
npm install lucide-react
```

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for your own hackathons or learning!

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI Vision API](https://platform.openai.com/docs/guides/vision)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Built with 💚 for sustainable living | UpcycleAI 2025
