import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Star,
  ArrowRight,
  Upload,
  Megaphone,
  Eye,
  MessageCircle
} from "lucide-react";
import { Product, Artisan, MarketingCampaign } from "@/entities/all";

import WelcomeHero from "../components/dashboard/WelcomeHero";
import QuickActions from "../components/dashboard/QuickActions";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentProducts from "../components/dashboard/RecentProducts";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [productsData, campaignData] = await Promise.all([
        Product.list('-created_date', 10),
        MarketingCampaign.list('-created_date', 5)
      ]);
      setProducts(productsData);
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #fefdf8 0%, #f9f5f0 100%)'}}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        <WelcomeHero />
        
        <QuickActions />
        
        <StatsOverview 
          products={products}
          campaigns={campaigns}
          isLoading={isLoading}
        />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentProducts 
              products={products}
              isLoading={isLoading}
              onRefresh={loadDashboardData}
            />
          </div>
          
          <div className="space-y-6">
            {/* AI Insights Card */}
            <Card className="border-gradient-to-r from-purple-100 to-pink-100 bg-gradient-to-br from-purple-50/30 to-pink-50/30 backdrop-blur-sm border-purple-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Sparkles className="w-5 h-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-white/50 border border-purple-100">
                  <p className="text-sm text-purple-700">
                    <strong>Trending Now:</strong> Handmade jewelry is seeing 40% higher engagement during wedding season
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/50 border border-purple-100">
                  <p className="text-sm text-purple-700">
                    <strong>Tip:</strong> Add heritage stories to your product descriptions for better customer connection
                  </p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View All Insights
                </Button>
              </CardContent>
            </Card>

            {/* Platform Performance */}
            <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Instagram</span>
                  <Badge className="bg-emerald-100 text-emerald-800">+25%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">WhatsApp</span>
                  <Badge className="bg-blue-100 text-blue-800">+18%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Direct Sales</span>
                  <Badge className="bg-orange-100 text-orange-800">+12%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
