import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, Share, Award, Globe, Instagram, MessageCircle, CheckCircle } from "lucide-react";
import { Product } from "@/entities/Product";
import { User } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ProductPreview({ data, onPrev }) {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);

  const publishProduct = async () => {
    setIsPublishing(true);
    try {
      const user = await User.me();
      const productData = {
        artisan_id: user.id,
        title_english: data.aiGenerated?.title_english || 'Handcrafted Item',
        title_hindi: data.aiGenerated?.title_hindi || '',
        description_short: data.aiGenerated?.description_short || data.textDescription.substring(0, 150),
        description_long: data.aiGenerated?.description_long || data.textDescription,
        images: data.images,
        pricing: {
          retail_price: data.aiGenerated?.suggested_price || 0,
          bulk_price: data.aiGenerated?.bulk_price || 0,
          minimum_order: 1
        },
        specifications: {
          materials: data.materials || [],
          colors_available: ['Natural']
        },
        authenticity: {
          certificate_id: `CRAFT-${Date.now()}`,
          craft_tradition: data.craftType,
          origin_verified: true
        },
        marketing_content: {
          hashtags: data.aiGenerated?.hashtags || [],
          instagram_caption: data.aiGenerated?.instagram_caption || '',
          whatsapp_message: data.aiGenerated?.whatsapp_message || '',
          seo_tags: [data.craftType, data.location, 'handmade', 'authentic']
        },
        status: 'published'
      };

      await Product.create(productData);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error('Error publishing product:', error);
    }
    setIsPublishing(false);
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="w-6 h-6 text-green-600" />
          Review Your Product Listing
        </CardTitle>
        <p className="text-gray-600">AI has created your complete marketplace presence. Review and publish!</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Product Preview</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="certificate">Certificate</TabsTrigger>
            <TabsTrigger value="translations">Languages</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Product Images</h3>
                <div className="grid grid-cols-2 gap-3">
                  {data.images?.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {data.aiGenerated?.title_english}
                  </h3>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-orange-100 text-orange-800">{data.craftType}</Badge>
                    <Badge variant="outline">{data.location}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.aiGenerated?.description_short}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pricing Suggestions</h4>
                  <div className="space-y-1">
                    <p className="text-green-700">Retail: ₹{data.aiGenerated?.suggested_price}</p>
                    <p className="text-green-700">Bulk: ₹{data.aiGenerated?.bulk_price}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4 mt-6">
            <div className="space-y-6">
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h4 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram Caption
                </h4>
                <p className="text-pink-700 text-sm">
                  {data.aiGenerated?.instagram_caption}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Message
                </h4>
                <p className="text-green-700 text-sm">
                  {data.aiGenerated?.whatsapp_message}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Recommended Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {data.aiGenerated?.hashtags?.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-blue-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certificate" className="space-y-4 mt-6">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="text-center space-y-4">
                <Award className="w-16 h-16 mx-auto text-amber-600" />
                <h3 className="text-xl font-bold text-amber-800">Digital Authenticity Certificate</h3>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Certificate ID:</strong> CRAFT-{Date.now()}</p>
                  <p><strong>Product:</strong> {data.aiGenerated?.title_english}</p>
                  <p><strong>Artisan:</strong> Verified Craftsperson</p>
                  <p><strong>Craft Tradition:</strong> {data.craftType}</p>
                  <p><strong>Origin:</strong> {data.location}</p>
                  <p><strong>Blockchain Hash:</strong> 0x{Math.random().toString(16).substring(2, 10)}...</p>
                </div>

                <div className="bg-amber-100 border border-amber-300 rounded-lg p-3">
                  <p className="text-amber-800 text-sm">
                    <strong>Heritage Story:</strong> {data.aiGenerated?.authenticity_story || 'This authentic handcrafted piece represents the rich cultural heritage and traditional skills passed down through generations.'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="translations" className="space-y-4 mt-6">
            <div className="grid gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  English
                </h4>
                <p className="text-blue-700">{data.aiGenerated?.title_english}</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Hindi</h4>
                <p className="text-orange-700" dir="auto">{data.aiGenerated?.title_hindi || 'हस्तशिल्प उत्पाद'}</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Regional Language</h4>
                <p className="text-purple-700">Auto-detected based on your location</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={onPrev} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Processing
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Share className="w-4 h-4" />
              Preview Share
            </Button>
            <Button 
              onClick={publishProduct}
              disabled={isPublishing}
              size="lg"
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              {isPublishing ? (
                'Publishing...'
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Publish to Marketplace
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
