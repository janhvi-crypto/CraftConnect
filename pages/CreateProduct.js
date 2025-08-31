import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import PhotoUploadStep from "../components/createProduct/PhotoUploadStep";
import VoiceRecordStep from "../components/createProduct/VoiceRecordStep";
import BasicDetailsStep from "../components/createProduct/BasicDetailsStep";
import AIProcessingStep from "../components/createProduct/AIProcessingStep";
import ProductPreview from "../components/createProduct/ProductPreview";

const STEPS = [
  { id: 'photos', title: 'Upload Photos', description: 'Add beautiful photos of your craft' },
  { id: 'voice', title: 'Share Your Story', description: 'Record your voice or type details' },
  { id: 'details', title: 'Basic Information', description: 'Craft type, location, pricing hints' },
  { id: 'processing', title: 'AI Magic', description: 'Let AI create your perfect listing' },
  { id: 'preview', title: 'Review & Publish', description: 'Final check and publish to marketplace' }
];

export default function CreateProduct() {
  const [currentStep, setCurrentStep] = useState('photos');
  const [productData, setProductData] = useState({
    images: [],
    voiceNote: null,
    textDescription: '',
    craftType: '',
    materials: [],
    priceHint: '',
    targetMarkets: [],
    location: '',
    aiGenerated: null
  });

  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const updateProductData = (newData) => {
    setProductData(prev => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'photos':
        return <PhotoUploadStep data={productData} updateData={updateProductData} onNext={nextStep} />;
      case 'voice':
        return <VoiceRecordStep data={productData} updateData={updateProductData} onNext={nextStep} onPrev={prevStep} />;
      case 'details':
        return <BasicDetailsStep data={productData} updateData={updateProductData} onNext={nextStep} onPrev={prevStep} />;
      case 'processing':
        return <AIProcessingStep data={productData} updateData={updateProductData} onNext={nextStep} onPrev={prevStep} />;
      case 'preview':
        return <ProductPreview data={productData} updateData={updateProductData} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #fefdf8 0%, #f9f5f0 100%)'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="hover:bg-orange-50">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Create New Product
              <Sparkles className="w-6 h-6 text-amber-500" />
            </h1>
            <p className="text-gray-600 mt-1">Let AI transform your craft into a stunning marketplace listing</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStepIndex + 1} of {STEPS.length}
              </span>
              <span className="text-sm text-orange-600 font-semibold">
                {Math.round(progress)}% Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  className={`text-center p-3 rounded-lg transition-all ${
                    index <= currentStepIndex 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-sm font-bold ${
                    index < currentStepIndex 
                      ? 'bg-green-500 text-white' 
                      : index === currentStepIndex 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-xs mb-1">{step.title}</h3>
                  <p className="text-xs opacity-75">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        {renderStep()}
      </div>
    </div>
  );
}
