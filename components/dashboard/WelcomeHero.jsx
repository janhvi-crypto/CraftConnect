import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function WelcomeHero() {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      
      <div className="relative p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-200" />
            <span className="text-yellow-100 font-semibold">AI-Powered Marketplace</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Turn Your Beautiful Crafts into 
            <span className="text-yellow-200"> Digital Success</span>
          </h1>
          
          <p className="text-lg text-orange-100 mb-8 leading-relaxed">
            Upload photos, share your story, and watch AI create stunning product listings, 
            marketing content, and authentic certificates for your handmade treasures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl("CreateProduct")}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-lg group">
                Create Your First Product
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
