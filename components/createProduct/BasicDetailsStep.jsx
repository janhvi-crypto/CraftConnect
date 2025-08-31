import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Package, DollarSign } from "lucide-react";

const CRAFT_TYPES = [
  'pottery', 'textiles', 'jewelry', 'woodwork', 'metalwork', 
  'paintings', 'sculptures', 'embroidery', 'leather_goods', 
  'bamboo_crafts', 'stone_carving', 'glass_work', 'other'
];

const MATERIALS = [
  'Cotton', 'Silk', 'Wool', 'Clay', 'Wood', 'Metal', 'Stone', 
  'Bamboo', 'Leather', 'Glass', 'Silver', 'Brass', 'Natural Dyes'
];

const TARGET_MARKETS = [
  'Local Customers', 'Tourists', 'Online Buyers', 'Wholesale', 
  'Export', 'Wedding Market', 'Festival Season', 'Corporate Gifts'
];

export default function BasicDetailsStep({ data, updateData, onNext, onPrev }) {
  const handleMaterialToggle = (material) => {
    const materials = data.materials || [];
    const newMaterials = materials.includes(material)
      ? materials.filter(m => m !== material)
      : [...materials, material];
    updateData({ materials: newMaterials });
  };

  const handleTargetMarketToggle = (market) => {
    const markets = data.targetMarkets || [];
    const newMarkets = markets.includes(market)
      ? markets.filter(m => m !== market)
      : [...markets, market];
    updateData({ targetMarkets: newMarkets });
  };

  const canProceed = data.craftType && (data.materials?.length > 0) && data.location;

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Basic Product Details</CardTitle>
        <p className="text-gray-600">Help AI understand your craft better with these essential details</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Craft Type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-600" />
            What type of craft is this?
          </Label>
          <Select value={data.craftType} onValueChange={(value) => updateData({ craftType: value })}>
            <SelectTrigger className="border-orange-200 focus:border-orange-400">
              <SelectValue placeholder="Select your craft type" />
            </SelectTrigger>
            <SelectContent>
              {CRAFT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Materials Used */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Materials Used</Label>
          <div className="flex flex-wrap gap-2">
            {MATERIALS.map((material) => (
              <Badge
                key={material}
                variant={data.materials?.includes(material) ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  data.materials?.includes(material) 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'hover:bg-orange-50 hover:text-orange-700'
                }`}
                onClick={() => handleMaterialToggle(material)}
              >
                {material}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            Where are you located?
          </Label>
          <Input
            placeholder="e.g., Jodhpur, Rajasthan or Mumbai, Maharashtra"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            className="border-orange-200 focus:border-orange-400"
          />
        </div>

        {/* Price Hint */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-600" />
            Price Range (Optional)
          </Label>
          <Input
            placeholder="e.g., ₹500-1000 or Around ₹750"
            value={data.priceHint}
            onChange={(e) => updateData({ priceHint: e.target.value })}
            className="border-orange-200 focus:border-orange-400"
          />
          <p className="text-xs text-gray-500">AI will suggest optimal pricing based on your craft type and market trends</p>
        </div>

        {/* Target Markets */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Who do you mainly sell to?</Label>
          <div className="flex flex-wrap gap-2">
            {TARGET_MARKETS.map((market) => (
              <Badge
                key={market}
                variant={data.targetMarkets?.includes(market) ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  data.targetMarkets?.includes(market) 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => handleTargetMarketToggle(market)}
              >
                {market}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <Button variant="outline" onClick={onPrev} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Story
          </Button>
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
          >
            Next: AI Magic ✨
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
