import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle, ArrowLeft } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";

const PROCESSING_STEPS = [
  { id: 'analyzing', title: 'Analyzing your photos and story', duration: 2000 },
  { id: 'generating', title: 'Generating product titles and descriptions', duration: 3000 },
  { id: 'translating', title: 'Creating multilingual content', duration: 2500 },
  { id: 'pricing', title: 'Suggesting optimal pricing', duration: 1500 },
  { id: 'marketing', title: 'Creating marketing content', duration: 2000 },
  { id: 'certificate', title: 'Generating authenticity certificate', duration: 1000 }
];

export default function AIProcessingStep({ data, updateData, onNext, onPrev }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      processWithAI();
    }
  }, [isProcessing]);

  const processWithAI = async () => {
    // Simulate processing steps
    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      setCurrentStep(i);
      setProgress(((i + 1) / PROCESSING_STEPS.length) * 100);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, PROCESSING_STEPS[i].duration));
    }

    // Generate actual AI content
    try {
      const aiResult = await InvokeLLM({
        prompt: `Create a comprehensive product listing for an Indian handcraft item based on this information:

        Description: ${data.textDescription}
        Craft Type: ${data.craftType}
        Materials: ${data.materials?.join(', ')}
        Location: ${data.location}
        Price Hint: ${data.priceHint}
        Target Markets: ${data.targetMarkets?.join(', ')}

        Generate a complete product listing with authentic Indian cultural context. Include pricing suggestions based on craft type and market trends.`,
        
        response_json_schema: {
          type: "object",
          properties: {
            title_english: { type: "string" },
            title_hindi: { type: "string" },
            description_short: { type: "string" },
            description_long: { type: "string" },
            suggested_price: { type: "number" },
            bulk_price: { type: "number" },
            hashtags: { type: "array", items: { type: "string" } },
            instagram_caption: { type: "string" },
            whatsapp_message: { type: "string" },
            authenticity_story: { type: "string" }
          }
        }
      });

      updateData({ aiGenerated: aiResult });
      setProgress(100);
      
      // Auto proceed to next step
      setTimeout(onNext, 1000);
      
    } catch (error) {
      console.error('AI Processing failed:', error);
      // Handle error gracefully
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
  };

  if (!isProcessing && !data.aiGenerated) {
    return (
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Ready for AI Magic?
          </CardTitle>
          <p className="text-gray-600">Our AI will create professional product listings, marketing content, and authenticity certificates</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">What AI will create for you:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  ✨ Professional titles in 3 languages
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  📝 Compelling product descriptions
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  💰 Smart pricing suggestions
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  📱 Social media content
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  🔖 SEO-optimized hashtags
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  🏆 Digital authenticity certificate
                </div>
              </div>
            </div>

            <Button 
              onClick={startProcessing}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start AI Processing
            </Button>
          </div>

          <div className="flex justify-start">
            <Button variant="outline" onClick={onPrev} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-gray-900">
          AI is Working Its Magic ✨
        </CardTitle>
        <p className="text-gray-600">Please wait while we create your perfect product listing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-white animate-spin" />
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="text-center">
              <p className="font-semibold text-lg text-purple-700">
                {progress}% Complete
              </p>
              <p className="text-gray-600">
                {currentStep < PROCESSING_STEPS.length ? PROCESSING_STEPS[currentStep].title : 'Finalizing...'}
              </p>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="space-y-3">
            {PROCESSING_STEPS.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index < currentStep 
                    ? 'bg-green-50 border border-green-200' 
                    : index === currentStep 
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : index === currentStep 
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
