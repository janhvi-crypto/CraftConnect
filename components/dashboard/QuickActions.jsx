import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Megaphone, TrendingUp, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const quickActions = [
  {
    title: "Create Product",
    description: "Upload photos & let AI do the magic",
    icon: Upload,
    url: createPageUrl("CreateProduct"),
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600"
  },
  {
    title: "Marketing Studio",
    description: "Generate social media content",
    icon: Megaphone,
    url: createPageUrl("MarketingStudio"),
    color: "from-red-500 to-pink-500",
    textColor: "text-red-600"
  },
  {
    title: "View Analytics",
    description: "Track performance & insights",
    icon: TrendingUp,
    url: createPageUrl("Analytics"),
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-600"
  },
  {
    title: "My Storefront",
    description: "Preview your digital store",
    icon: Store,
    url: createPageUrl("Storefront"),
    color: "from-purple-500 to-indigo-500",
    textColor: "text-purple-600"
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((action) => (
        <Link key={action.title} to={action.url}>
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`font-bold text-lg mb-2 ${action.textColor}`}>
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">
                {action.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
